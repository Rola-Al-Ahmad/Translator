/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLanguage } from "../hooks/useLanguage";

import expand from "../assets/Expand_down.svg";

const languageCodes = {
  Turkish: "tr",
  French: "fr",
  Spanish: "es",
  Portuguese: "pt",
  German: "de",
  Italian: "it",
  Chinese: "zh",
  Japanese: "ja",
  Russian: "ru",
  Hindi: "hi",
  Korean: "ko",
};

export const getLanguageName = (code) => {
  if (code === "en") return "English";
  else if (code === "ar") return "Arabic";
  return (
    Object.entries(languageCodes).find(
      ([name, langCode]) => langCode === code
    )?.[0] || null
  );
};

const LangSelect = ({ cardName, onLanguageClick }) => {
  const { areaLanguage, resultLanguage } = useLanguage();

  const activeLanguage = useMemo(() => {
    return cardName === "translatorArea" ? areaLanguage : resultLanguage;
  }, [cardName, areaLanguage, resultLanguage]);

  const isActiveLanguageInDropdown = useMemo(() => {
    return Object.values(languageCodes).includes(activeLanguage);
  }, [activeLanguage]);

  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleLanguageSelect = useCallback(
    (code) => {
      onLanguageClick(code);
      setIsOpen(false);
    },
    [onLanguageClick]
  );

  const selectedLanguageName = useMemo(() => {
    return (
      Object.entries(languageCodes).find(
        ([, code]) => code === activeLanguage
      )?.[0] || "Turkish"
    );
  }, [activeLanguage]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`custom-dropdown-wrapper ${isOpen ? "open" : ""}`}
      ref={wrapperRef}
    >
      <div
        className={`dropdown-button ${
          isActiveLanguageInDropdown ? "active" : ""
        }`}
        onClick={toggleDropdown}
      >
        {selectedLanguageName}
        <img src={expand} alt="expand" className="dropdown-arrow" />
      </div>

      {isOpen && (
        <div className="dropdown-list">
          {Object.entries(languageCodes).map(([name, code]) => (
            <div
              key={code}
              className={`dropdown-item ${
                code === activeLanguage ? "selected" : ""
              }`}
              onClick={() => handleLanguageSelect(code)}
            >
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(LangSelect);
