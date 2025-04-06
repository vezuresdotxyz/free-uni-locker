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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "lucide-react"

interface TransferLockModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  nftId: number | null
}

/**
 * TransferLockModal allows users to transfer a locked position to another address
 */
export function TransferLockModal({ open, onOpenChange, nftId }: TransferLockModalProps) {
  const [transferAddress, setTransferAddress] = useState("")

  /**
   * Handle transferring the lock to another address
   */
  const handleTransferLock = () => {
    if (!nftId || !transferAddress) return
    // Process the transfer
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transfer Lock</DialogTitle>
          <DialogDescription className="text-xs">Transfer your locked NFT to another address</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-1">
            <Label htmlFor="transferAddress" className="text-xs">
              Recipient Address
            </Label>
            <Input
              id="transferAddress"
              placeholder="0x..."
              value={transferAddress}
              onChange={(e) => setTransferAddress(e.target.value)}
              className="h-8 text-sm"
            />
          </div>
        </div>
        <DialogFooter>
          <Button size="sm" onClick={handleTransferLock}>
            <ArrowRight className="h-3 w-3 mr-1" />
            Transfer Lock
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

