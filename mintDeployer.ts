import { account, walletClient, publicClient, agencyAndAppConfig, userConfig } from "./config"
import { deployer } from "./abi/deployer"
import { factoryABI, wrapFactory } from "./abi/factory"
import { agencyABI, appABI } from './abi/agency'
import { agentABI } from './abi/agent'
import { erc6551Implementation, erc6551RegistryABI } from './abi/erc6551'
import { concat, encodeAbiParameters, formatEther, getAddress, getFunctionSelector, keccak256, toHex, parseAbi } from "viem"
import { confirm } from '@inquirer/prompts';
import { displayNotFundAndExit, inputAddress, selectWrapAddress, selectTokenId, inputETHNumber, inputMoreThanMinimumValue } from './display'
import { exit } from 'node:process';
import input from '@inquirer/input';
import select from '@inquirer/select'
import fs from 'fs'
import chalk from 'chalk'
import boxen from 'boxen'
import { sleep } from "bun"

const accountBalance = await publicClient.getBalance(account)

export const mintDeployer = async () => {
    const nowDeployerPrice = await publicClient.readContract({
        ...deployer,
        functionName: "getPrice",
    })

    console.log(`Deployer NFT Price is ${chalk.blue(formatEther(nowDeployerPrice))} ETH`)
    console.log(`Your ETH Balance is ${chalk.blue(formatEther(accountBalance))} ETH`)

    displayNotFundAndExit(nowDeployerPrice, accountBalance)

    const answer = await confirm({ message: 'Continue Mint Deployer?' });

    if (answer) {
        let deployerName = await input({ message: 'Enter Deployer Name: ' })

        while (await existName(deployerName)) {
            console.log(chalk.red("Name has been registered"))
            // TODO: Deployer name
            deployerName = await input({ message: 'Enter Deployer Name: ' })
        }

        const userPrice = await inputETHNumber("Maximum cost available for mint(ETH): ", formatEther(nowDeployerPrice))
        await mintDeployerName(deployerName, userPrice)
    }
}

export const deployAppAndAgency = async () => {
    const deployAppAndAgencySelect = await select({
        message: "App and Agency Selection",
        choices: agencyAndAppConfig
    })

    const { agencyImplementation, appImplementation } = agencyAndAppConfig.find(({ value }) => value === deployAppAndAgencySelect)!
    // TODO: Chech AgentCannotRedeploy error
    let inputConfig = await getAgenctConfig(appImplementation as `0x${string}`)
    let configIsTrue = await confirm({ message: 'Continue Deploy App and Agency?' })

    while (!configIsTrue) {
        inputConfig = await getAgenctConfig(appImplementation as `0x${string}`)
        configIsTrue = await confirm({ message: 'Continue Deploy App and Agency?' })
    }

    await deployAgencyAndApp(inputConfig.tokenId, agencyImplementation as `0x${string}`, appImplementation as `0x${string}`, inputConfig.config)
    // console.log(`Agency Implementation: ${chalk.blue(agencyImplementation)}\nApp Implementation: ${chalk.blue(appImplementation)}`)
}

export const setTokenURIEngine = async () => {
    const agencyAddress = await selectWrapAddress(userConfig)
    const agencyStrategy = await getAgencyStrategy(agencyAddress)

    const tokenURIEngineAddress = await inputAddress("Enter TokenURI Engine Address(Default is Mario-style): ", "0x2D2F757877547ef03Ee7d0D7e49AF391b6931071")

    // console.log(`Set TokenURI Engine Address: ${chalk.blue(tokenURIEngineAddress)}`)
    const { request } = await publicClient.simulateContract({
        account,
        address: agencyStrategy[0],
        abi: agentABI,
        functionName: 'setProxyTokenURIEngine',
        args: [tokenURIEngineAddress]
    })

    const setTokenURIHash = await walletClient.writeContract(request)
    console.log(`Set TokenURI Engine Hash: ${chalk.blue(setTokenURIHash)}`)
}

