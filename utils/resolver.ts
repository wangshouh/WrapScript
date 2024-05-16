import { input, confirm } from "@inquirer/prompts"
import { account, defaultAgentResolver, defaultDotAgencyResolver, publicClient, userConfig, walletClient } from "../config"
import { getAgencyStrategy, isApproveOrOwner } from "./data"
import { inputAddress, selectTokenId, selectWrapAddress } from "./display"
import { bytesToString, keccak256, namehash, toBytes, toHex } from "viem"
import { agentABI } from "../abi/agent"
import chalk from 'chalk'
import { appABI } from "../abi/agency"
import { AgentResolverABI, DotAgencyResolverABI } from "../abi/resolver"
import { dotAgency, dotAgencyABI } from "../abi/dotAgency"

const getAgentSymbol = async (agencyAddress: `0x${string}`) => {
    const symbol = await publicClient.readContract({
        address: agencyAddress,
        abi: agentABI,
        functionName: "symbol",
    })

    return symbol
}

const getTokenId = async (appAddress: `0x${string}`, nodeHash: `0x${string}`) => {
    const tokenId = await publicClient.readContract({
        address: appAddress,
        abi: appABI,
        functionName: "getTokenId",
        args: [
            nodeHash
        ]
    })

    return tokenId
}

const setResolver = async (appAddress: `0x${string}`, nodeHash: `0x${string}`, resolverAddress: `0x${string}`) => {
    const { request } = await publicClient.simulateContract({
        address: appAddress,
        abi: appABI,
        functionName: "setResolver",
        args: [nodeHash, resolverAddress]
    })

    const setResolverHash = await walletClient.writeContract(request)
    console.log(`Set Resolver Hash: ${chalk.blue(setResolverHash)}`)

}

const getResolver = async (appAddress: `0x${string}`, nodeHash: `0x${string}`) => {
    const resolver = await publicClient.readContract({
        address: appAddress,
        abi: appABI,
        functionName: "getResolver",
        args: [nodeHash]
    })

    return resolver
}

const setResolverAddr = async (appAddress: `0x${string}`, nodeHash: `0x${string}`, addr: `0x${string}`) => {
    const resolverAddress = await getResolver(appAddress, nodeHash)

    const { request } = await publicClient.simulateContract({
        address: resolverAddress,
        abi: AgentResolverABI,
        functionName: "setAddr",
        args: [appAddress, nodeHash, addr]
    })

    const setAddrHash = await walletClient.writeContract(request)

    console.log(`Set Addr Hash: ${chalk.blue(setAddrHash)}`)
}

export const existAgentName = async (name: string, appAddress: `0x${string}`) => {
    const agentName = await getAgentSymbol(appAddress)
    const subNode = namehash(name + "." + agentName)

    const request = await publicClient.readContract({
        address: appAddress,
        abi: agentABI,
        functionName: "isRecordExists",
        args: [subNode]
    })

    return request
}

const resolverInputAndAuth = async () => {
    const agencyAddress = await selectWrapAddress(userConfig)
    const agencyStrategy = await getAgencyStrategy(agencyAddress)

    const agentAddress = agencyStrategy[0]

    let agencyTokenName = await input({ message: 'Enter Agent Name: ' })

    const agentName = await getAgentSymbol(agentAddress)
    const fullDomain = agencyTokenName + "." + agentName 

    const nodeHash = namehash(fullDomain)
    const tokenId = await getTokenId(agentAddress, nodeHash)

    const authorityExist = await isApproveOrOwner(agencyStrategy[0], tokenId)
    
    return { agentAddress, nodeHash, authorityExist, fullDomain }
}

export const setResolverInCLI = async () => {
    const { agentAddress, nodeHash, authorityExist, fullDomain } = await resolverInputAndAuth()

    if (!authorityExist) {
        console.log(chalk.red('Not NFT Approve or Owner'))
        return
    } else {
        const answer = await confirm({ message: `Are you sure to modify the resolver contract of ${fullDomain}?` });

        if (answer) {
            const resolverAddress = await inputAddress('Enter Resolver Address: ', defaultAgentResolver)

            setResolver(agentAddress, nodeHash, resolverAddress)
        } else {
            return
        }
    }
}

