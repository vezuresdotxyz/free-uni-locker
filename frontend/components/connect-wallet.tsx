"use client"

import { Button } from "@/components/ui/button"

interface ConnectWalletProps {
  isConnected: boolean
  onToggle: () => void
}

export function ConnectWallet({ isConnected, onToggle }: ConnectWalletProps) {
  return (
    <Button onClick={onToggle} variant="outline" size="sm">
      {isConnected ? "Disconnect" : "Connect Wallet"}
    </Button>
  )
}

