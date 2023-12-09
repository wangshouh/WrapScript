import { createWalletClient, createPublicClient, http, PublicClient, WalletClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { goerli } from 'viem/chains'
import fs from 'fs'
// https://rpc.ankr.com/eth_goerli
// 0xEd78bF31CD8E36c628e048D0e47e9a38913d34eF
export const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`) 

interface tokenIdConfig {
  name: string,
  value: number
}

interface agencyConfig {
  value: string,
  description: string
}

export interface UserConfig {
  tokenId: tokenIdConfig[],
  agency: agencyConfig[]
}

export const userConfig: UserConfig = JSON.parse(fs.readFileSync('./config.json', 'utf8'))

export const walletClient: WalletClient = createWalletClient({
  account,
  chain: goerli,
  transport: http()
})

export const publicClient: PublicClient = createPublicClient({
    chain: goerli,
    transport: http()
}) as PublicClient;

export const agencyAndAppConfig = [
  {
      "name": "One Percent",
      "value": "onePercentConfig",
      "description": "User minting price increases by basePremium percentage",
      "agencyImplementation": "0x659CE0D81063e62b1c78FF220781550fDe4c632C",
      "appImplementation": "0xcF1C0cBa744346925151715bc30632083849e58d"
  }
]