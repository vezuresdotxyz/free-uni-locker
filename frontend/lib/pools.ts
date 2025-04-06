import type { Pool } from "./types"

/**
 * Available liquidity pool protocols
 */
export const POOLS: Pool[] = [
  {
    id: "uniswap-v3-eth",
    name: "Uniswap V3",
    protocol: "Uniswap",
    version: "V3",
    chain: "Ethereum",
    explorerUrl: "https://app.uniswap.org/#/pool",
    logoUrl: "/logos/uniswap-v3.png",
  },
  {
    id: "uniswap-v4-eth",
    name: "Uniswap V4",
    protocol: "Uniswap",
    version: "V4",
    chain: "Ethereum",
    explorerUrl: "https://app.uniswap.org/#/v4/pool",
    logoUrl: "/logos/uniswap-v4.png",
  },
  {
    id: "pancakeswap-v3-bsc",
    name: "PancakeSwap",
    protocol: "PancakeSwap",
    version: "V3",
    chain: "BSC",
    explorerUrl: "https://pancakeswap.finance/liquidity",
    logoUrl: "/logos/pancakeswap.png",
  },
  {
    id: "sushiswap-v3-eth",
    name: "SushiSwap",
    protocol: "SushiSwap",
    version: "V3",
    chain: "Ethereum",
    explorerUrl: "https://app.sushi.com/pool",
    logoUrl: "/logos/sushiswap.png",
  },
  {
    id: "balancer-v2-eth",
    name: "Balancer",
    protocol: "Balancer",
    version: "V2",
    chain: "Ethereum",
    explorerUrl: "https://app.balancer.fi/#/pool",
    logoUrl: "/logos/balancer.png",
  },
  {
    id: "curve-v2-eth",
    name: "Curve",
    protocol: "Curve",
    version: "V2",
    chain: "Ethereum",
    explorerUrl: "https://curve.fi/#/ethereum/pools",
    logoUrl: "/logos/curve.png",
  },
]

/**
 * Get a pool by its ID
 * @param id - Pool ID
 * @returns Pool information or undefined if not found
 */
export function getPoolById(id: string): Pool | undefined {
  return POOLS.find((pool) => pool.id === id)
}

/**
 * Get all pools for a specific protocol
 * @param protocol - Protocol name
 * @returns Array of pools for the protocol
 */
export function getPoolsByProtocol(protocol: string): Pool[] {
  return POOLS.filter((pool) => pool.protocol === protocol)
}

/**
 * Get all pools for a specific chain
 * @param chain - Chain name
 * @returns Array of pools for the chain
 */
export function getPoolsByChain(chain: string): Pool[] {
  return POOLS.filter((pool) => pool.chain === chain)
}

