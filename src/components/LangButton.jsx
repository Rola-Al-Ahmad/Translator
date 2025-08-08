import React, { useCallback, useMemo } from "react";
import { useLanguage } from "../hooks/useLanguage";

const LangButton = ({ cardName, onLanguageClick }) => {
  const languageSet = useMemo(
    () => ({
      English: "en",
      Arabic: "ar",
    }),
    []
  );

  const { areaLanguage, resultLanguage, setAreaLanguage } = useLanguage();

  const onDetectClick = useCallback(() => {
    setAreaLanguage("autodetect");
  }, [setAreaLanguage]);
  return (
    <>
      {cardName === "translatorArea" && (
        <button
          onClick={() => onDetectClick()}
          className={areaLanguage === "autodetect" ? "active" : ""}
        >
          Detect language
        </button>
      )}
      {Object.entries(languageSet).map(([name, code], index) => (
        <button
          key={index}
          onClick={() => onLanguageClick(code)}
          className={
            (cardName === "translatorArea" && areaLanguage === code) ||
            (cardName === "translatorResult" && resultLanguage === code)
              ? "active"
              : ""
          }
        >
          {name}
        </button>
      ))}
    </>
  );
};

export default React.memo(LangButton);
