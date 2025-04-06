"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Minus } from "lucide-react"
import type { LockedPosition } from "@/lib/types"

interface RemoveLiquidityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  nftId: number | null
  position: LockedPosition | undefined
}

/**
 * RemoveLiquidityModal allows users to remove a percentage of liquidity from a locked position
 */
export function RemoveLiquidityModal({ open, onOpenChange, nftId, position }: RemoveLiquidityModalProps) {
  const [percentage, setPercentage] = useState([50])

  /**
   * Handle removing liquidity from the position
   */
  const handleRemoveLiquidity = () => {
    if (!nftId) return
    // Process the liquidity removal
    onOpenChange(false)
  }

  /**
   * Calculate token amounts based on percentage
   * @param tokenValue - Token value string (e.g. "1.2 ETH")
   * @param percentage - Percentage to calculate
   * @returns Formatted token amount string
   */
  const getTokenAmount = (tokenValue: string | undefined, percentage: number) => {
    if (!tokenValue) return "0"

    // Extract the numeric part and token symbol
    const match = tokenValue.match(/^([\d,.]+)\s+(.+)$/)
    if (!match) return "0"

    const [_, valueStr, token] = match
    const value = Number.parseFloat(valueStr.replace(/,/g, ""))
    const calculatedValue = ((value * percentage) / 100).toFixed(
      token === "USDC" || token === "USDT" || token === "DAI" ? 2 : 4,
    )

    return `${calculatedValue} ${token}`
  }

  // Use actual token names from position or fallback to generic names
  const token0 = position?.token0 || "Token0"
  const token1 = position?.token1 || "Token1"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remove Liquidity</DialogTitle>
          <DialogDescription className="text-xs">Remove liquidity from your locked position</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-xs">Amount to Remove</Label>
              <span className="text-sm font-medium">{percentage[0]}%</span>
            </div>
            <Slider value={percentage} onValueChange={setPercentage} max={100} step={1} className="my-4" />
            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPercentage([25])}
                className={percentage[0] === 25 ? "bg-gray-100" : ""}
              >
                25%
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPercentage([50])}
                className={percentage[0] === 50 ? "bg-gray-100" : ""}
              >
                50%
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPercentage([75])}
                className={percentage[0] === 75 ? "bg-gray-100" : ""}
              >
                75%
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPercentage([100])}
                className={percentage[0] === 100 ? "bg-gray-100" : ""}
              >
                Max
              </Button>
            </div>
          </div>

          <div className="rounded-md bg-gray-100 p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">You will receive:</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">{getTokenAmount(position?.liquidityToken0, percentage[0])}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">{getTokenAmount(position?.liquidityToken1, percentage[0])}</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button size="sm" onClick={handleRemoveLiquidity}>
            <Minus className="h-3 w-3 mr-1" />
            Remove Liquidity
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

