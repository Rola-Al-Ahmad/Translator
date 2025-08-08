import React, { useCallback } from "react";

import copyImg from "../assets/copy.svg";
import { useClipboard } from "../hooks/useClipboard";

const CopyButton = ({ text }) => {
  const { copy } = useClipboard();
  const handleCopy = useCallback(() => {
    copy(text);
  }, [copy, text]);
  return <img src={copyImg} alt="copy icon" onClick={handleCopy} />;
};

export default React.memo(CopyButton);
