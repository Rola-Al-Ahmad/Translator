import React, { useMemo } from "react";

import { useLanguage } from "../hooks/useLanguage";

import SpeakButton from "./SpeakButton";
import CopyButton from "./CopyButton";
import TranslateButton from "./TranslateButton";

const CardAction = ({ cardName }) => {
  const { areaText, resultText } = useLanguage();

  const text = useMemo(
    () => (cardName === "translatorArea" ? areaText : resultText),
    [cardName, areaText, resultText]
  );

  return (
    <>
      <div className="card-action">
        <div className="card-action-buttons">
          <SpeakButton cardName={cardName} text={text} />
          <CopyButton text={text} />
        </div>

        <TranslateButton cardName={cardName} />
      </div>
    </>
  );
};

export default React.memo(CardAction);