export const changeDeployerTokenURI = async () => {
    const deployerTokenId = await selectTokenId(userConfig)

    const authorityExist = await isApproveOrOwner(deployer.address, BigInt(deployerTokenId))

    if (!authorityExist) {
        console.log(chalk.red('Not NFT Approve or Owner'))
        return
    } else {
        const tokenURI = await inputAddress('Enter TokenURI Engine Address(Default is histogram-style): ', "0x87441f94a353C90D9AC8b65EE1F4D4350A66DEE1")
        const { request } = await publicClient.simulateContract({
            account,
            ...deployer,
            functionName: 'setTokenURIEngine',
            args: [BigInt(deployerTokenId), tokenURI]
        })
    
        const setTokenURIHash = await walletClient.writeContract(request)
        console.log(`Set Deployer TokenURI Hash: ${chalk.blue(setTokenURIHash)}`)
    }
}   

export const rebaseFee = async () => {
    const agencyAddress = await selectWrapAddress(userConfig)
    const agencyStrategy = await getAgencyStrategy(agencyAddress)
    const agencyDeployerTokenId = await publicClient.readContract({
        address: agencyStrategy[0],
        abi: agentABI,
        functionName: "tokenIdOfDeployer",
    })

    const { result: deployerNFTERC6551Address } = await publicClient.simulateContract({
        address: deployer.address,
        abi: erc6551RegistryABI,
        functionName: "createAccount",
        args: [
            erc6551Implementation,
            toHex("DEFAULT_ACCOUNT_SALT", { size: 32 }),
            BigInt(publicClient.chain!.id),
            deployer.address,
            agencyDeployerTokenId
        ],
    })
    
    console.log(`Deployer NFT ERC6551 Address: ${chalk.blue(deployerNFTERC6551Address)}`)

    const agencyFee = await publicClient.readContract({
        address: agencyAddress,
        abi: agencyABI,
        functionName: "feeCount",
    })

    const deployerFee = agencyFee / BigInt(6)
    console.log(`Withdraw Fee: ${chalk.blue(formatEther(deployerFee))}`)

    const answer = await confirm({ message: 'Continue Withdraw Fee?' });

    if (answer) {
        const { request } = await publicClient.simulateContract({
            address: agencyAddress,
            abi: agencyABI,
            functionName: "rebase",
        })

        const rebaseHash = await walletClient.writeContract(request)

        console.log(`Withdraw Fee Hash: ${chalk.blue(rebaseHash)}`)
    }
}
export const wrap = async () => {
    const agencyAddress = await selectWrapAddress(userConfig)
    const agencyStrategy = await getAgencyStrategy(agencyAddress)

    const tokenName = await getERC20Name(agencyStrategy[1].currency)
    const userBalance = await getUserBalance(agencyStrategy[1].currency)

    const nowAgencyPrice = await getAgentMintPrice(agencyAddress, agencyStrategy[0])
    
    console.log(`Agent NFT Price is ${chalk.blue(formatEther(nowAgencyPrice[0]))} ${tokenName}, Fee is ${chalk.blue(formatEther(nowAgencyPrice[1]))} ${tokenName}`)
    console.log(`Your Balance is ${chalk.blue(formatEther(userBalance))} ${tokenName}`)

    displayNotFundAndExit(nowAgencyPrice[0] + nowAgencyPrice[1], userBalance)
    
    const userSlippagePrice = await inputETHNumber("Maximum cost available for mint: ", formatEther(nowAgencyPrice[0] + nowAgencyPrice[1]))
    let agencyTokenName = await input({ message: 'Enter Agent Name: ' })

    while (await existAgentName(agencyTokenName, agencyStrategy[0])) {
        console.log(chalk.red("Name has been registered"))
        agencyTokenName = await input({ message: 'Enter Agent Name: ' })
    }

    const answer = await confirm({ message: 'Continue Mint Agent NFT?' });

    if (answer) {
        await wrapAgency(agencyTokenName, userSlippagePrice, agencyAddress, agencyStrategy[1].currency)
    }
}

