import type { Position, LockedPosition, Pool } from "./types"
import { POOLS } from "./pools"

/**
 * Mock data that simulates what would be returned from contract calls
 * These will be replaced with actual contract calls later
 */

// Mock positions data
const mockPositionsData: Position[] = [
  {
    id: 1,
    token0: "ETH",
    token1: "USDC",
    liquidityToken0: "0.75 ETH",
    liquidityToken1: "1,350 USDC",
    fees: "0.05",
    feesToken0: "0.02 ETH",
    feesToken1: "36.5 USDC",
    range: "1800-2200",
    poolUrl: `${POOLS[0].explorerUrl}/1`,
    pool: POOLS[0], // Uniswap V3
  },
  {
    id: 2,
    token0: "WBTC",
    token1: "ETH",
    liquidityToken0: "0.05 WBTC",
    liquidityToken1: "0.8 ETH",
    fees: "0.03",
    feesToken0: "0.001 WBTC",
    feesToken1: "0.015 ETH",
    range: "0.06-0.08",
    poolUrl: `${POOLS[0].explorerUrl}/2`,
    pool: POOLS[0], // Uniswap V3
  },
  {
    id: 6,
    token0: "ETH",
    token1: "USDT",
    liquidityToken0: "1.2 ETH",
    liquidityToken1: "2,160 USDT",
    fees: "0.01",
    feesToken0: "0.01 ETH",
    feesToken1: "18 USDT",
    range: "1750-1950",
    poolUrl: `${POOLS[1].explorerUrl}/6`,
    pool: POOLS[1], // Uniswap V4
  },
  {
    id: 7,
    token0: "CAKE",
    token1: "BNB",
    liquidityToken0: "500 CAKE",
    liquidityToken1: "10 BNB",
    fees: "0.25",
    feesToken0: "1.25 CAKE",
    feesToken1: "0.025 BNB",
    range: "0.018-0.022",
    poolUrl: `${POOLS[2].explorerUrl}/7`,
    pool: POOLS[2], // PancakeSwap
  },
  {
    id: 8,
    token0: "SUSHI",
    token1: "ETH",
    liquidityToken0: "1000 SUSHI",
    liquidityToken1: "2 ETH",
    fees: "0.3",
    feesToken0: "3 SUSHI",
    feesToken1: "0.006 ETH",
    range: "0.0018-0.0022",
    poolUrl: `${POOLS[3].explorerUrl}/8`,
    pool: POOLS[3], // SushiSwap
  },
]

// Mock locked positions data
const mockLockedPositionsData: LockedPosition[] = [
  {
    id: 3,
    token0: "ETH",
    token1: "DAI",
    liquidityToken0: "1.2 ETH",
    liquidityToken1: "2,400 DAI",
    fees: "0.12",
    feesToken0: "0.05 ETH",
    feesToken1: "12.5 DAI",
    range: "1900-2100",
    lockExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    expiryTimestamp: Date.now() + 30 * 24 * 60 * 60 * 1000,
    feeCollector: "0x1234...5678",
    poolUrl: `${POOLS[0].explorerUrl}/3`,
    pool: POOLS[0], // Uniswap V3
  },
  {
    id: 4,
    token0: "USDC",
    token1: "USDT",
    liquidityToken0: "2,500 USDC",
    liquidityToken1: "2,500 USDT",
    fees: "0.01",
    feesToken0: "25.3 USDC",
    feesToken1: "24.8 USDT",
    range: "0.99-1.01",
    lockExpiry: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    expiryTimestamp: Date.now() + 90 * 24 * 60 * 60 * 1000,
    feeCollector: "0x5678...9012",
    poolUrl: `${POOLS[0].explorerUrl}/4`,
    pool: POOLS[0], // Uniswap V3
  },
  {
    id: 5,
    token0: "LINK",
    token1: "ETH",
    liquidityToken0: "100 LINK",
    liquidityToken1: "0.5 ETH",
    fees: "0.05",
    feesToken0: "2.3 LINK",
    feesToken1: "0.01 ETH",
    range: "0.005-0.007",
    lockExpiry: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    expiryTimestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
    feeCollector: "0xabcd...ef12",
    poolUrl: `${POOLS[0].explorerUrl}/5`,
    pool: POOLS[0], // Uniswap V3
  },
  {
    id: 9,
    token0: "ETH",
    token1: "USDC",
    liquidityToken0: "2.5 ETH",
    liquidityToken1: "4,500 USDC",
    fees: "0.01",
    feesToken0: "0.025 ETH",
    feesToken1: "45 USDC",
    range: "1800-2000",
    lockExpiry: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    expiryTimestamp: Date.now() + 60 * 24 * 60 * 60 * 1000,
    feeCollector: "0xdef0...1234",
    poolUrl: `${POOLS[1].explorerUrl}/9`,
    pool: POOLS[1], // Uniswap V4
  },
  {
    id: 10,
    token0: "CAKE",
    token1: "BUSD",
    liquidityToken0: "1000 CAKE",
    liquidityToken1: "5,000 BUSD",
    fees: "0.17",
    feesToken0: "1.7 CAKE",
    feesToken1: "8.5 BUSD",
    range: "4.9-5.1",
    lockExpiry: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    expiryTimestamp: Date.now() + 45 * 24 * 60 * 60 * 1000,
    feeCollector: "0x9876...5432",
    poolUrl: `${POOLS[2].explorerUrl}/10`,
    pool: POOLS[2], // PancakeSwap
  },
  {
    id: 11,
    token0: "BAL",
    token1: "ETH",
    liquidityToken0: "500 BAL",
    liquidityToken1: "5 ETH",
    fees: "0.3",
    feesToken0: "1.5 BAL",
    feesToken1: "0.015 ETH",
    range: "0.009-0.011",
    lockExpiry: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    expiryTimestamp: Date.now() + 120 * 24 * 60 * 60 * 1000,
    feeCollector: "0x1111...2222",
    poolUrl: `${POOLS[4].explorerUrl}/11`,
    pool: POOLS[4], // Balancer
  },
]

