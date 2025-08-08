import { useCallback, useState, useRef } from "react";
import { getLanguageName } from "../components/LangSelect";
import { toast } from "react-toastify";

export function useTextToSpeech() {
    const [loading, setLoading] = useState(false);
    const speakingRef = useRef(false);

    const waitForVoices = useCallback(
        (synth, callback) => {
            let voicesList = synth.getVoices();

            if (voicesList.length > 0) {
                callback(voicesList);
                return;
            }

            // Show a friendly info toast only once or replace this with console.log if too noisy
            toast.info("Waiting for voices to load...");

            const onVoicesChanged = () => {
                voicesList = synth.getVoices();
                synth.removeEventListener("voiceschanged", onVoicesChanged);
                callback(voicesList);
            };

            synth.addEventListener("voiceschanged", onVoicesChanged);

            // fallback after 3 seconds
            setTimeout(() => {
                synth.removeEventListener("voiceschanged", onVoicesChanged);
                callback([]);
            }, 3000);
        },
        []
    );

    const speak = useCallback(
        (text, lang = "en-US") => {
            if (!text) {
                toast.error("No text to speak.");
                return;
            }

            if (lang === "autodetect") {
                toast.info("Please select a target language before speaking");
                return;
            }

            if (speakingRef.current) {
                toast.info("Already speaking. Please wait.");
                return;
            }

            if (typeof window === "undefined" || !window.speechSynthesis) {
                toast.error("Speech Synthesis API is not supported in this browser.");
                return;
            }

            const synth = window.speechSynthesis;
            synth.cancel(); // cancel any ongoing speech

            waitForVoices(synth, (voicesList) => {
                const hasRequestedVoice = voicesList.some((v) =>
                    v.lang.toLowerCase().startsWith(lang.toLowerCase())
                );

                if (!hasRequestedVoice) {
                    toast.info(
                        `TTS for language "${getLanguageName(
                            lang
                        )}" is not supported on this device. Please enable or install this language in your system settings.`
                    );
                    return;
                }

                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = lang;

                const matchingVoice =
                    voicesList.find((v) => v.lang.toLowerCase() === lang.toLowerCase()) ||
                    voicesList.find((v) =>
                        v.lang.toLowerCase().startsWith(lang.slice(0, 2).toLowerCase())
                    ) ||
                    null;

                if (matchingVoice) {
                    utterance.voice = matchingVoice;
                }

                utterance.rate = 1;
                utterance.pitch = 1;
                utterance.volume = 1;

                utterance.onstart = () => {
                    setLoading(true);
                    speakingRef.current = true;
                };

                utterance.onend = () => {
                    setLoading(false);
                    speakingRef.current = false;
                };

                utterance.onerror = (event) => {
                    setLoading(false);
                    speakingRef.current = false;

                    // Defensive check for event.error (may be undefined on some mobile browsers)
                    const errorType = event?.error || "unknown";

                    console.error("Speech synthesis error:", errorType);

                    if (errorType === "synthesis-failed") {
                        toast.error(
                            `Sorry, speech synthesis failed for "${getLanguageName(lang)}". ` +
                            "Please make sure your device supports this language or try another."
                        );
                    } else if (errorType === "canceled") {
                        // User or system canceled - usually no need to show error
                    } else {
                        toast.error("An error occurred during speech synthesis.");
                    }
                };

                try {
                    synth.speak(utterance);
                } catch (error) {
                    // Sometimes speak() itself throws errors (e.g. if not allowed by browser)
                    setLoading(false);
                    speakingRef.current = false;
                    console.error("Speech synthesis exception:", error);
                    toast.error("Speech synthesis could not be started.");
                }
            });
        },
        [waitForVoices]
    );

    return { speak, loading };
}