export const unwrap = async () => {
    const agencyAddress = await selectWrapAddress(userConfig)
    const agencyStrategy = await getAgencyStrategy(agencyAddress)
    const tokenName = await getERC20Name(agencyStrategy[1].currency)

    const burnGet = await getAgenctBurnPrice(agencyAddress, agencyStrategy[0])

    console.log(`Burn NFT will get ${chalk.blue(formatEther(burnGet[0] - burnGet[1]))} ${tokenName}`)

    const answer = await confirm({ message: 'Continue Burn Agent NFT?' })

    if (answer) {
        const agencyTokenId = BigInt(await input({ message: 'Enter Agent NFT ID: ' }))
        const authorityExist = await isApproveOrOwner(agencyStrategy[0], agencyTokenId)

        if (!authorityExist) {
            console.log(chalk.red('Not NFT Approve or Owner'))
            return
        } else {
            const userSlippagePrice = BigInt(0)
            await unwrapAgency(agencyTokenId, userSlippagePrice, agencyAddress, tokenName)
        }
    }
}

export const setUserTokenURIEngine = async () => {
    const agencyAddress = await selectWrapAddress(userConfig)
    const agencyStrategy = await getAgencyStrategy(agencyAddress)

    const agencyTokenId = BigInt(await input({ message: 'Enter Agent NFT ID: ' }))
    const authorityExist = await isApproveOrOwner(agencyStrategy[0], agencyTokenId)

    if (!authorityExist) {
        console.log(chalk.red('Not NFT Approve or Owner'))
        return
    } else {
        const tokenURIEngineAddress = await inputAddress("Enter TokenURI Engine Address: ")
        const { request } = await publicClient.simulateContract({
            account,
            address: agencyStrategy[0],
            abi: agentABI,
            functionName: 'setTokenURIEngine',
            args: [agencyTokenId, tokenURIEngineAddress]
        })
    
        const setTokenURIHash = await walletClient.writeContract(request)
        console.log(`Set TokenURI Engine Hash: ${chalk.blue(setTokenURIHash)}`)
    }
}

export const updateAgenctConfig = async () => {
    const agencyAddress = await inputAddress('Enter Your Agent Address: ')

    const agencySettings = await getAgencyStrategy(agencyAddress)

    const tokenName = await getERC20Name(agencySettings[1].currency)

    const agencyName = await getAgentName(agencySettings[0])
    const agentMaxSupply = await getAgentMaxSupply(agencySettings[0])

    console.log(boxen(`Agency Name: ${chalk.blue(agencyName)}\n`
        + `Currency: ${chalk.blue(tokenName)}\n`
        + `Currency Address: ${chalk.blue(agencySettings[1].currency)}\n`
        + `Base Premium: ${chalk.blue(agencySettings[1].basePremium.toString(10))}\n`
        + `Mint Fee Percent: ${chalk.blue(agencySettings[1].mintFeePercent.toString(10))}\n`
        + `Burn Fee Percent: ${chalk.blue(agencySettings[1].burnFeePercent.toString(10))}\n`
        + `Max Supply: ${chalk.blue(agentMaxSupply.toString(10))}`, { padding: 1 }))
    
    const answer = await confirm({ message: 'Continue Update Agency Config?' })

    if (answer) {
        updateConfig(undefined, { value: agencyAddress, description: agencyName })
    } else {
        exit()
    }
}

export const createERC6551Account = async () => {
    const agencyAddress = await selectWrapAddress(userConfig)
    const agencyStrategy = await getAgencyStrategy(agencyAddress)
    let userInputSalt = toHex(await input({ message: 'Enter Address Salt: ' }), { size: 32 })
    const tokenId = BigInt(await input({ message: 'Enter Agent NFT ID: ' }))
    const { request, result } = await publicClient.simulateContract({
        account,
        abi: erc6551RegistryABI,
        address: agencyStrategy[0],
        functionName: 'createAccount',
        args: [
            erc6551Implementation, 
            userInputSalt, 
            BigInt(publicClient.chain!.id),
            agencyStrategy[0],
            tokenId
        ]
    })

    console.log(`ERC6551 Account: ${chalk.blue(result)}`)

    const createAccountHash = await walletClient.writeContract(request)
    console.log(`Create ERC6551 Account Hash: ${chalk.blue(createAccountHash)}`)
}

const existName = async (name: string) => {
    const nameHash = keccak256(toHex(name))
    const subNode = keccak256(concat(['0xb43dbfc1d2fecc659fffd218f4abb6ed0b35bd3896ba6be21f0ca46fb2102ab1', nameHash]))

    const request = await publicClient.readContract({
        ...deployer,
        functionName: "isRecordExists",
        args: [subNode]
    })

    return request
}

