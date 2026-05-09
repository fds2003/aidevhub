"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

interface CopyToClipboardProps {
  text: string
  className?: string
}

export function CopyToClipboard({ text, className = "" }: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`p-1.5 rounded hover:bg-zinc-700/50 transition-colors ${className}`}
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-500" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  )
}
