"use client";

import { forwardRef, InputHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import { Search, X, Command } from "lucide-react";

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onClear, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="relative flex items-center transition-all duration-200">
        <Search className={cn(
          "absolute left-4 w-5 h-5 transition-colors duration-150 pointer-events-none",
          isFocused ? "text-[#00D9FF]" : "text-zinc-500"
        )} />
        <input
          ref={ref}
          type="text"
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full h-12 pl-12 pr-24 bg-[#111118] border rounded-xl font-mono text-sm",
            "border-[#1c1c2e]",
            "text-white placeholder:text-zinc-500",
            "focus:outline-none",
            isFocused
              ? "border-[#00D9FF]/40 shadow-[0_0_0_3px_rgba(0,217,255,0.08)]"
              : "hover:border-[#282838]",
            "transition-all duration-150",
            className
          )}
          {...props}
        />
        <div className="absolute right-4 flex items-center gap-2">
          {value && (
            <button onClick={onClear} className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 bg-[#1c1c2e] text-zinc-500 text-xs rounded border border-[#282838]">
            <Command className="w-3 h-3" />K
          </kbd>
        </div>
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";
