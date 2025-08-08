import React from "react";
import CardHeader from "./CardHeader";
import CardTextArea from "./CardTextArea";
import CardAction from "./CardAction";

const TranslatorCard = ({ cardName }) => {
  return (
    <div className="translator-card-container">
      <CardHeader cardName={cardName} />
      <CardTextArea cardName={cardName} />
      <CardAction cardName={cardName} />
    </div>
  );
};

export default React.memo(TranslatorCard);
