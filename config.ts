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
// console.log(rpcUrl)
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
    "name": "WrapV1Linear",
    "value": "onePercentConfig",
    "description": "User minting price increases by basePremium percentage",
    "agencyImplementation": "0x7eed5B5a0B0adaA02229b4f51c596bCbA7D0956A",
    "appImplementation": "0x85886f8aAa2d9cd73940558DAaA761C8541F5F4f"
  },
  {
    "name": "WrapV1Auction",
    "value": "auctionConfig",
    "description": "Minting prices are obtained through auctions",
    "agencyImplementation": "0xfC652647cF2d3BfdB47abD9dfA912403c6CeB1C5",
    "appImplementation": "0x85886f8aAa2d9cd73940558DAaA761C8541F5F4f"
  },
  {
    "name": "WrapV1RandomWalker",
    "value": "randomConfig",
    "description": "Minting prices are obtained through standard normal random",
    "agencyImplementation": "0x2BcA5F05B2e0e7098C0f35773b43Ec5ACa6F248e",
    "appImplementation": "0x85886f8aAa2d9cd73940558DAaA761C8541F5F4f"
  }
]

export const defaultDotAgencyTokenURI = "0xb612289E5Da6488dc242fE5e6d49a7ff7D136629" as `0x${string}`
export const defaultAgentTokenURI = "0xA70dC0784048E3467603AeEb1bD86FC940b266eF" as `0x${string}`

export const defaultAgentResolver = "0x686D96c24953426093c4c1f8F7f4F3FB9151bE0C" as `0x${string}`
export const defaultDotAgencyResolver = "0x9DfaEB6dFe5bfebC5DE0f34035c80D9db83C5eaF" as `0x${string}`

export const tokenURIEngineConfig = [
  {
    "name": "Mairo",
    "value": "0xA70dC0784048E3467603AeEb1bD86FC940b266eF" as `0x${string}`,
    "description": "Generate Mario-style on-chain images",
  }
]

// GDA 0x1f53ad02bdcdef458acd00235cf6b4f20574d903
// cast send  --value 100gwei --nonce 85 --private-key $PRIVATE_KEY --rpc-url $RPC_URL
// cast nonce  -r $RPC_URL -B pending