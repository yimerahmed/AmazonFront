import React from "react";
import numeral from "numeral";


const CurrencyFormat = ({ amount }) => {
  const formatted = numeral(amount || 0).format("$0,0.00");
  return <span>{formatted}</span>;
};

export default CurrencyFormat;


/*
import React from "react";

const CurrencyFormat = ({ amount }) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount || 0); // fallback for safety

  return <span>{formatted}</span>;
};

export default CurrencyFormat;
*/