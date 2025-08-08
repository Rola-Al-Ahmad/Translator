/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useReducer } from "react";

export const LanguageContext = createContext();

const initialState = {
  areaLanguage: "autodetect",
  resultLanguage: "ar",
  areaText: "",
  resultText: "",
};

function languageReducer(state, action) {
  switch (action.type) {
    case "SET_AREA_LANGUAGE":
      return { ...state, areaLanguage: action.payload };
    case "SET_RESULT_LANGUAGE":
      return { ...state, resultLanguage: action.payload };
    case "SET_AREA_TEXT":
      return { ...state, areaText: action.payload };
    case "SET_RESULT_TEXT":
      return { ...state, resultText: action.payload };
    case "SWAP_LANGUAGES": {
      const newResultLang =
        state.areaLanguage === "autodetect" ? "en" : state.areaLanguage;
      return {
        ...state,
        areaLanguage: state.resultLanguage,
        resultLanguage: newResultLang,
        areaText: state.resultText,
        resultText: state.areaText,
      };
    }

    default:
      return state;
  }
}

export const LanguageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(languageReducer, initialState);

  const setAreaText = (text) =>
    dispatch({ type: "SET_AREA_TEXT", payload: text });
  const setResultText = (text) =>
    dispatch({ type: "SET_RESULT_TEXT", payload: text });
  const setAreaLanguage = (lang) => {
    if (lang === state.resultLanguage) {
      // toast.error(
      //   "The source and target languages can’t be the same. Please choose another one."
      // );
      // return;

      dispatch({
        type: "SET_RESULT_LANGUAGE",
        payload:
          state.areaLanguage === "autodetect" ? "en" : state.areaLanguage,
      });
    }
    dispatch({ type: "SET_AREA_LANGUAGE", payload: lang });
  };

  const setResultLanguage = (lang) => {
    if (lang === state.areaLanguage) {
      // toast.error(
      //   "The target and source languages can’t be the same. Please select a different one."
      // );
      // return;

      dispatch({ type: "SET_AREA_LANGUAGE", payload: state.resultLanguage });
    }
    dispatch({ type: "SET_RESULT_LANGUAGE", payload: lang });
  };

  const swapLanguages = () => dispatch({ type: "SWAP_LANGUAGES" });

  return (
    <LanguageContext.Provider
      value={{
        ...state,
        setAreaText,
        setResultText,
        setAreaLanguage,
        setResultLanguage,
        swapLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
