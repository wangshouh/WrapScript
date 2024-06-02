import { createWalletClient, createPublicClient, http, PublicClient, WalletClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { localhost, mainnet, sepolia } from 'viem/chains'
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
  // {
  //   "name": "WrapV1Linear",
  //   "value": "onePercentConfig",
  //   "description": "User minting price increases by basePremium percentage",
  //   "agencyImplementation": "0xaB0E85c463C27F8A5501B5933F6Da1D18Ab62283",
  //   "appImplementation": "0x1C91bEB7d3249846E226A029DE93BEb5eA1e4CFe"
  // },
  {
    "name": "WrapV1Auction",
    "value": "auctionConfig",
    "description": "Minting prices are obtained through auctions",
    "agencyImplementation": "0x9274d322e5E79568336AA74aB42ca38663af28Ed",
    "appImplementation": "0x2c0CA12E536C464A37803449185D5910D117e81a"
  },
  // {
  //   "name": "WrapV1RandomWalker",
  //   "value": "randomConfig",
  //   "description": "Minting prices are obtained through standard normal random",
  //   "agencyImplementation": "0x47303297b8ED07FA8763b487e7f12CA1e11033A2",
  //   "appImplementation": "0x1C91bEB7d3249846E226A029DE93BEb5eA1e4CFe"
  // }
]

export const uniswapV2Pair = "0xB72b050b451f410FE0C5dB04C14FDDC871e72F4a" as `0x${string}`

export const defaultDotAgencyTokenURI = "0xA11DE9A0e0c757959911D0612fd1F2BC12C27a49" as `0x${string}`
export const defaultAgentTokenURI = "0x847288d1515c970082CA0a6867cfD5685880f3Ab" as `0x${string}`

export const defaultAgentResolver = "0x59d711c45a622890Ad2368D6Fa7e7290fec3fd66" as `0x${string}`
export const defaultDotAgencyResolver = "0x6aCca1410C16FfDD60866be84b541492C2398C4e" as `0x${string}`

export const WrapCoinAddress = "0x1403a89954db2f88898d99D627549299E91209F5" as `0x${string}`

export const tokenURIEngineConfig = [
  {
    "name": "Mobius",
    "value": "0x847288d1515c970082CA0a6867cfD5685880f3Ab" as `0x${string}`,
    "description": "Generate Mario-style on-chain images",
  }
  // {
  //   "name": "CCIP Azimuth",
  //   "value": "0xCCf1FD8F8629c1b5Aa1a8E1F92629637d5ab1a5e" as `0x${string}`,
  //   "description": "Generate Azimuth through CCIP"
  // }
]

// GDA 0x1f53ad02bdcdef458acd00235cf6b4f20574d903
// cast send  --value 100gwei --nonce 85 --private-key $PRIVATE_KEY --rpc-url $RPC_URL
// cast nonce  -r $RPC_URL -B pending