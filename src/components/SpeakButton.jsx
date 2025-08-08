import React, { useCallback, useMemo } from "react";

import soundImg from "../assets/sound_max_fill.svg";
import { usePuterTextToSpeech } from "../hooks/usePuterTextToSpeech";

import { useLanguage } from "../hooks/useLanguage";
import { ClipLoader } from "react-spinners";

import { toast } from "react-toastify";

const SpeakButton = ({ cardName, text }) => {
  const { areaLanguage, resultLanguage } = useLanguage();

  // const { speak, loading } = useTextToSpeech();
  const { speakText, loading, aiReady } = usePuterTextToSpeech();

  const lang = useMemo(
    () => (cardName === "translatorArea" ? areaLanguage : resultLanguage),
    [cardName, areaLanguage, resultLanguage]
  );

  const handleSpeak = useCallback(() => {
    // speak(text, lang);
    if (!aiReady) {
      toast.error("AI is not ready yet. Please try again later.");
      return;
    }
    if (!text) {
      toast.error("No text to speak.");
      return;
    }
    speakText(text, lang);
  }, [speakText, text, lang, aiReady]);

  return (
    <button
      onClick={handleSpeak}
      style={{ background: "none", position: "relative" }}
      aria-label="Speak text"
      title="Speak"
      disabled={loading}
    >
      {loading ? (
        <ClipLoader color="#768295" size={16} />
      ) : (
        <img
          src={soundImg}
          alt="Sound icon"
          style={{ opacity: loading ? 0.5 : 1 }}
          disabled={!aiReady}
        />
      )}
    </button>
  );
};

export default React.memo(SpeakButton);
