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
import { Unlock } from "lucide-react"
import type { LockedPosition } from "@/lib/types"

interface WithdrawNFTModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  nftId: number | null
  position: LockedPosition | undefined
}

/**
 * WithdrawNFTModal allows users to withdraw their NFT after the lock period expires
 */
export function WithdrawNFTModal({ open, onOpenChange, nftId, position }: WithdrawNFTModalProps) {
  /**
   * Handle withdrawing the NFT
   */
  const handleWithdraw = () => {
    if (!nftId) return
    // Process the withdrawal
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Withdraw NFT</DialogTitle>
          <DialogDescription className="text-xs">Withdraw your NFT after lock expiry</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-xs text-gray-500 mb-2">You can withdraw your NFT once the lock period has expired.</p>
          <div className="rounded-md bg-gray-100 p-3">
            <p className="text-xs font-medium">Lock Expiry</p>
            <p className="text-sm font-medium">{position?.lockExpiry || "N/A"}</p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleWithdraw} variant="outline" size="sm">
            <Unlock className="h-3 w-3 mr-1" />
            Withdraw NFT
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

