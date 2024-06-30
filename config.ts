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
  chain: mainnet,
  transport: http(rpcUrl)
  // transport: http("http://127.0.0.1:8545")
})

export const publicClient: PublicClient = createPublicClient({
  chain: mainnet,
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
    "agencyImplementation": "0x120E8cC16D6Bd9BCc4E94609D668F96aB8BAA3D9",
    "appImplementation": "0x48534DAEb3F0b7d91FcB2618C651aD075703f07E"
  },
  // {
  //   "name": "WrapV1RandomWalker",
  //   "value": "randomConfig",
  //   "description": "Minting prices are obtained through standard normal random",
  //   "agencyImplementation": "0x47303297b8ED07FA8763b487e7f12CA1e11033A2",
  //   "appImplementation": "0x1C91bEB7d3249846E226A029DE93BEb5eA1e4CFe"
  // }
]

export const uniswapV2Pair = "0x5Ff788F688650d3b0cB37E976e71d604D8229064" as `0x${string}`

export const defaultDotAgencyTokenURI = "0x6077dECB9a55093626754653a34276Cf49C5E684" as `0x${string}`

export const defaultAgentResolver = "0x21244259bE899fE7FB798B198a8BD70AB9873ABB" as `0x${string}`
export const defaultDotAgencyResolver = "0x6aCca1410C16FfDD60866be84b541492C2398C4e" as `0x${string}`

export const WrapCoinAddress = "0x989436e4194af162546F595Afc6336A15b3DCa7d" as `0x${string}`

export const tokenURIEngineConfig = [
  {
    "name": "Animated Mobius Loop I",
    "value": "0x2c7d1dd08844ae0BcEFC69c1ce915220A6d84D24" as `0x${string}`,
  },
  {
    "name": "Animated Mobius Loop II",
    "value": "0x921A6d5ce62057167d4b34a5B0Ff7aA37104fDD4" as `0x${string}`,
  },
  {
    "name": "Other",
    "value": "0x0" as `0x${string}`,
    "description": "Manually enter the address of TokenURI Engine"
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