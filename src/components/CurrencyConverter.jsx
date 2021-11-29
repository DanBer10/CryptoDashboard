import { useState } from "react";
import ExchangeRate from "./ExchangeRate";
import axios from "axios";

const api_key = import.meta.env.PROD.VITE_API_KEY;

const CurrencyConverter = () => {
  const currencies = ["BTC", "ETH", "USD", "XRP", "LTC", "ADA"];
  const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState(
    currencies[0]
  );
  const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(0);

  const [exchangedData, setExchangedData] = useState({
    primaryCurrency: "BTC",
    secondaryCurrency: "BTC",
    exchangeRate: 0,
  });

  const convert = () => {
    const options = {
      method: "GET",
      url: "https://alpha-vantage.p.rapidapi.com/query",
      params: {
        from_currency: chosenPrimaryCurrency,
        function: "CURRENCY_EXCHANGE_RATE",
        to_currency: chosenSecondaryCurrency,
      },
      headers: {
        "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
        "x-rapidapi-key": api_key,
      },
    };

    axios
      .request(options)
      .then((response) => {
        response.data["Realtime Currency Exchange Rate"],
          setResult(
            response.data["Realtime Currency Exchange Rate"][
              "5. Exchange Rate"
            ] * amount
          ),
          // setPrimaryCurrencyExchanged(chosenPrimaryCurrency),
          // setSecondaryCurrencyExchanged(chosenSecondaryCurrency);
          setExchangedData({
            primaryCurrency: chosenPrimaryCurrency,
            secondaryCurrency: chosenSecondaryCurrency,
            exchangeRate:
              response.data["Realtime Currency Exchange Rate"][
                "5. Exchange Rate"
              ],
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="currency-converter">
      <h2>CurrencyConverter</h2>

      <div className="input-box">
        <table>
          <tbody>
            <tr>
              <td>Primary Currency:</td>
              <td>
                <input
                  type="number"
                  name="currency-amount-1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </td>
              <td>
                <select
                  value={chosenPrimaryCurrency}
                  onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                  name={""}
                  className="currency-options"
                >
                  {currencies.map((currency, _index) => (
                    <option key={_index}>{currency}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>Secondary Currency:</td>
              <td>
                <input
                  name="currency-amount-2"
                  value={result}
                  disabled={true}
                />
              </td>
              <td>
                <select
                  value={chosenSecondaryCurrency}
                  onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
                  name={""}
                  className="currency-options-2"
                >
                  {currencies.map((currency, _index) => (
                    <option key={_index}>{currency}</option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <button id="convert-button" onClick={convert}>
          Convert
        </button>
      </div>

      <ExchangeRate exchangedData={exchangedData} result={result} />
    </div>
  );
};

export default CurrencyConverter;
