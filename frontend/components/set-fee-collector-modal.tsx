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
import { User } from "lucide-react"

interface SetFeeCollectorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  nftId: number | null
}

/**
 * SetFeeCollectorModal allows users to set or change the fee collector address
 * for a locked position
 */
export function SetFeeCollectorModal({ open, onOpenChange, nftId }: SetFeeCollectorModalProps) {
  const [feeCollector, setFeeCollector] = useState("")

  /**
   * Handle setting the fee collector
   */
  const handleSetFeeCollector = () => {
    if (!nftId || !feeCollector) return
    // Process the fee collector change
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Fee Collector</DialogTitle>
          <DialogDescription className="text-xs">Set an address that can collect fees on your behalf</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-1">
            <Label htmlFor="newFeeCollector" className="text-xs">
              Fee Collector Address
            </Label>
            <Input
              id="newFeeCollector"
              placeholder="0x..."
              value={feeCollector}
              onChange={(e) => setFeeCollector(e.target.value)}
              className="h-8 text-sm"
            />
          </div>
        </div>
        <DialogFooter>
          <Button size="sm" onClick={handleSetFeeCollector}>
            <User className="h-3 w-3 mr-1" />
            Set Fee Collector
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

