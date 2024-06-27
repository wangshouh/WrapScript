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
    "agencyImplementation": "0x362C7cD8Cd6919D972c4B32B2Bd1309138231574",
    "appImplementation": "0x377b1f57Af8cdF3b9840226bD3256435dcDc0040"
  },
  // {
  //   "name": "WrapV1RandomWalker",
  //   "value": "randomConfig",
  //   "description": "Minting prices are obtained through standard normal random",
  //   "agencyImplementation": "0x47303297b8ED07FA8763b487e7f12CA1e11033A2",
  //   "appImplementation": "0x1C91bEB7d3249846E226A029DE93BEb5eA1e4CFe"
  // }
]

export const uniswapV2Pair = "0xf3A9c1B2c707118ee1948633D4666b230e5F3664" as `0x${string}`

export const defaultDotAgencyTokenURI = "0x65149562BF8c2B5dA459bfA93eEf4027Ff5a3c9d" as `0x${string}`
export const defaultAgentTokenURI = "0x7069bcD56B838492CCF9bd6af82Ed976A1615DC8" as `0x${string}`

export const defaultAgentResolver = "0x63d343c6f9fA2E3dD3840B9eDfCE30bC867Dc890" as `0x${string}`
export const defaultDotAgencyResolver = "0x6aCca1410C16FfDD60866be84b541492C2398C4e" as `0x${string}`

export const WrapCoinAddress = "0x26A7Cf1326a8daA6EC04DdC07304994049E93fCd" as `0x${string}`

export const tokenURIEngineConfig = [
  {
    "name": "Mobius",
    "value": "0x7069bcD56B838492CCF9bd6af82Ed976A1615DC8" as `0x${string}`,
    "description": "Generate Mobius-style on-chain images",
  },
  {
    "name": "Mobius Animate Circle I",
    "value": "0xEC5c3dd0b2A2E70bB1095645869cBfBe4a81375e" as `0x${string}`,
  },
  {
    "name": "Mobius Animate Circle II",
    "value": "0xE690575Ac08C8F134D3D00508090AEd86FE6ad7c" as `0x${string}`,
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