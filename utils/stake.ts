import { nftStake } from "../abi/stake"
import { agencyABI } from "../abi/agency"
import { account, walletClient, publicClient, userConfig } from "../config"
import { chooseAgencyNFTWithTokenId, displayConfirmAndExit, selectWrapAddress } from './display'
import select from '@inquirer/select'
import chalk from 'chalk'
import { getAgencyStrategy } from "./data"
import { formatEther, parseEther } from "viem"

export const approvePush = async () => {
    const agencyAddress = await selectWrapAddress(userConfig)

    const { request } = await publicClient.simulateContract({
        account,
        abi: agencyABI,
        address: agencyAddress,
        functionName: "forceApprove",
        args: [
            "0x3c6e2f22",
            nftStake.address
        ]
    })

    const forceApproveHash = await walletClient.writeContract(request)

    console.log(`Push Config Hash: ${chalk.blue(forceApproveHash)}`)
}

const stakeAgencyNFT = async () => {
    const agencySelectConfig = await chooseAgencyNFTWithTokenId(userConfig)

    const { request } = await publicClient.simulateContract({
        account,
        abi: nftStake.abi,
        address: nftStake.address,
        functionName: "stake",
        args: [
            agencySelectConfig.agencyStrategy[0], agencySelectConfig.agencyTokenId
        ]
    })

    const stakeHash = await walletClient.writeContract(request)

    console.log(`Stake NFT Hash: ${chalk.blue(stakeHash)}`)
}

const getL1EndBlock = async () => {
    const endBlockOfEpoch = await publicClient.readContract({
        ...nftStake,
        functionName: "endBlockOfEpoch"
    })
    const nowBlockNumber = await publicClient.getBlockNumber()

    if (endBlockOfEpoch > nowBlockNumber) {
        return { endBlock: nowBlockNumber, isEnd: false }
    } else {
        return { endBlock: endBlockOfEpoch, isEnd: true }
    }
}

const updatePoolL1 = async () => {
    const { isEnd } = await getL1EndBlock()
    if (!isEnd) {
        console.log("In Epoch...")
    } else {
        // console.log(`End Block Of Epoch: ${chalk.blue(endBlockOfEpoch)} Now Block Number: ${chalk.blue(nowBlockNumber)}`)
        // console.log("Not In Epoch")
        const { request } = await publicClient.simulateContract({
            account,
            abi: nftStake.abi,
            address: nftStake.address,
            functionName: "updatePoolL1",
        })

        const updatePoolL1Hash = await walletClient.writeContract(request)
        console.log(`Update Pool L1 Hash: ${chalk.blue(updatePoolL1Hash)}`)
    }
}

const withdrawL1Reward = async () => {
    const agencyAddress = await selectWrapAddress(userConfig)
    const agencyStrategy = await getAgencyStrategy(agencyAddress)
    const { endBlock } = await getL1EndBlock()

    const baseInfo = await publicClient.multicall({
        contracts: [
            {
                ...nftStake,
                functionName: "lastRewardBlock",
            },
            {
                ...nftStake,
                functionName: "tokenPerBlock"
            },
            {
                ...nftStake,
                functionName: "accTokenPerShare",
            },
            {
                ...nftStake,
                functionName: "tvlOfTotal"
            },
        ]
    })

    const l2StakingData = await publicClient.readContract({
        ...nftStake,
        functionName: "stakingOfNFT",
        args: [agencyStrategy[0]]
    })

    const tokenReward = (endBlock - baseInfo[0].result!) * baseInfo[1].result!;
    const accTokenPerShare = baseInfo[2].result! + tokenReward * BigInt(1e12) / BigInt(baseInfo[3].result!);

    const reward = l2StakingData.unspentRewards + (accTokenPerShare - l2StakingData.rewardDebt) * l2StakingData.tvl;

    console.log(`Withdraw L1 Reward: ${chalk.blue(formatEther(reward * BigInt(4) / BigInt(25 * 1e12)))}`)

    displayConfirmAndExit("Continue to withdraw L1 reward?")
    
    const { request } = await publicClient.simulateContract({
        account,
        abi: nftStake.abi,
        address: nftStake.address,
        functionName: "updateRewardL1",
        args: [
            agencyStrategy[0]
        ]
    })

    const updateRewardL1Hash = await walletClient.writeContract(request)
    console.log(`Withdraw Reward L1 Hash: ${chalk.blue(updateRewardL1Hash)}`)
}

