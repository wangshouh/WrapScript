import { exit } from 'node:process';
import chalk from 'chalk'
import { isAddress, getAddress, parseEther, toHex, parseUnits } from "viem"
import { UserConfig, tokenURIEngineConfig } from '../config'
import { select, input } from '@inquirer/prompts';
import fs from 'fs'
import { getAgencyStrategy, isApproveOrOwner } from './data';

export const displayNotFundAndExit = (price: bigint, balance: bigint) => {
    if (balance < price) {
        console.log(chalk.red("Insufficient account balance"))
        exit(1)
    }
}

export const displayConfirmAndExit = (message: string) => {
    const answer = confirm(message)
    if (!answer) {
        exit(1)
    }
}

export const inputAddress = async (message: string, defalutMessage?: string) => {
    const inputAddressString = getAddress(await input({ message, default: defalutMessage, validate: (value) => isAddress(value) }))
    return inputAddressString
}

export const inputETHNumber = async (message: string, defalutMessage?: string) => {
    const inputNumber = parseEther(await input({ message, default: defalutMessage })) as bigint
    return inputNumber
}

export const inputTokenNumber = async (message: string, decimals: number, defalutMessage?: string) => {
    const inputNumber = parseUnits(await input({ message, default: defalutMessage }), decimals)
    return inputNumber
}

export const inputMoreThanMinimumValue = async (message: string) => {
    const feePercent = Number.parseInt(await input({ message, validate: (value) => Number.parseInt(value) >= 500 }), 10)
    return feePercent
}

export const selectWrapAddress = async (userConfig: UserConfig) => {
    let address: string;
    if (userConfig.agency.length === 0) {
        const description = await input({ message: 'Enter Your Agency Name:' })
        address = await inputAddress('Enter Your Agency Address:')
        updateConfig(userConfig, undefined, { value: address, description: description })
    } else {
        address = await select({
            message: "Select Your Agency Address",
            choices: userConfig.agency.map(({ value, description }) => {
                return {
                    name: value,
                    description: description,
                    value: value
                }
            })
        })
    }

    return address as `0x${string}`
}

export const selectDotAgency = async (userConfig: UserConfig) => {
    let tokenId: number;

    if (userConfig.tokenId.length === 0) {
        const name = await input({ message: 'Enter Your .Agency Name:' })
        tokenId = Number.parseInt(await input({ message: 'Enter Your .Agency Token ID:' }))

        updateConfig(userConfig, { name: name, value: tokenId })
    } else {
        tokenId = await select({
            message: "Select Your .Agency TokenId",
            choices: userConfig.tokenId.map(({ name, value }) => {
                return {
                    name: name,
                    value: value
                }
            })
        })
    }

    return tokenId
}

export const selectTokenId = async (userConfig: UserConfig) => {
    let tokenId: number;
    if (userConfig.tokenId.length === 0) {
        const name = await input({ message: 'Enter Your Agency Name:' })
        tokenId = Number.parseInt(await input({ message: 'Enter Your Agency Token ID:' }))
        updateConfig(userConfig, { name: name, value: tokenId })
    } else {
        tokenId = Number.parseInt(await select({
            message: "Select Your Agency Token",
            choices: userConfig.tokenId.map(({ name, value }) => {
                return {
                    name: name,
                    value: value.toString(10)
                }
            })
        }))
    }

    return tokenId
}

export const chooseAgencyNFTWithTokenId = async (userConfig: UserConfig) => {
    const agencyAddress = await selectWrapAddress(userConfig)
    const agencyStrategy = await getAgencyStrategy(agencyAddress)

    const agencyTokenId = BigInt(await input({ message: 'Enter ERC7527 ID: ' }))
    const authorityExist = await isApproveOrOwner(agencyStrategy[0], agencyTokenId)

    if (!authorityExist) {
        console.log(chalk.red('Not NFT Approve or Owner'))
        exit(1)
    }

    return { agencyTokenId, agencyStrategy }
}

export const selectOrInputTokenURIEngineAddress = async () => {
    let tokenURIEngineAddress = await select({
        message: "TokenURI Engine Selection",
        choices: tokenURIEngineConfig
    })

    if (tokenURIEngineAddress === "0x0") {
        tokenURIEngineAddress = await inputAddress("Enter TokenURI Engine Address: ")
    }

    return tokenURIEngineAddress
}

const updateConfig = async (userConfig: UserConfig, tokenId?: { name: string, value: number }, agency?: { value: string, description: string }) => {
    if (tokenId) {
        userConfig.tokenId.push(tokenId)
    }
    if (agency) {
        userConfig.agency.push(agency)
    }
    fs.writeFileSync('config.json', JSON.stringify(userConfig))
}

export const getExtraAgencyConfig = async (agencyImplementation: `0x${string}`) => {
    switch (agencyImplementation) {
        case "0xA1bFB2dfe4D74B7729ED986A3DfDB60Db95Ae9eE":
            const coef = Number(await input({ message: "Please enter the k(integer): " }))
            
            const finalArgs = toHex(coef, { size: 32})

            return finalArgs

        default:
            return "0x" as `0x${string}`
    }
}