"use client"

import { ConnectWallet } from "./connect-wallet"
import { ThemeToggle } from "./theme-toggle"

interface HeaderProps {
  isConnected: boolean
  onConnectToggle: () => void
}

/**
 * Header component displays the application title, GitHub link, and wallet connection button
 */
export function Header({ isConnected, onConnectToggle }: HeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium">Free LP NFT Locker</h1>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="https://github.com/yourusername/uniswap-v3-locker"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 dark:text-gray-400 hover:underline"
          >
            GitHub
          </a>
          <ConnectWallet isConnected={isConnected} onToggle={onConnectToggle} />
        </div>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">A free, open-source LP NFT locker with no fees. Lock your LP NFTs and claim
        trading fees with 0% commission. Compatible with Uniswap V3 and V4 style NFT positions. FreeLPLocker.com is a public good, built by the
        team behind <a href="https://mahaxy.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">MAHA.xyz</a> and <a href="https://zerolend.xyz" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">ZeroLend.</a>
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        FreeLPLocker.com can be deployed on any EVM-compatible chain and the entire codebase (frontend/contracts) is open-source and audited. View
        the <a href="https://github.com/mahaxy/FreeLPLocker" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub repository</a> and read
        the <a href="https://github.com/mahaxy/FreeLPLocker/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Integration Docs</a> for more details.
      </p>
    </>
  )
}
