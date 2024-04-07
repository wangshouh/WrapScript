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
    "agencyImplementation": "0xE9332e59BA5980BcC010d8eA7308712929e8edED",
    "appImplementation": "0x586021dd9176bAdecbA4b9711c09Eb113a3AE5b5"
  },
  {
    "name": "WrapV1Auction",
    "value": "auctionConfig",
    "description": "Minting prices are obtained through auctions",
    "agencyImplementation": "0x3E5E7961e4A6DE8CFA1f99Dc8F88ca715a103e6A",
    "appImplementation": "0x586021dd9176bAdecbA4b9711c09Eb113a3AE5b5"
  },
  {
    "name": "WrapV1RandomWalker",
    "value": "randomConfig",
    "description": "Minting prices are obtained through standard normal random",
    "agencyImplementation": "0xB43eE6a5021DD7FFed593A193ff60c67967fd32c",
    "appImplementation": "0x586021dd9176bAdecbA4b9711c09Eb113a3AE5b5"
  }
]

export const defaultDotAgencyTokenURI = "0xf6Da45AE980F4023432a39C5C941068B0b93606c" as `0x${string}`
export const defaultAgentTokenURI = "0xd1cF94634cc8e7103E56772749Ea476fb815627A" as `0x${string}`

export const defaultAgentResolver = "0xf3CD8bEcE3F3fc7600a181C3f442C82E430989cD" as `0x${string}`
export const defaultDotAgencyResolver = "0x9DfaEB6dFe5bfebC5DE0f34035c80D9db83C5eaF" as `0x${string}`

export const WrapCoinAddress = "0xa505379C74b933Ee0458d9Dd5AA9E25A60b6D7f1" as `0x${string}`

export const tokenURIEngineConfig = [
  {
    "name": "Mairo",
    "value": "0xd1cF94634cc8e7103E56772749Ea476fb815627A" as `0x${string}`,
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