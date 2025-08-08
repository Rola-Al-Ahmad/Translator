import { useCallback, useEffect, useMemo, useState } from "react"

import { toast } from "react-toastify";

export function usePuterTextToSpeech() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [aiReady, setAiReady] = useState(false)
    const [currentAudio, setCurrentAudio] = useState(null)


    useEffect(() => {
        const checkAiReady = setInterval(() => {
            if (window.puter && window.puter.ai && typeof window.puter.ai.txt2speech === "function") {
                setAiReady(true)
                clearInterval(checkAiReady)
            }
        }, 300);
        return () => clearInterval(checkAiReady)
    }, []);

    // Memoized language map
    const languageMap = useMemo(
        () => ({
            en: "en-US",
            ar: "ar-AE",
            tr: "tr-TR",
            fr: "fr-FR",
            es: "es-ES",
            pt: "pt-BR",
            de: "de-DE",
            it: "it-IT",
            zh: "yue-CN",
            ja: "ja-JP",
            ru: "ru-RU",
            hi: "hi-IN",
            ko: "ko-KR"
        }),
        []
    )

    // Memoized function to get language code
    const language = useCallback(
        (lang) => languageMap[lang] || "en-US",
        [languageMap]
    )

    // Memoized speak function
    const speakText = useCallback(
        async (text, lang) => {
            if (!aiReady) return
            setLoading(true)
            setError("")
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
            try {
                const audio = await window.puter.ai.txt2speech(text, {
                    engine: "neural",
                    language: language(lang),
                })
                setCurrentAudio(audio)
                audio.play()
                audio.addEventListener("ended", () => setLoading(false))
                audio.addEventListener("error", () => setLoading(false))
            } catch (error) {
                setError(error.message || "An error occurred during speech synthesis.");
                toast.error(error.message || "An error occurred during speech synthesis.");
                setLoading(false)
            }
        },
        [aiReady, currentAudio, language]
    )

    // Memoized stop function
    const stopSpeaking = useCallback(() => {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            setCurrentAudio(null)
            setLoading(false)
        }
    }, [currentAudio])

    return { loading, error, speakText, stopSpeaking, aiReady }

}