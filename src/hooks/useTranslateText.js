import { useState, useCallback, useMemo } from "react";
import { useLanguage } from "./useLanguage";

export function useTranslateText() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { setResultText, setAreaLanguage } = useLanguage();

    const translate = useCallback(async (text, fromLang, toLang) => {
        setLoading(true);
        setError(null);

        try {
            let sourceLang = fromLang;
            const encodedText = encodeURIComponent(text);

            const langpair = `${sourceLang}|${toLang}`;

            if (fromLang.toLowerCase() === "autodetect") {
                const res = await fetch(
                    `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${langpair}`
                );

                const d = await res.json();
                sourceLang = d.responseData.detectedLanguage || "en";
                setAreaLanguage(sourceLang);
            }

            const response = await fetch(
                `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${langpair}`
            );

            const data = await response.json();
            const translatedText = data?.responseData?.translatedText || "Translation failed.";
            setResultText(translatedText);
        } catch (err) {
            setError("Failed to translate. Please try again.");
            console.error("Translation error:", err);
        } finally {
            setLoading(false);
        }
    }, [setResultText, setAreaLanguage]);

    return useMemo(() => ({
        translate,
        loading,
        error,
    }), [translate, loading, error]);
}
