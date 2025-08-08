import React, { useCallback } from "react";

import switchImg from "../assets/Horizontal_top_left_main.svg";
import { useLanguage } from "../hooks/useLanguage";
import LangButton from "./LangButton";
import LangSelect from "./LangSelect";

const CardHeader = ({ cardName }) => {
  const { setAreaLanguage, setResultLanguage, swapLanguages } = useLanguage();

  const onLanguageClick = useCallback(
    (item) => {
      if (cardName === "translatorArea") {
        setAreaLanguage(item);
      } else if (cardName === "translatorResult") {
        setResultLanguage(item);
      }
    },
    [cardName, setAreaLanguage, setResultLanguage]
  );

  return (
    <div className="card-header">
      <div className="language-buttons">
        <LangButton cardName={cardName} onLanguageClick={onLanguageClick} />
        <LangSelect cardName={cardName} onLanguageClick={onLanguageClick} />
      </div>
      {cardName === "translatorResult" && (
        <img
          src={switchImg}
          alt="Switch Lang"
          onClick={() => swapLanguages()}
          className="switch-icon"
        />
      )}
    </div>
  );
};

export default React.memo(CardHeader);