export const setDotResolverInCLI = async () => {
    const dotAgencyTokenId = await selectTokenId(userConfig)

    const authorityExist = await isApproveOrOwner(dotAgency.address, BigInt(dotAgencyTokenId))

    if (!authorityExist) {
        console.log(chalk.red('Not NFT Approve or Owner'))
        return
    } else {
        const dotAgncyNode = await publicClient.readContract({
            ...dotAgency,
            functionName: "getNode",
            args: [BigInt(dotAgencyTokenId)]
        })

        const resolverAddress = await inputAddress('Enter Resolver Address: ', defaultDotAgencyResolver)
        const { request } = await publicClient.simulateContract({
            account,
            ...dotAgency,
            functionName: "setResolver",
            args: [dotAgncyNode, resolverAddress]
        })

        const setResolverHash = await walletClient.writeContract(request)
        console.log(`Set .Agency Resolver Hash: ${chalk.blue(setResolverHash)}`)
    }
}

export const setResolverBondInCLI = async () => {
    const { agentAddress, nodeHash, authorityExist, fullDomain } = await resolverInputAndAuth()
    if (!authorityExist) {
        console.log(chalk.red('Not NFT Approve or Owner'))
        return
    } else {
        const answer = await confirm({ message: `Are you sure to modify the bond of ${fullDomain}?` });

        if (answer) {
            const resolverAddress = await getResolver(agentAddress, nodeHash)
            const bondKey = toHex(await input({ message: "Enter bond key: "}))
            const bondKeyHash = keccak256(bondKey)
            const bondValue = toHex(await input({ message: "Enter bond value: "}))
            // await setResolverAddr(agentAddress, nodeHash, resolverAddress)
            const { request } = await publicClient.simulateContract({
                address: resolverAddress,
                abi: AgentResolverABI,
                functionName: "setText",
                args: [agentAddress, nodeHash, bondKeyHash, bondValue]
            })

            const setBondHash = await walletClient.writeContract(request)

            console.log(`Set Bond Hash: ${chalk.blue(setBondHash)}`)
        } else {
            return
        }
    }
}

export const setDotAgencyResolverAddrInCLI = async () => {
    const dotAgencyTokenId = await selectTokenId(userConfig)

    const authorityExist = await isApproveOrOwner(dotAgency.address, BigInt(dotAgencyTokenId))

    if (!authorityExist) {
        console.log(chalk.red('Not NFT Approve or Owner'))
        return
    } else {
        const dotAgncyNode = await publicClient.readContract({
            ...dotAgency,
            functionName: "getNode",
            args: [BigInt(dotAgencyTokenId)]
        })

        const dotAgencyAddr = await inputAddress('Enter addr Address: ')

        const { request } = await publicClient.simulateContract({
            account,
            address: defaultDotAgencyResolver,
            abi: DotAgencyResolverABI,
            functionName: "setAddr",
            args: [dotAgncyNode, dotAgencyAddr]
        })

        const setAddrHash = await walletClient.writeContract(request)
        console.log(`Set .Agency Addr Hash: ${chalk.blue(setAddrHash)}`)
    }
}

export const getResolverBondInCLI = async () => {
    const { agentAddress, nodeHash, fullDomain } = await resolverInputAndAuth()
    const resolverAddress = await getResolver(agentAddress, nodeHash)
    const answer = await confirm({ message: `Are you sure to read the bond of ${fullDomain}?` });

    if (answer) {
        const bondKey = toHex(await input({ message: "Enter bond key: "}))
        const bondKeyHash = keccak256(bondKey)
        const readBond = await publicClient.readContract({
            address: resolverAddress,
            abi: AgentResolverABI,
            functionName: "text",
            args: [nodeHash, bondKeyHash]
        })

        console.log(`Bond Value: ${chalk.blue(bytesToString(toBytes(readBond)))}`)
    } else {
        return
    }
    
}

export const getDotAgencyResolverAddrInCLI = async () => {
    const dotAgencyTokenId = await selectTokenId(userConfig)
    const dotAgncyNode = await publicClient.readContract({
        ...dotAgency,
        functionName: "getNode",
        args: [BigInt(dotAgencyTokenId)]
    })

    const readAddr = await publicClient.readContract({
        address: defaultDotAgencyResolver,
        abi: AgentResolverABI,
        functionName: "addr",
        args: [dotAgncyNode]
    })

    console.log(`Addr: ${chalk.blue(readAddr)}`)
}

// await getResolverBondInCLI()