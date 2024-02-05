import { agencyABI, appABI } from "../abi/agency"
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