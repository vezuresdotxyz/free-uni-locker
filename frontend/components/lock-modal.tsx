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
import { Lock } from "lucide-react"

interface LockModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  nftId: number | null
}

/**
 * LockModal allows users to lock a Uniswap V3 LP position for a specified duration
 */
export function LockModal({ open, onOpenChange, nftId }: LockModalProps) {
  const [lockDuration, setLockDuration] = useState("")
  const [feeCollector, setFeeCollector] = useState("")

  /**
   * Handle locking the NFT
   */
  const handleLockNFT = () => {
    if (!nftId || !lockDuration) return
    // Process the lock
    onOpenChange(false)
  }

  /**
   * Set a predefined duration
   * @param days - Number of days to lock
   */
  const setDuration = (days: number) => {
    setLockDuration(days.toString())
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lock NFT Position #{nftId}</DialogTitle>
          <DialogDescription className="text-xs">Lock your LP NFT for a specified duration</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-6">
          <div className="space-y-3">
            <Label htmlFor="lockDuration" className="text-xs">
              Lock Duration (days)
            </Label>
            <Input
              id="lockDuration"
              type="number"
              placeholder="Enter lock duration in days"
              value={lockDuration}
              onChange={(e) => setLockDuration(e.target.value)}
              className="h-9 text-sm"
            />
            <div className="flex flex-wrap gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDuration(30)}
                className={lockDuration === "30" ? "bg-gray-100" : ""}
              >
                1 Month
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDuration(180)}
                className={lockDuration === "180" ? "bg-gray-100" : ""}
              >
                6 Months
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDuration(365)}
                className={lockDuration === "365" ? "bg-gray-100" : ""}
              >
                1 Year
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDuration(36500)}
                className={lockDuration === "36500" ? "bg-gray-100" : ""}
              >
                100 Years
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="feeCollector" className="text-xs">
              Fee Collector Address (Optional)
            </Label>
            <Input
              id="feeCollector"
              placeholder="0x..."
              value={feeCollector}
              onChange={(e) => setFeeCollector(e.target.value)}
              className="h-9 text-sm"
            />
            <p className="text-xs text-gray-500 mt-2">
              If set, this address will be able to collect fees from your locked position
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button size="sm" onClick={handleLockNFT}>
            <Lock className="h-3 w-3 mr-1" />
            Lock NFT
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

