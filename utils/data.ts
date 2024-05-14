import { agencyABI, appABI } from "../abi/agency"
import { erc20Abi } from "../abi/erc20Abi"
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