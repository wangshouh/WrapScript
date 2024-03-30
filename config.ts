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
    "appImplementation": "0xbc7cc83009c299bc0FeF2a1054Adf49336997534"
  },
  {
    "name": "WrapV1Auction",
    "value": "auctionConfig",
    "description": "Minting prices are obtained through auctions",
    "agencyImplementation": "0xfC652647cF2d3BfdB47abD9dfA912403c6CeB1C5",
    "appImplementation": "0xbc7cc83009c299bc0FeF2a1054Adf49336997534"
  },
  {
    "name": "WrapV1RandomWalker",
    "value": "randomConfig",
    "description": "Minting prices are obtained through standard normal random",
    "agencyImplementation": "0x2BcA5F05B2e0e7098C0f35773b43Ec5ACa6F248e",
    "appImplementation": "0xbc7cc83009c299bc0FeF2a1054Adf49336997534"
  }
]

export const defaultDotAgencyTokenURI = "0xb4972cc5D57cDE9fE905Fa2CEA9e8DbC1749d8E8" as `0x${string}`
export const defaultAgentTokenURI = "0x6230B4bdda9C8e8bf4e2EB0162427217CA99cb7B" as `0x${string}`

export const defaultAgentResolver = "0xf3CD8bEcE3F3fc7600a181C3f442C82E430989cD" as `0x${string}`
export const defaultDotAgencyResolver = "0x9DfaEB6dFe5bfebC5DE0f34035c80D9db83C5eaF" as `0x${string}`

export const WrapCoinAddress = "0xC789130E00EDabb55beC6D5F728ea1ab303f226C" as `0x${string}`

export const tokenURIEngineConfig = [
  {
    "name": "Mairo",
    "value": "0x6230B4bdda9C8e8bf4e2EB0162427217CA99cb7B" as `0x${string}`,
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