import React, { useCallback } from "react";
import { useLanguage } from "../hooks/useLanguage";

const TranslateArea = ({ isOverLimit, setCharCount }) => {
  const { areaText, setAreaText } = useLanguage();

  const handleChange = useCallback(
    (e) => {
      const value = e.target.value;
      setCharCount(value.length);
      setAreaText(value);
    },
    [setAreaText, setCharCount]
  );

  const handleKeyPress = useCallback(
    (e) => {
      if (isOverLimit) {
        e.preventDefault();
      }
    },
    [isOverLimit]
  );

  return (
    <textarea
      name="translatorArea"
      id="translatorArea"
      placeholder="Enter text to translate"
      onChange={handleChange}
      onKeyUp={handleKeyPress}
      value={areaText}
    ></textarea>
  );
};

export default React.memo(TranslateArea);
