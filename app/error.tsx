'use client'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] py-12 text-center">
      <h1 className="text-6xl font-bold mb-4">500</h1>
      <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
      <p className="text-muted-foreground mb-8">An unexpected error occurred.</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
      >
        Try again
      </button>
    </div>
  )
}
