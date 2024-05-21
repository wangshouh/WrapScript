import { parseAbi, toHex } from "viem"
import { agencyABI, appABI } from "../abi/agency"
import { dotAgency } from "../abi/dotAgency"
import { erc20Abi } from "../abi/erc20Abi"
import { erc6551Implementation, erc6551RegistryABI } from "../abi/erc6551"
import { account, publicClient } from "../config"


export const getAgencyStrategy = async (agencyAddress: `0x${string}`) => {
    const agencyStrategy = await publicClient.readContract({
        address: agencyAddress,
        abi: agencyABI,
        functionName: "getStrategy",
    })
    // TODo: erc20 token
    return agencyStrategy
}

export const isApproveOrOwner = async (appAddress: `0x${string}`, tokenId: bigint) => {
    let nftOwner: `0x${string}`
    
    try {
        nftOwner = await publicClient.readContract({
            address: appAddress,
            abi: appABI,
            functionName: "ownerOf",
            args: [tokenId]
        })     
    } catch (error) {
        return false
    }
    
    const results = await publicClient.multicall({
        contracts: [
            {
                address: appAddress,
                abi: appABI,
                functionName: "getApproved",
                args: [tokenId]
            },
            {
                address: appAddress,
                abi: appABI,
                functionName: "isApprovedForAll",
                args: [nftOwner, account.address]
            }
        ]
    })

    return nftOwner == account.address || results[1].result || results[0].result == account.address
}

export const getTokenBaseInfo = async (erc20Address: `0x${string}`) => {
    if (erc20Address === "0x0000000000000000000000000000000000000000") {
        return {
            name: "ETH",
            decimals: 18
        }
    } else {
        const [tokenName, tokeDecimals] = await publicClient.multicall({
            contracts: [
                {
                    address: erc20Address,
                    abi: erc20Abi,
                    functionName: "name"
                },
                {
                    address: erc20Address,
                    abi: erc20Abi,
                    functionName: "decimals"
                }
            ]
        })
    
        return {
            name: tokenName.result!,
            decimals: tokeDecimals.result!
        }
    }
}

export const getDotAgencyERC6551AddressByTokenID = async (tokenId: bigint) => {
    const { result: dotAgencyNFTERC6551Address } = await publicClient.simulateContract({
        address: dotAgency.address,
        abi: erc6551RegistryABI,
        functionName: "createAccount",
        args: [
            erc6551Implementation,
            toHex("DEFAULT_ACCOUNT_SALT", { size: 32 }),
            BigInt(publicClient.chain!.id),
            dotAgency.address,
            tokenId
        ],
    })
    
    return dotAgencyNFTERC6551Address
}

export const getAgentERC6551AddressByTokenID = async (agentAddress: `0x${string}`, tokenId: bigint) => {
    const { result: agentERC6551Address } = await publicClient.simulateContract({
        address: agentAddress,
        abi: erc6551RegistryABI,
        functionName: "createAccount",
        args: [
            erc6551Implementation,
            toHex("DEFAULT_ACCOUNT_SALT", { size: 32 }),
            BigInt(publicClient.chain!.id),
            agentAddress,
            tokenId
        ],
    })

    return agentERC6551Address
}

export const getERC20Approve = async (tokenAddress: `0x${string}`, agencyAddress: `0x${string}`) => {
    const result = await publicClient.readContract({
        address: tokenAddress,
        abi: parseAbi(['function allowance(address, address) view returns (uint256)']),
        functionName: "allowance",
        args: [account.address, agencyAddress]
    })

    return result
}