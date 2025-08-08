import React, { useCallback } from "react";

import sort from "../assets/Sort_alfa.svg";

import { useTranslateText } from "../hooks/useTranslateText";
import { useLanguage } from "../hooks/useLanguage";

const TranslateButton = ({ cardName }) => {
  const { areaLanguage, resultLanguage, areaText } = useLanguage();

  const { translate, loading } = useTranslateText();
  const handleTranslate = useCallback(() => {
    if (areaText.trim()) {
      translate(areaText, areaLanguage, resultLanguage);
    }
  }, [translate, areaText, areaLanguage, resultLanguage]);
  return (
    <>
      {cardName === "translatorArea" && (
        <button
          className="translate-button"
          onClick={handleTranslate}
          disabled={loading || areaText.trim() === ""}
        >
          <img src={sort} alt="sort icon" />
          <p>{loading ? "Translating..." : "Translate"}</p>
        </button>
      )}
    </>
  );
};

export default React.memo(TranslateButton);
