"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Coins } from "lucide-react"
import type { LockedPosition } from "@/lib/types"

interface CollectFeesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  nftId: number | null
  position: LockedPosition | undefined
}

/**
 * CollectFeesModal allows users to collect accumulated fees from a locked position
 */
export function CollectFeesModal({ open, onOpenChange, nftId, position }: CollectFeesModalProps) {
  /**
   * Handle collecting fees from the position
   */
  const handleCollectFees = () => {
    if (!nftId) return
    // Process the fee collection
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Collect Fees</DialogTitle>
          <DialogDescription className="text-xs">Collect accumulated fees from your locked position</DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <div className="rounded-md bg-gray-100 p-4 space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Available fees to collect:</p>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{position?.feesToken0 || "0"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{position?.feesToken1 || "0"}</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Fee collector:</p>
              <p className="text-sm font-medium break-all">{position?.feeCollector || "Not set"}</p>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            <p>Fees will be sent to the fee collector address if set, otherwise to your wallet.</p>
          </div>
        </div>
        <DialogFooter>
          <Button size="sm" onClick={handleCollectFees}>
            <Coins className="h-3 w-3 mr-1" />
            Collect Fees
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

