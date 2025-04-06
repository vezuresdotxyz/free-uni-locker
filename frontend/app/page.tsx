"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { PositionsTable } from "@/components/positions-table"
import { LockedPositionsTable } from "@/components/locked-positions-table"
import { LockModal } from "@/components/lock-modal"
import { TransferLockModal } from "@/components/transfer-lock-modal"
import { AddLiquidityModal } from "@/components/add-liquidity-modal"
import { SetFeeCollectorModal } from "@/components/set-fee-collector-modal"
import { WithdrawNFTModal } from "@/components/withdraw-nft-modal"
import { RemoveLiquidityModal } from "@/components/remove-liquidity-modal"
import { CollectFeesModal } from "@/components/collect-fees-modal"
import { Spinner } from "@/components/spinner"
import { getUserPositions, getLockedPositions, getLockedPositionById } from "@/lib/mock-contract-data"
import type { Position, LockedPosition } from "@/lib/types"
import { Footer } from "@/components/footer"

/**
 * Main application component for the Uniswap V3 LP NFT Locker
 */
export default function Home() {
  // Wallet connection state
  const [isConnected, setIsConnected] = useState(false)

  // Tab navigation state
  const [activeTab, setActiveTab] = useState("positions")

  // Currently selected NFT for modal operations
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null)

  // Data states
  const [userPositions, setUserPositions] = useState<Position[]>([])
  const [lockedPositions, setLockedPositions] = useState<LockedPosition[]>([])
  const [selectedPosition, setSelectedPosition] = useState<LockedPosition | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  // Modal visibility states
  const [lockModalOpen, setLockModalOpen] = useState(false)
  const [transferModalOpen, setTransferModalOpen] = useState(false)
  const [addLiquidityModalOpen, setAddLiquidityModalOpen] = useState(false)
  const [removeLiquidityModalOpen, setRemoveLiquidityModalOpen] = useState(false)
  const [feeCollectorModalOpen, setFeeCollectorModalOpen] = useState(false)
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)
  const [collectFeesModalOpen, setCollectFeesModalOpen] = useState(false)

  // Load data when wallet is connected
  useEffect(() => {
    if (isConnected) {
      loadUserData()
    } else {
      // Clear data when disconnected
      setUserPositions([])
      setLockedPositions([])
    }
  }, [isConnected])

  // Load position details when an NFT is selected
  useEffect(() => {
    if (selectedNFT) {
      loadPositionDetails(selectedNFT)
    } else {
      setSelectedPosition(undefined)
    }
  }, [selectedNFT])

  /**
   * Load user positions and locked positions
   */
  const loadUserData = async () => {
    setIsLoading(true)
    try {
      // Mock wallet address - will be replaced with actual connected wallet
      const address = "0x1234567890123456789012345678901234567890"

      // Fetch positions in parallel
      const [positions, locked] = await Promise.all([getUserPositions(address), getLockedPositions(address)])

      setUserPositions(positions)
      setLockedPositions(locked)
    } catch (error) {
      console.error("Error loading user data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Load details for a specific position
   */
  const loadPositionDetails = async (id: number) => {
    try {
      const position = await getLockedPositionById(id)
      setSelectedPosition(position || undefined)
    } catch (error) {
      console.error("Error loading position details:", error)
    }
  }

  /**
   * Handle the Manage button click
   * @param id - Position ID
   */
  const handleManage = (id: number) => {
    setSelectedNFT(id)
  }

  /**
   * Open the appropriate modal based on the selected management action
   * @param modalType - Type of modal to open
   */
  const handleOpenManageModal = (modalType: string) => {
    switch (modalType) {
      case "transfer":
        setTransferModalOpen(true)
        break
      case "addLiquidity":
        setAddLiquidityModalOpen(true)
        break
      case "removeLiquidity":
        setRemoveLiquidityModalOpen(true)
        break
      case "feeCollector":
        setFeeCollectorModalOpen(true)
        break
      case "withdraw":
        setWithdrawModalOpen(true)
        break
    }
  }

  /**
   * Handle the Collect Fees button click
   * @param id - Position ID
   */
  const handleCollectFees = (id: number) => {
    setSelectedNFT(id)
    setCollectFeesModalOpen(true)
  }

  /**
   * Handle wallet connection toggle
   */
  const handleConnectToggle = () => {
    setIsConnected(!isConnected)
  }

  return (
    <main className="bg-gray-100 dark:bg-gray-800 min-h-screen">
      <div className="flex max-w-[1000px] flex-col justify-center p-20 m-auto">
        <div className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-2 py-6 relative z-10">
          <div className="w-full px-4 relative z-10">
            <Header isConnected={isConnected} onConnectToggle={handleConnectToggle} />

            {isConnected ? (
              <Tabs defaultValue="positions" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-2">
                  <TabsTrigger value="positions">Your Positions</TabsTrigger>
                  <TabsTrigger value="locked">Locked Positions</TabsTrigger>
                </TabsList>

                <TabsContent value="positions">
                  {isLoading ? (
                    <div className="flex justify-center p-8 border rounded-md bg-white dark:bg-gray-800">
                      <Spinner />
                    </div>
                  ) : (
                    <PositionsTable
                      positions={userPositions}
                      onLock={(id) => {
                        setSelectedNFT(id)
                        setLockModalOpen(true)
                      }}
                    />
                  )}
                </TabsContent>

                <TabsContent value="locked">
                  {isLoading ? (
                    <div className="flex justify-center p-8 border rounded-md bg-white dark:bg-gray-800">
                      <Spinner />
                    </div>
                  ) : (
                    <LockedPositionsTable
                      positions={lockedPositions}
                      onManage={handleManage}
                      onOpenManageModal={handleOpenManageModal}
                      onCollectFees={handleCollectFees}
                    />
                  )}
                </TabsContent>
              </Tabs>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 border rounded-md bg-white dark:bg-gray-800">
                <p className="mb-4 text-sm">Connect your wallet to view and manage yourLP positions</p>
                <Button onClick={handleConnectToggle} variant="outline" size="sm">
                  Connect Wallet
                </Button>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>

      {/* Modals */}
      <LockModal open={lockModalOpen} onOpenChange={setLockModalOpen} nftId={selectedNFT} />

      <TransferLockModal open={transferModalOpen} onOpenChange={setTransferModalOpen} nftId={selectedNFT} />

      <AddLiquidityModal
        open={addLiquidityModalOpen}
        onOpenChange={setAddLiquidityModalOpen}
        nftId={selectedNFT}
        position={selectedPosition}
      />

      <RemoveLiquidityModal
        open={removeLiquidityModalOpen}
        onOpenChange={setRemoveLiquidityModalOpen}
        nftId={selectedNFT}
        position={selectedPosition}
      />

      <SetFeeCollectorModal open={feeCollectorModalOpen} onOpenChange={setFeeCollectorModalOpen} nftId={selectedNFT} />

      <WithdrawNFTModal
        open={withdrawModalOpen}
        onOpenChange={setWithdrawModalOpen}
        nftId={selectedNFT}
        position={selectedPosition}
      />

      <CollectFeesModal
        open={collectFeesModalOpen}
        onOpenChange={setCollectFeesModalOpen}
        nftId={selectedNFT}
        position={selectedPosition}
      />
    </main>
  )
}
