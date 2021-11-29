import React from "react";

const ExchangeRate = ({ exchangedData, result }) => {
  return (
    <div className="exchange-rate">
      <h3>Exchange Rate</h3>
      <h2> {result}</h2>
      <p>
        {exchangedData.primaryCurrency} to {""}
        {exchangedData.secondaryCurrency}
      </p>
    </div>
  );
};

export default ExchangeRate;
