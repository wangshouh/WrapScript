import { select } from "@inquirer/prompts"
import { WrapCoinAddress, account, publicClient, walletClient } from "./config"
import { inputAddress, inputTokenNumber } from "./utils/display"
import { erc6551AccountABI } from "./abi/erc6551"
import chalk from 'chalk'
import { exit } from 'node:process';
import { encodeFunctionData, formatUnits, parseUnits } from "viem"
import { erc20Abi } from "./abi/erc20Abi"

export const erc6551Select = async () => {
    const erc6551Operation = await select({
        message: "Select the ERC6551 operation",
        choices: [
            {
                name: "Transfer ERC20",
                value: "erc6551TransferERC20",
            }
        ]
    })

    switch (erc6551Operation) {
        case "erc6551TransferERC20":
            const erc6551Address = await inpuERC6551tAddress()
            await erc6551TransferERC20(erc6551Address)
            break

        default:
            break
    }
}

const inpuERC6551tAddress = async () => {
    const ownerAddress = walletClient.account?.address

    const erc6551Address = await inputAddress("Enter ERC6551 Address: ")

    const erc6551OwnerAddress = await publicClient.readContract({
        address: erc6551Address,
        abi: erc6551AccountABI,
        functionName: "owner"
    })

    if (erc6551OwnerAddress !== ownerAddress) {
        console.log(chalk.red("Not ERC6551 Owner"))
        exit(1)
    }

    return erc6551Address
}
const erc6551TransferERC20 = async (erc6551Address: `0x${string}`) => {
    const erc20Address = await inputAddress("Enter ERC20 Address: ", WrapCoinAddress)

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

    const erc20Balance = await publicClient.readContract({
        address: erc20Address,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [erc6551Address]
    })

    console.log(`ERC661 ${tokenName.result} Balance: ${chalk.blue(formatUnits(erc20Balance, tokeDecimals.result!))}`)

    const toAddress = await inputAddress(`Enter ${tokenName.result} Receiver Address: `, walletClient.account?.address)
    const amount = await inputTokenNumber("Enter Amount: ", tokeDecimals.result!, formatUnits(erc20Balance, tokeDecimals.result!))

    const transferCalldata = encodeFunctionData({
        abi: erc20Abi,
        functionName: "transfer",
        args: [toAddress, amount]
    })

    const { request } = await publicClient.simulateContract({
        account,
        address: erc6551Address,
        abi: erc6551AccountABI,
        functionName: "execute",
        args: [erc20Address, BigInt(0), transferCalldata, 0]
    })

    const transferHash = await walletClient.writeContract(request)
    console.log(`Transfer Hash: ${chalk.blue(transferHash)}`)
}

await erc6551Select()