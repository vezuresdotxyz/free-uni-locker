"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Coins, MoreHorizontal, ExternalLink } from "lucide-react"
import type { LockedPosition } from "@/lib/types"
import { useState, useRef, useEffect } from "react"

interface LockedPositionsTableProps {
  positions: LockedPosition[]
  onManage: (id: number) => void
  onOpenManageModal: (modalType: string) => void
  onCollectFees: (id: number) => void
}

/**
 * LockedPositionsTable displays a table of lockedLP positions
 * with options to manage each position and collect fees
 */
export function LockedPositionsTable({
  positions,
  onManage,
  onOpenManageModal,
  onCollectFees,
}: LockedPositionsTableProps) {
  // Track which dropdown is currently open
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)

  // Store refs to all dropdown containers for click-outside detection
  const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedElement = event.target as Node
      const isOutsideAnyDropdown = Object.values(dropdownRefs.current).every(
        (ref) => ref && !ref.contains(clickedElement),
      )

      if (isOutsideAnyDropdown) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  /**
   * Calculate days left until lock expiry
   * @param expiryTimestamp - Timestamp when the lock expires
   * @returns Object containing display text and expiry status
   */
  const calculateDaysLeft = (expiryTimestamp: number): { text: string; isExpired: boolean } => {
    const now = Date.now()
    const diffTime = expiryTimestamp - now

    if (diffTime <= 0) {
      return { text: "Expired", isExpired: true }
    }

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return {
      text: `${diffDays} ${diffDays === 1 ? "day" : "days"} left`,
      isExpired: false,
    }
  }

  /**
   * Handle click on the Manage button
   * @param id - Position ID
   */
  const handleManageClick = (id: number) => {
    onManage(id)
    setOpenDropdown(openDropdown === id ? null : id)
  }

  /**
   * Handle click on a dropdown menu item
   * @param id - Position ID
   * @param modalType - Type of modal to open
   */
  const handleDropdownItemClick = (id: number, modalType: string) => {
    onManage(id)
    onOpenManageModal(modalType)
    setOpenDropdown(null)
  }

  if (positions.length === 0) {
    return (
      <div className="border rounded-md bg-white dark:bg-gray-800 p-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">No locked positions found</p>
      </div>
    )
  }

  return (
    <>
      <div className="border rounded-md bg-white dark:bg-gray-800">
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Position</TableHead>
                <TableHead className="text-xs">Liquidity</TableHead>
                <TableHead className="text-xs">Fees Generated</TableHead>
                <TableHead className="text-xs">Expiry</TableHead>
                <TableHead className="text-xs w-[120px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {positions.map((position) => {
                const expiry = calculateDaysLeft(position.expiryTimestamp)

                return (
                  <TableRow key={position.id} className="group">
                    <TableCell className="text-xs align-top py-3">
                      <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                          <span className="font-medium mr-2">#{position.id}</span>
                        </div>
                        <a
                          href={position.poolUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-small text-blue-500 hover:underline flex items-center mt-1"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          {position.pool.name}
                        </a>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs py-3">
                      <div className="flex flex-col">
                        <span>{position.liquidityToken0}</span>
                        <span>{position.liquidityToken1}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs py-3">
                      <div className="flex flex-col">
                        <span>{position.feesToken0}</span>
                        <span>{position.feesToken1}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs py-3">
                      <div className="flex flex-col">
                        <span>{position.lockExpiry}</span>
                        <span
                          className={expiry.isExpired ? "text-red-500 font-medium" : "text-gray-500 dark:text-gray-400"}
                        >
                          {expiry.text}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex gap-1">
                        {/* Dropdown menu for position management */}
                        <div className="relative" ref={(el) => (dropdownRefs.current[position.id] = el)}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => handleManageClick(position.id)}
                          >
                            <MoreHorizontal className="h-3 w-3 mr-1" />
                            Manage
                          </Button>

                          {openDropdown === position.id && (
                            <div className="absolute right-0 top-full mt-1 z-50 w-[160px] rounded-md border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg transition-all duration-150 animate-in fade-in-50">
                              <div className="py-1">
                                <button
                                  className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
                                  onClick={() => handleDropdownItemClick(position.id, "transfer")}
                                >
                                  Transfer Lock
                                </button>
                                <button
                                  className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
                                  onClick={() => handleDropdownItemClick(position.id, "addLiquidity")}
                                >
                                  Add Liquidity
                                </button>
                                <button
                                  className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
                                  onClick={() => handleDropdownItemClick(position.id, "removeLiquidity")}
                                >
                                  Remove Liquidity
                                </button>
                                <button
                                  className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
                                  onClick={() => handleDropdownItemClick(position.id, "feeCollector")}
                                >
                                  Set Fee Collector
                                </button>
                                <button
                                  className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
                                  onClick={() => handleDropdownItemClick(position.id, "withdraw")}
                                >
                                  Withdraw NFT
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => onCollectFees(position.id)}
                        >
                          <Coins className="h-3 w-3 mr-1" />
                          Fees
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