/**
 * Mock function to get user's Uniswap V3 positions
 * Will be replaced with actual contract call
 * @param address - User's wallet address
 * @returns Promise resolving to array of positions
 */
export async function getUserPositions(address: string): Promise<Position[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In the future, this will filter positions based on the address
  return mockPositionsData
}

/**
 * Mock function to get user's locked positions
 * Will be replaced with actual contract call
 * @param address - User's wallet address
 * @returns Promise resolving to array of locked positions
 */
export async function getLockedPositions(address: string): Promise<LockedPosition[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  // In the future, this will filter locked positions based on the address
  return mockLockedPositionsData
}

/**
 * Mock function to get position details
 * Will be replaced with actual contract call
 * @param id - Position ID
 * @returns Promise resolving to position details or null if not found
 */
export async function getPositionById(id: number): Promise<Position | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const position = mockPositionsData.find((p) => p.id === id)
  return position || null
}

/**
 * Mock function to get locked position details
 * Will be replaced with actual contract call
 * @param id - Position ID
 * @returns Promise resolving to locked position details or null if not found
 */
export async function getLockedPositionById(id: number): Promise<LockedPosition | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const position = mockLockedPositionsData.find((p) => p.id === id)
  return position || null
}

/**
 * Mock function to check if a position can be withdrawn
 * Will be replaced with actual contract call
 * @param id - Position ID
 * @returns Promise resolving to boolean indicating if position can be withdrawn
 */
export async function canWithdrawPosition(id: number): Promise<boolean> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  const position = mockLockedPositionsData.find((p) => p.id === id)
  if (!position) return false

  return position.expiryTimestamp < Date.now()
}

/**
 * Mock function to get accumulated fees for a position
 * Will be replaced with actual contract call
 * @param id - Position ID
 * @returns Promise resolving to fee amounts
 */
export async function getAccumulatedFees(id: number): Promise<{ token0: string; token1: string } | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 400))

  const position = mockLockedPositionsData.find((p) => p.id === id)
  if (!position) return null

  return {
    token0: position.feesToken0,
    token1: position.feesToken1,
  }
}

/**
 * Mock function to get all available pools
 * Will be replaced with actual contract call or configuration
 * @returns Promise resolving to array of pools
 */
export async function getAvailablePools(): Promise<Pool[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return POOLS
}

/**
 * Mock function to get positions by pool
 * Will be replaced with actual contract call
 * @param poolId - Pool ID
 * @param address - User's wallet address
 * @returns Promise resolving to array of positions
 */
export async function getPositionsByPool(poolId: string, address: string): Promise<Position[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  return mockPositionsData.filter((p) => p.pool.id === poolId)
}

/**
 * Mock function to get locked positions by pool
 * Will be replaced with actual contract call
 * @param poolId - Pool ID
 * @param address - User's wallet address
 * @returns Promise resolving to array of locked positions
 */
export async function getLockedPositionsByPool(poolId: string, address: string): Promise<LockedPosition[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  return mockLockedPositionsData.filter((p) => p.pool.id === poolId)
}

