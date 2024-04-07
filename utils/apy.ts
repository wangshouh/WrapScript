import { formatEther, minInt104, parseEther } from "viem";
import { uniswapV2RounterABI } from "../abi/uniswapV2Router";
import { publicClient, walletClient } from "../config";
import { nftStake } from "../abi/stake";
import { agencyABI } from "../abi/agency";

const uniswapV2Router = "0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008" as `0x${string}`;
const weth = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9" as `0x${string}`;
const wrapCoin = "0xC789130E00EDabb55beC6D5F728ea1ab303f226C" as `0x${string}`;

enum AgentCoin {
    ETH = 0,
    WrapCoin
}

const swapETHToWrap = async (ethNumber: bigint) => {
    const wrapNumber = await publicClient.readContract({
        address: uniswapV2Router,
        abi: uniswapV2RounterABI,
        functionName: "getAmountsOut",
        args: [ethNumber, [weth, wrapCoin]]
    }) as [bigint, bigint];

    // console.log(formatEther(wrapNumber[1]))
    return wrapNumber[1]
}

const getAgentBaseInfo = async (agentAddress: `0x${string}`) => {
    const agentBaseInfo = await publicClient.readContract({
        ...nftStake,
        functionName: "stakingOfNFT",
        args: [agentAddress]
    })

    return { 
        accTokenPerShare: agentBaseInfo[3], 
        points: agentBaseInfo[1], 
        lastRewardBlock: agentBaseInfo[2],
        tokenPerBlock: agentBaseInfo[5],
        endBlockOfEpoch: agentBaseInfo[7],
    }
}

const getAgenctEpochReward = async (agentAddress: `0x${string}`, agencyTokenId: bigint) => {
    const rewardDebtData = await publicClient.readContract({
        ...nftStake,
        functionName: "tokenIdRewardDebt",
        args: [agentAddress, agencyTokenId]
    })

    const rewardDebt = rewardDebtData >> BigInt(0x2)

    const agentInfo = await getAgentBaseInfo(agentAddress)

    const reward = agentInfo.accTokenPerShare + (agentInfo.endBlockOfEpoch - agentInfo.lastRewardBlock) * agentInfo.tokenPerBlock / agentInfo.points;
    
    return {
        epochReward: (reward - rewardDebt) / BigInt(1e12),
        epochLength: agentInfo.endBlockOfEpoch - agentInfo.lastRewardBlock
    }
}

export const calculateAgentAPY = async (agentAddress: `0x${string}`, agencyTokenId: bigint, mintPrice: bigint, mintCoin: AgentCoin) => {
    const { epochReward, epochLength } = await getAgenctEpochReward(agentAddress, agencyTokenId)
    let apy;
    let mintWrapPrice;
    const yearReward = epochReward * BigInt(2628000) / epochLength

    switch (mintCoin) {
        case AgentCoin.ETH: {
            mintWrapPrice = await swapETHToWrap(mintPrice)
            break;
        }
        case AgentCoin.WrapCoin: {
            mintWrapPrice = mintPrice
            break;
        }
    }

    apy = yearReward * BigInt(100) / mintWrapPrice

    console.log(`Year Reward: ${yearReward}\nMint Pirce: ${mintWrapPrice}\nAPY: ${apy}%`)
}

export const calculateDotAgencyEPI = async (agencyAddress: `0x${string}`, dotAgencyTokenId: bigint, feeCoin: AgentCoin) => {
    const feeCount = await publicClient.readContract({
        address: agencyAddress,
        abi: agencyABI,
        functionName: "feeCount"
    })
    let wrapFee: bigint;
    const dotAgencyFeeCount = feeCount * BigInt(5) / BigInt(6)

    if (feeCoin == AgentCoin.ETH) {
        wrapFee = await swapETHToWrap(dotAgencyFeeCount)
    } else {
        wrapFee = dotAgencyFeeCount
    }

    // wrapFee + 
}
await calculateAgentAPY(
    "0xd1A6AFee355E749a24a79BF06330A5E87dAebd8b", 
    BigInt(1),
    parseEther("0.001"),
    AgentCoin.ETH
)