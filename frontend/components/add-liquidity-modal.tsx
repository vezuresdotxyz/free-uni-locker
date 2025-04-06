"use client"

import { DialogFooter } from "@/components/ui/dialog"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import type { LockedPosition } from "@/lib/types"

interface AddLiquidityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  nftId: number | null
  position?: LockedPosition
}

/**
 * AddLiquidityModal allows users to add more liquidity to an existing locked position
 */
export function AddLiquidityModal({ open, onOpenChange, nftId, position }: AddLiquidityModalProps) {
  const [token0Amount, setToken0Amount] = useState("")
  const [token1Amount, setToken1Amount] = useState("")

  // Use actual token names from position or fallback to generic names
  const token0 = position?.token0 || "Token0"
  const token1 = position?.token1 || "Token1"

  /**
   * Handle adding liquidity to the position
   */
  const handleAddLiquidity = () => {
    if (!nftId || !token0Amount || !token1Amount) return
    // Process the liquidity addition
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Liquidity</DialogTitle>
          <DialogDescription className="text-xs">Add more liquidity to your locked position</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-4">
          <div className="space-y-1">
            <Label htmlFor="token0Amount" className="text-xs">
              {token0} Amount
            </Label>
            <Input
              id="token0Amount"
              placeholder="0.0"
              value={token0Amount}
              onChange={(e) => setToken0Amount(e.target.value)}
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="token1Amount" className="text-xs">
              {token1} Amount
            </Label>
            <Input
              id="token1Amount"
              placeholder="0.0"
              value={token1Amount}
              onChange={(e) => setToken1Amount(e.target.value)}
              className="h-8 text-sm"
            />
          </div>
        </div>
        <DialogFooter>
          <Button size="sm" onClick={handleAddLiquidity}>
            <Plus className="h-3 w-3 mr-1" />
            Add Liquidity
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

