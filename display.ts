import { exit } from 'node:process';
import chalk from 'chalk'
import { isAddress, getAddress, parseEther } from "viem"
import { UserConfig } from './config'
import { select, input } from '@inquirer/prompts';
import fs from 'fs'

export const displayNotFundAndExit = (price: bigint, balance: bigint) => {
    if (balance < price) {
        console.log(chalk.red("Insufficient account balance"))
        exit(1)
    }
}

export const inputAddress = async (message: string, defalutMessage?: string) => {
    const inputAddressString = getAddress(await input({ message, default: defalutMessage, validate: (value) => isAddress(value) }))
    return inputAddressString
}

export const inputETHNumber = async (message: string, defalutMessage?: string) => {
    const inputNumber = parseEther(await input({ message,  default: defalutMessage }))
    return inputNumber
}

export const inputMoreThanMinimumValue =async (message: string) => {
    const feePercent = Number.parseInt(await input({ message, validate: (value) => Number.parseInt(value) > 300 }), 10)
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

export const selectTokenId = async (userConfig: UserConfig) => {
    let tokenId: number;
    if (userConfig.tokenId.length === 0) {
        const name = await input({ message: 'Enter Your Deployer Name:' })
        tokenId = Number.parseInt(await input({ message: 'Enter Your Deployer Token ID:' }))
        updateConfig(userConfig, { name: name, value: tokenId })
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

    return tokenId
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