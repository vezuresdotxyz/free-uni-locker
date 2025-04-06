export interface Pool {
  id: string
  name: string
  protocol: string
  version: string
  chain: string
  explorerUrl: string
  logoUrl?: string
}

/**
 * Base position information
 */
export interface Position {
  id: number
  token0: string
  token1: string
  liquidityToken0: string
  liquidityToken1: string
  fees: string
  feesToken0: string
  feesToken1: string
  range: string
  poolUrl: string
  pool: Pool // Added pool information
}

/**
 * Locked position extends base position with lock information
 */
export interface LockedPosition extends Position {
  lockExpiry: string
  expiryTimestamp: number
  feeCollector: string
}

