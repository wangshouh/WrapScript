import { createWalletClient, createPublicClient, http, PublicClient, WalletClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { localhost, sepolia } from 'viem/chains'
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
// console.log(rpcUrl)
export const walletClient: WalletClient = createWalletClient({
  account,
  chain: sepolia,
  transport: http(rpcUrl)
  // transport: http("http://127.0.0.1:8545")
})

export const publicClient: PublicClient = createPublicClient({
  chain: sepolia,
  transport: http(rpcUrl)
  // transport: http("http://127.0.0.1:8545")
}) as PublicClient;

export const agencyAndAppConfig = [
  {
    "name": "WrapV1Linear",
    "value": "onePercentConfig",
    "description": "User minting price increases by basePremium percentage",
    "agencyImplementation": "0xA1bFB2dfe4D74B7729ED986A3DfDB60Db95Ae9eE",
    "appImplementation": "0x31E7D791A773d57e2f1DFeF6A60eF3ecBe91e9ae"
  },
  {
    "name": "WrapV1Auction",
    "value": "auctionConfig",
    "description": "Minting prices are obtained through auctions",
    "agencyImplementation": "0x8676fBF60F366F5A7E235F9B92a24cA73a645b16",
    "appImplementation": "0x31E7D791A773d57e2f1DFeF6A60eF3ecBe91e9ae"
  },
  {
    "name": "WrapV1RandomWalker",
    "value": "randomConfig",
    "description": "Minting prices are obtained through standard normal random",
    "agencyImplementation": "0x0BDa43F095ec10d5B9451b03045Cd9ff1eB3Bef8",
    "appImplementation": "0x31E7D791A773d57e2f1DFeF6A60eF3ecBe91e9ae"
  }
]

export const defaultDotAgencyTokenURI = "0x1B8fe4E5FbfdBD96f282C7c73D168C815a6a1129" as `0x${string}`
export const defaultAgentTokenURI = "0x73f7e324F4B3d029240e4d36D70CAdFcA7F2E100" as `0x${string}`

export const defaultAgentResolver = "0xfBa79bbb6c8dbf425A68AE24042e3d3DfbD43b50" as `0x${string}`
export const defaultDotAgencyResolver = "0x9E62C2Ca053C0a7F299985816A016c2Bd546D41D" as `0x${string}`

export const WrapCoinAddress = "0x4E3204D041299a55989F22752c528089A9c51BfD" as `0x${string}`

export const tokenURIEngineConfig = [
  {
    "name": "Mairo",
    "value": "0x73f7e324F4B3d029240e4d36D70CAdFcA7F2E100" as `0x${string}`,
    "description": "Generate Mario-style on-chain images",
  },
  {
    "name": "CCIP Azimuth",
    "value": "0xCCf1FD8F8629c1b5Aa1a8E1F92629637d5ab1a5e" as `0x${string}`,
    "description": "Generate Azimuth through CCIP"
  }
]

// GDA 0x1f53ad02bdcdef458acd00235cf6b4f20574d903
// cast send  --value 100gwei --nonce 85 --private-key $PRIVATE_KEY --rpc-url $RPC_URL
// cast nonce  -r $RPC_URL -B pending