/* eslint-disable no-unused-vars */
import { useState } from "react";
import { toast } from "react-toastify";

export function useClipboard(timeout = 2000) {
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const copy = async (text) => {
        setLoading(true);
        setError(null);

        if (!text) {
            const err = "No text to copy.";
            setError(err);
            toast.error(err); // show the error directly
            setLoading(false);
            return;
        }

        const promise = navigator.clipboard.writeText(text)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), timeout);
            });

        toast.promise(promise, {
            pending: "Copying to clipboard...",
            success: `"${text}" copied to clipboard!`,
            error: (err) => {
                return `Failed to copy: ${err?.message || err}`;
            },
        });

        try {
            await promise;
        } catch (err) {
            console.error("Clipboard error:", err);
            setError(err?.message || "Failed to copy. Please try again.");
        } finally {
            setLoading(false); // was incorrectly set to `true` before
        }
    };

    return { copy };
}

