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
    "name": "One Percent",
    "value": "onePercentConfig",
    "description": "User minting price increases by basePremium percentage",
    "agencyImplementation": "0x3cF2eB41E80dFd8213A96e8faA4eF6A872Ab9e8d",
    "appImplementation": "0x80C8Aa5771B666B37A582662Db20cD2655b37988"
  },
  // {
  //   "name": "Auction",
  //   "value": "auctionConfig",
  //   "description": "Minting prices are obtained through auctions",
  //   "agencyImplementation": "0x05B992b67CD8B2ac3f8f045A99b6e9F16312Ce0d",
  //   "appImplementation": "0x80C8Aa5771B666B37A582662Db20cD2655b37988"
  // },
  // {
  //   "name": "RandomWalker",
  //   "value": "randomConfig",
  //   "description": "Minting prices are obtained through standard normal random",
  //   "agencyImplementation": "0x59642b6F43FED0d391E572EBB547c40343677900",
  //   "appImplementation": "0x80C8Aa5771B666B37A582662Db20cD2655b37988"
  // }
]

export const defaultDotAgencyTokenURI = "0xb612289E5Da6488dc242fE5e6d49a7ff7D136629" as `0x${string}`
export const defaultAgentTokenURI = "0xA70dC0784048E3467603AeEb1bD86FC940b266eF" as `0x${string}`

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