const updatePoolL2 = async () => {
    const agencyAddress = await selectWrapAddress(userConfig)
    const agencyStrategy = await getAgencyStrategy(agencyAddress)
    const nowBlockNumber = await publicClient.getBlockNumber()

    const l2StakingData = await publicClient.readContract({
        ...nftStake,
        functionName: "stakingOfNFT",
        args: [agencyStrategy[0]]
    })

    if (l2StakingData.endBlockOfEpoch > nowBlockNumber) {
        console.log("In Epoch...")
    } else {
        const { request } = await publicClient.simulateContract({
            account,
            abi: nftStake.abi,
            address: nftStake.address,
            functionName: "updatePoolL2",
            args: [
                agencyStrategy[0]
            ]
        })

        const updatePoolL2Hash = await walletClient.writeContract(request)

        console.log(`Update Pool L2 Hash: ${chalk.blue(updatePoolL2Hash)}`)
    }
}

const withdrawReward = async () => {
    const { agencyTokenId, agencyStrategy} = await chooseAgencyNFTWithTokenId(userConfig)

    const reward = await publicClient.readContract({
        ...nftStake,
        functionName: "pendingRewards",
        args: [
            agencyStrategy[0],
            agencyTokenId
        ]
    })

    console.log(`Withdraw Reward: ${chalk.blue(formatEther(reward))}`)

    displayConfirmAndExit("Continue to withdraw reward?")

    const { request } = await publicClient.simulateContract({
        account,
        abi: nftStake.abi,
        address: nftStake.address,
        functionName: "withdrawReward",
        args: [
            agencyStrategy[0],
            agencyTokenId
        ]
    })

    const withdrawRewardHash = await walletClient.writeContract(request)

    console.log(`Withdraw Reward Hash: ${chalk.blue(withdrawRewardHash)}`)
}

const unstakeAgencyNFT = async () => {
    const { agencyTokenId, agencyStrategy} = await chooseAgencyNFTWithTokenId(userConfig)

    displayConfirmAndExit("Continue to unstake?")

    const { request } = await publicClient.simulateContract({
        account,
        abi: nftStake.abi,
        address: nftStake.address,
        functionName: "unstake",
        args: [
            agencyStrategy[0],
            agencyTokenId
        ]
    })

    const unstakeHash = await walletClient.writeContract(request)

    console.log(`Unstake Hash: ${chalk.blue(unstakeHash)}`)
}

export const stakeSelect = async () => {
    const selectStake = await select({
        message: "Select the stake steps",
        choices: [
            {
                name: "Stake NFT",
                value: "stakeAgencyNFT",
            },
            {
                name: "Unstake NFT",
                value: "unstakeAgencyNFT",
                description: "Unstake NFT"
            },
            {
                name: "Update Pool L1",
                value: "updatePoolL1",
                description: "Start a new L1 Epoch."
            },
            {
                name: "Withdraw L1 Reward",
                value: "withdrawL1Reward",
                description: "Withdraw deployer rewards and allocate rewards to L2"
            },
            {
                name: "Update Pool L2",
                value: "updatePoolL2",
                description: "Start a new L2 Epoch."
            },
            {
                name: "Withdraw NFT Stake Reward",
                value: "withdrawReward",
                description: "Withdraw staking rewards"
            },
        ]
    })

    switch (selectStake) {
        case "stakeAgencyNFT":
            await stakeAgencyNFT()
            break
        
        case "unstakeAgencyNFT":
            await unstakeAgencyNFT()
            break

        case "updatePoolL1":
            await updatePoolL1()
            break

        case "withdrawL1Reward":
            await withdrawL1Reward()
            break
        
        case "updatePoolL2":
            await updatePoolL2()
            break

        case "withdrawReward":
            await withdrawReward()
            break

        default:
            break
    }
}
