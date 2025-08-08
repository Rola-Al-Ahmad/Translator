import React, { useMemo, useState } from "react";

import { useTranslateText } from "../hooks/useTranslateText";
import { useLanguage } from "../hooks/useLanguage";
import TranslateArea from "./TranslateArea";

const CardTextArea = ({ cardName }) => {
  const [charCount, setCharCount] = useState(0);

  const { resultText, areaLanguage, areaText } = useLanguage();

  const { error } = useTranslateText();

  const isOverLimit = useMemo(() => charCount > 500, [charCount]);

  return (
    <div className="card-text-area">
      {cardName === "translatorArea" && (
        <>
          <TranslateArea
            isOverLimit={isOverLimit}
            setCharCount={setCharCount}
          />
          <div className="text-container">
            {areaLanguage === "autodetect" &&
              cardName === "translatorArea" &&
              areaText && (
                <p className="tip">
                  💡Tip: Speech not working? Click <strong>Translate</strong> to
                  auto-detect the language, then try again.
                </p>
              )}
            <p className={`char-count ${isOverLimit ? "text-danger" : ""}`}>
              {charCount}/500
            </p>
          </div>
        </>
      )}
      {cardName === "translatorResult" && (
        <>
          <textarea
            className="custom-select"
            name="translatorResult"
            id="translatorResult"
            placeholder="Translation will appear here"
            readOnly
            value={resultText}
          ></textarea>
        </>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default React.memo(CardTextArea);
