"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "./button";

interface TurnstileProps {
    siteKey: string;
    onVerify?: (token: string) => void;
    onError?: (error: string) => void;
    onExpire?: () => void;
    theme?: "light" | "dark" | "auto";
    size?: "normal" | "compact";
    tabIndex?: number;
}

declare global {
    interface Window {
        turnstile?: {
            render: (
                container: HTMLElement,
                options: {
                    sitekey: string;
                    callback: (token: string) => void;
                    "error-callback"?: (error: string) => void;
                    "expired-callback"?: () => void;
                    theme?: string;
                    size?: string;
                    tabindex?: number;
                }
            ) => string;
            reset: (widgetId: string) => void;
            remove: (widgetId: string) => void;
        };
    }
}

export function Turnstile({
    siteKey,
    onVerify,
    onError,
    onExpire,
    theme = "auto",
    size = "normal",
    tabIndex = 0,
}: TurnstileProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const renderWidget = useCallback(() => {
        if (!containerRef.current || !window.turnstile) return;

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => onVerify?.(token),
            "error-callback": (error: string) => onError?.(error),
            "expired-callback": () => onExpire?.(),
            theme,
            size,
            tabindex: tabIndex,
        });

        setIsLoaded(true);
    }, [siteKey, onVerify, onError, onExpire, theme, size, tabIndex]);

    useEffect(() => {
        // Load Turnstile script
        if (!window.turnstile) {
            const script = document.createElement("script");
            script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
            script.async = true;
            script.defer = true;
            script.onload = renderWidget;
            document.head.appendChild(script);
        } else {
            renderWidget();
        }

        return () => {
            if (widgetIdRef.current && window.turnstile) {
                window.turnstile.remove(widgetIdRef.current);
            }
        };
    }, [renderWidget]);

    return (
        <div
            ref={containerRef}
            className={`turnstile-widget ${isLoaded ? "loaded" : ""}`}
        />
    );
}

// Newsletter form with Turnstile verification
interface NewsletterFormProps {
    onSuccess?: () => void;
}

export function NewsletterForm({ onSuccess }: NewsletterFormProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [token, setToken] = useState<string | null>(null);

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            setStatus("error");
            return;
        }

        setStatus("loading");

        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, token }),
            });

            if (res.ok) {
                setStatus("success");
                onSuccess?.();
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
                <p className="text-muted-foreground">You have been subscribed successfully.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-2 rounded-lg border bg-background"
                />
                <Button type="submit" disabled={status === "loading"}>
                    {status === "loading" ? "Subscribing..." : "Subscribe"}
                </Button>
            </div>
            {siteKey && (
                <Turnstile
                    siteKey={siteKey}
                    onVerify={setToken}
                    onError={() => setStatus("error")}
                    size="compact"
                />
            )}
        </form>
    );
}
