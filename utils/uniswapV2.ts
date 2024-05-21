import { concat, getContractAddress, keccak256, slice } from "viem"
import { publicClient, uniswapV2Pair } from "../config"
import { uniswapV2PairABI } from "../abi/uniswapV2Pair"

const sortToken = (tokenA: `0x${string}`, tokenB: `0x${string}`) => {
    return (tokenA > tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
}

const getReserves = async () => {
    // const [token0, token1] = sortToken(tokenA, tokenB)
    const token0 = "0x26166F3395EC64D9211FC01BD6277cD6462d5E89"
    const token1 = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9"

    const [token0Reserve, token1Reserve] = await publicClient.readContract({
        address: uniswapV2Pair,
        abi: uniswapV2PairABI,
        functionName: "getReserves"
    })

    return [token0Reserve, token1Reserve]
}
//0x946487a15489225D28c5FeAA431c49B2871b91F2

// const getReserves = async (router: `0x${string}`, tokenA: `0x${string}`, tokenB: `0x${string}`) => {
//     const { request } = await publicClient.simulateContract({
//         account,
//         ...router,
//         functionName: 'getReserves',
//         args: [tokenA, tokenB]
//     })
//     return request
// }
