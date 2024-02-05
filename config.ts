import { createWalletClient, createPublicClient, http, PublicClient, WalletClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import fs from 'fs'
// https://1rpc.io/sepolia
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
  chain: sepolia,
  transport: http(rpcUrl)
})

export const publicClient: PublicClient = createPublicClient({
  chain: sepolia,
  transport: http(rpcUrl)
}) as PublicClient;

export const agencyAndAppConfig = [
  {
    "name": "One Percent",
    "value": "onePercentConfig",
    "description": "User minting price increases by basePremium percentage",
    "agencyImplementation": "0xe99df16159BE4cBa4D13D087130BD7e736234524",
    "appImplementation": "0xDA325D283C83EEC630ef970C5fB46961AA4D31a5"
  },
  {
    "name": "Auction",
    "value": "auctionConfig",
    "description": "Minting prices are obtained through auctions",
    "agencyImplementation": "0x19c0A2Adeab6557679e1242E5BA8560Ce3844749",
    "appImplementation": "0xDA325D283C83EEC630ef970C5fB46961AA4D31a5"
  }
]

export const defaultDeployerTokenURI = "0x6F8D959d3104778685B9CAA373C3b035a8B0B4f2" as `0x${string}`
export const defaultAgentTokenURI = "0x3d5a6634D20F7CcBAa0D94d264DBB7251a125BDd" as `0x${string}`

export const tokenURIEngineConfig = [
  {
    "name": "Mairo",
    "value": "0x3d5a6634D20F7CcBAa0D94d264DBB7251a125BDd" as `0x${string}`,
    "description": "Generate Mario-style on-chain images",
  }
]

// GDA 0x1f53ad02bdcdef458acd00235cf6b4f20574d903