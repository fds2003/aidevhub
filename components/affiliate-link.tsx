"use client";

import { useCallback } from "react";
import { Button } from "./ui/button";

interface AffiliateLinkProps {
    href: string;
    affiliateId?: string;
    children: React.ReactNode;
    variant?: "default" | "outline" | "ghost";
    size?: "default" | "sm" | "lg";
    className?: string;
    trackingParams?: Record<string, string>;
}

export function AffiliateLink({
    href,
    affiliateId,
    children,
    variant = "default",
    size = "default",
    className,
    trackingParams = {},
}: AffiliateLinkProps) {
    const handleClick = useCallback(async () => {
        // Track affiliate click
        try {
            await fetch("/api/track", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tool_slug: new URL(href).pathname.split("/").pop(),
                    source: document.referrer || "direct",
                    ...trackingParams,
                }),
            });
        } catch (error) {
            console.error("Failed to track affiliate click:", error);
        }
    }, [href, trackingParams]);

    // Build affiliate URL
    const affiliateUrl = affiliateId
        ? `${href}${href.includes("?") ? "&" : "?"}ref=${affiliateId}`
        : href;

    return (
        <Button
            variant={variant}
            size={size}
            className={className}
            onClick={handleClick}
            asChild
        >
            <a href={affiliateUrl} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        </Button>
    );
}

// Disclosure component for FTC compliance
export function AffiliateDisclosure() {
    return (
        <p className="text-xs text-muted-foreground mt-4">
            Disclosure: Some links on this site are affiliate links. 
            We may earn a commission at no extra cost to you if you make a purchase 
            through these links. We only recommend products and services we trust.
        </p>
    );
}
