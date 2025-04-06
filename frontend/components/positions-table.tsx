"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Lock, ExternalLink } from "lucide-react"
import type { Position } from "@/lib/types"

interface PositionsTableProps {
  positions: Position[]
  onLock: (id: number) => void
}

/**
 * PositionsTable displays a table of unlockedLP positions
 * with an option to lock each position
 */
export function PositionsTable({ positions, onLock }: PositionsTableProps) {
  if (positions.length === 0) {
    return (
      <div className="border rounded-md bg-white dark:bg-gray-800 p-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">No positions found</p>
      </div>
    )
  }

  return (
    <>
      <div className="border rounded-md bg-white dark:bg-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Position</TableHead>
              <TableHead className="text-xs">Liquidity</TableHead>
              <TableHead className="text-xs">Fees Generated</TableHead>
              <TableHead className="text-xs w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.map((position) => (
              <TableRow key={position.id}>
                <TableCell className="text-xs align-top py-3">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-1">
                      <span className="font-medium mr-2">#{position.id}</span>
                    </div>
                    <a
                      href={position.poolUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:underline flex items-center mt-1"
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
                <TableCell className="py-3">
                  <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => onLock(position.id)}>
                    <Lock className="h-3 w-3 mr-1" />
                    Lock
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
