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
    "name": "WrapV2Auction",
    "value": "auctionConfig",
    "description": "Minting prices are obtained through auctions",
    "agencyImplementation": "0x476992b294E0793AD601a4531FC5e7bd55e1bb0E",
    "appImplementation": "0x80596E288774eCC2d50bA934B960e208F8D884d6"
  },
  // {
  //   "name": "WrapV1RandomWalker",
  //   "value": "randomConfig",
  //   "description": "Minting prices are obtained through standard normal random",
  //   "agencyImplementation": "0x47303297b8ED07FA8763b487e7f12CA1e11033A2",
  //   "appImplementation": "0x1C91bEB7d3249846E226A029DE93BEb5eA1e4CFe"
  // }
]

export const uniswapV2Pair = "0x8f41Fe4165B20EA3d325be3ff0AA898A630428C2" as `0x${string}`

export const defaultDotAgencyTokenURI = "0xc256d4417d7F667a90bd72f1CABBdA0ce8794265" as `0x${string}`
export const defaultAgentTokenURI = "0x6fECBE5Ce12F7EbC883328c1Ee593986424b8105" as `0x${string}`

export const defaultAgentResolver = "0x3e9F9c9223B503aCCe33abe896FD5AE7bdBDF5Fe" as `0x${string}`
export const defaultDotAgencyResolver = "0x6aCca1410C16FfDD60866be84b541492C2398C4e" as `0x${string}`

export const WrapCoinAddress = "0x72446FA9dE18C24625568bC4D1335Fe9745E06BB" as `0x${string}`

export const tokenURIEngineConfig = [
  {
    "name": "Mobius",
    "value": "0x6fECBE5Ce12F7EbC883328c1Ee593986424b8105" as `0x${string}`,
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