const existAgentName = async (name: string, appAddress: `0x${string}`) => {
    const agentName = await getAgentSymbol(appAddress)
    const nameHash = keccak256(toHex(agentName))
    const rootNode = keccak256(concat([toHex(0, { size: 32 }), nameHash]))
    const subNode = keccak256(concat([rootNode, keccak256(toHex(name))]))

    const request = await publicClient.readContract({
        address: appAddress,
        abi: agentABI,
        functionName: "isRecordExists",
        args: [subNode]
    })

    return request
}

const updateConfig = async (tokenId?: { name: string, value: number }, agency?: { value: string, description: string }) => {
    if (tokenId) {
        userConfig.tokenId.push(tokenId)
    }
    if (agency) {
        userConfig.agency.push(agency)
    }
    fs.writeFileSync('config.json', JSON.stringify(userConfig))
}

const mintDeployerName = async (name: string, price: bigint) => {
    const { request, result } = await publicClient.simulateContract({
        account,
        ...deployer,
        value: price,
        functionName: 'mint',
        args: [name]
    })

    const mintHash = await walletClient.writeContract(request)

    console.log(`Token ID: ${chalk.blue(result.toString(10))}`)
    updateConfig({ name: name, value: Number(result) })
    console.log(`Mint Hash: ${chalk.blue(mintHash)}`)
}

const getERC20Name = async (tokenAddress: `0x${string}`) => {
    if (tokenAddress === '0x0000000000000000000000000000000000000000') {
        return 'ETH'
    } else {
        const name = await publicClient.readContract({
            address: tokenAddress,
            abi: parseAbi(['function name() view returns (string)']),
            functionName: "name",
        })
        return name
    }
}

const getERC20Approve = async (tokenAddress: `0x${string}`, agencyAddress: `0x${string}`) => {
    const result = await publicClient.readContract({
        address: tokenAddress,
        abi: parseAbi(['function allowance(address, address) view returns (uint256)']),
        functionName: "allowance",
        args: [account.address, agencyAddress]
    })

    return result
}

const setERC20Approve = async (tokenAddress: `0x${string}`, agencyAddress: `0x${string}`, tokenAmount: bigint) => {
    const { request } = await publicClient.simulateContract({
        account,
        address: tokenAddress,
        abi: parseAbi(['function approve(address, uint256) public returns (bool)']),
        functionName: 'approve',
        args: [agencyAddress, tokenAmount]
    })

    const approveHash = await walletClient.writeContract(request)
    console.log(`Approve Hash: ${chalk.blue(approveHash)}`)
}

const getAgentName = async (agentAddress: `0x${string}`) => {
    const agentName = await publicClient.readContract({
        address: agentAddress,
        abi: appABI,
        functionName: "name",
    })

    return agentName
}

const getAgentMaxSupply = async (agentAddress: `0x${string}`) => {
    const maxSupply = await publicClient.readContract({
        address: agentAddress,
        abi: agentABI,
        functionName: "getMaxSupply",
    })

    return maxSupply
}

const getERC20Balance = async (tokenAddress: `0x${string}`, accountAddress: `0x${string}`) => {
    const balance = await publicClient.readContract({
        address: tokenAddress,
        abi: parseAbi(['function balanceOf(address) view returns (uint256)']),
        functionName: "balanceOf",
        args: [accountAddress]
    }) 

    return balance
}
const getUserBalance = async (tokenAddress: `0x${string}`) => {
    if (tokenAddress === '0x0000000000000000000000000000000000000000') {
        return accountBalance
    } else {
        const balance = getERC20Balance(tokenAddress, account.address)

        return balance
    }
}

