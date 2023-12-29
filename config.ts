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
export const rpcUrl = process.env.RPC_URL

export const walletClient: WalletClient = createWalletClient({
  account,
  chain: goerli,
  transport: http(rpcUrl)
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
      "agencyImplementation": "0xb4972cc5D57cDE9fE905Fa2CEA9e8DbC1749d8E8",
      "appImplementation": "0x10317e0D2652D6095C7D68c313B7E126aA5cC6cD"
  }
]

export const tokenURIEngineConfig = [
  {
    "name": "Mairo",
    "value": "0x2D2F757877547ef03Ee7d0D7e49AF391b6931071" as `0x${string}`,
    "description": "Generate Mario-style on-chain images",
  }
]

// GDA 0xd41da6655312Be465E77016D3f0E85CDDBD88545