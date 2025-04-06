export function Spinner({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-2 border-gray-200 dark:border-gray-700"></div>
        <div className="absolute left-0 top-0 h-12 w-12 animate-spin rounded-full border-t-2 border-primary"></div>
      </div>
    </div>
  )
}