const getAgenctConfig = async (appImplementation: `0x${string}`) => {
    let tokenId: number;

    if (userConfig.tokenId.length === 0) {
        const name = await input({ message: 'Enter Your Deployer Name:' })
        tokenId = Number.parseInt(await input({ message: 'Enter Your Deployer Token ID:' }))
        updateConfig({ name: name, value: tokenId })
    } else {
        tokenId = Number.parseInt(await select({
            message: "Select Your Deployer Token",
            choices: userConfig.tokenId.map(({ name, value }) => {
                return {
                    name: name,
                    value: value.toString(10)
                }
            })
        }))
    }

    const redeployCheck = await publicClient.readContract({
        address: wrapFactory.address,
        abi: factoryABI,
        functionName: "app",
        args: [appImplementation, BigInt(tokenId)]
    })

    if (redeployCheck !== '0x0000000000000000000000000000000000000000') {
        console.log(chalk.red('Deployer has been registered in factory'))
        exit()
    }

    const currency = await inputAddress('Enter ERC20 address (zero address is ETH):', '0x0000000000000000000000000000000000000000')
    const currencyName = await getERC20Name(currency)
    const basePremium = BigInt(Number.parseInt(await input({ message: 'Enter Base Premium:' }), 10))
    const feeRecipient = getAddress('0x0000000000000000000000000000000000000000')
    const mintFeePercent = await inputMoreThanMinimumValue('Enter Mint Fee Percent(>300):')
    const burnFeePercent = await inputMoreThanMinimumValue('Enter Burn Fee Percent(>300):')
    const maxSupply = Number.parseInt(await input({ message: 'Enter Max Supply(If set to 0, unlimited supply): ', default: "0" }), 10)
    console.log(boxen(`Currency: ${chalk.blue(currencyName)}\nBase Premium: ${chalk.blue(basePremium.toString(10))}\nMint Fee Percent: ${chalk.blue(mintFeePercent)}\nBurn Fee Percent: ${chalk.blue(burnFeePercent)}\nMax Supply: ${chalk.blue(maxSupply === 0 ? 'Unlimited' : maxSupply)}`, { padding: 1 }))

    return { tokenId, config: { currency, basePremium, feeRecipient, mintFeePercent, burnFeePercent, maxSupply } }
}

const deployAgencyAndApp = async (
    tokenId: number,
    agencyImplementation: `0x${string}`,
    appImplementation: `0x${string}`,
    assetConfig: {
        currency: `0x${string}`;
        basePremium: bigint;
        feeRecipient: `0x${string}`;
        mintFeePercent: number;
        burnFeePercent: number;
        maxSupply: number;
    },
) => {
    let appImmutableData: `0x${string}`

    if (assetConfig.maxSupply === 0) {
        appImmutableData = toHex(0, { size: 32 })
    } else {
        appImmutableData = toHex(assetConfig.maxSupply, { size: 32 })
    }

    const { request, result } = await publicClient.simulateContract({
        account,
        ...wrapFactory,
        functionName: 'deployWrap',
        args: [
            {
                implementation: agencyImplementation,
                asset: {
                    ...assetConfig
                },
                immutableData: "0x",
                initData: "0x"
            },
            {
                implementation: appImplementation,
                immutableData: appImmutableData,
                initData: getFunctionSelector("init()")
            },
            toHex(tokenId, { size: 32 })
        ]
    })

    console.log(`Agency Address: ${chalk.blue(result)}`)
    const deployHash = await walletClient.writeContract(request)
    const tokenName = userConfig.tokenId.find(({ value }) => value === tokenId)!.name
    updateConfig(undefined, { value: result, description: tokenName })
    console.log(`Deploy Agency Hash: ${chalk.blue(deployHash)}`)
}

const getAgencyStrategy = async (agencyAddress: `0x${string}`) => {
    const agencyStrategy = await publicClient.readContract({
        address: agencyAddress,
        abi: agencyABI,
        functionName: "getStrategy",
    })
    // TODo: erc20 token
    return agencyStrategy
}

const getAgencyTotalSupply = async (appAddress: `0x${string}`) => {
    const totalSupply = await publicClient.readContract({
        address: appAddress,
        abi: appABI,
        functionName: "totalSupply",
    })

    return totalSupply
}

const getAgentMintPrice = async (agencyAddress: `0x${string}`, appAddress: `0x${string}`) => {
    const totalSupply = await getAgencyTotalSupply(appAddress)

    const nowAgencyPrice = await publicClient.readContract({
        address: agencyAddress,
        abi: agencyABI,
        functionName: "getWrapOracle",
        args: [toHex(totalSupply, { size: 32 })]
    })

    return nowAgencyPrice
}

const getAgentSymbol = async (agencyAddress: `0x${string}`) => {
    const symbol = await publicClient.readContract({
        address: agencyAddress,
        abi: agentABI,
        functionName: "symbol",
    })

    return symbol
}

const getAgenctBurnPrice = async (agencyAddress: `0x${string}`, appAddress: `0x${string}`) => {
    const totalSupply = await getAgencyTotalSupply(appAddress)

    const nowAgencyBurnPrice = await publicClient.readContract({
        address: agencyAddress,
        abi: agencyABI,
        functionName: "getUnwrapOracle",
        args: [toHex(totalSupply, { size: 32 })]
    })

    return nowAgencyBurnPrice
}

const isApproveOrOwner = async (appAddress: `0x${string}`, tokenId: bigint) => {

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

const wrapAgency = async (name: string, price: bigint, agencyAddress: `0x${string}`, tokenAddress: `0x${string}`) => {
    const toAddress = await inputAddress('Enter NFT Receiver Address: ', account.address)
    const args = encodeAbiParameters(
        [{ 'name': 'slippagePrice', 'type': 'uint256' }, { 'name': 'name', 'type': 'bytes' }],
        [price, encodeAbiParameters([{ 'name': 'name', 'type': 'string' }], [name])]
    )

    if (tokenAddress === '0x0000000000000000000000000000000000000000') {
        const { request, result } = await publicClient.simulateContract({
            account,
            value: price,
            address: agencyAddress,
            abi: agencyABI,
            functionName: 'wrap',
            args: [
                toAddress,
                args
            ]
        })

        console.log(`Wrap Agency ID: ${chalk.blue(result)}`)
        const mintHash = await walletClient.writeContract(request)
        console.log(`Mint Hash: ${chalk.blue(mintHash)}`)
    } else {
        const userApproveValue = await getERC20Approve(tokenAddress, agencyAddress)
        // console.log(`Approve Value: ${chalk.blue(formatEther(userApproveValue))}`)
        // console.log(`Price: ${chalk.blue(formatEther(price))}`)
        if (userApproveValue < price) {
            const userNewApprove = await inputETHNumber("Enter New Approve Value: ", formatEther(price))
            await setERC20Approve(tokenAddress, agencyAddress, userNewApprove)
            let nowblockNumber = await publicClient.getBlockNumber()
            const nextBlockNumber = nowblockNumber + BigInt(3)

            while (nowblockNumber < nextBlockNumber) {
                await sleep(30000)

                nowblockNumber = await publicClient.getBlockNumber()
            }

            const { request, result } = await publicClient.simulateContract({
                account,
                address: agencyAddress,
                abi: agencyABI,
                blockNumber: nowblockNumber,
                functionName: 'wrap',
                args: [
                    toAddress,
                    args
                ]
            })

            console.log(`Wrap Agency ID: ${chalk.blue(result)}`)
            const mintHash = await walletClient.writeContract(request)
            console.log(`Mint Hash: ${chalk.blue(mintHash)}`)
        } else {
            const { request, result } = await publicClient.simulateContract({
                account,
                address: agencyAddress,
                abi: agencyABI,
                functionName: 'wrap',
                args: [
                    toAddress,
                    args
                ]
            })

            console.log(`Wrap Agency ID: ${chalk.blue(result)}`)
            const mintHash = await walletClient.writeContract(request)
            console.log(`Mint Hash: ${chalk.blue(mintHash)}`)
        }
    }
}

const unwrapAgency = async (tokenId: bigint, price: bigint, agencyAddress: `0x${string}`, tokenName: string) => {
    const toAddress = await inputAddress(`Enter ${tokenName} Receiver Address: `, account.address)
    const args = encodeAbiParameters(
        [{ 'name': 'slippagePrice', 'type': 'uint256' }, { 'name': 'name', 'type': 'bytes' }],
        [price, "0x"]
    )

    const { request } = await publicClient.simulateContract({
        account,
        address: agencyAddress,
        abi: agencyABI,
        functionName: 'unwrap',
        args: [
            toAddress, tokenId, args
        ]
    })

    const burnHash = await walletClient.writeContract(request)

    console.log(`Unwrap Hash: ${chalk.blue(burnHash)}`)
}