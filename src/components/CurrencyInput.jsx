import { useEffect, useState } from "react";
import "./CurrencyInput.css";

function CurrencyInput({ label, onChange, amount, country, onCurrencyChange }) {
  const [currencies, setCurrencies] = useState({});
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(
          "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json",
        );

        if (!response.ok) {
          throw new Error(`Network error: ${response.status}`);
        }

        const data = await response.json();
        setCurrencies(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCurrencies();
  }, []);

  return (
    <div className="currency-field">
      <label className="currency-field__label">{label}</label>

      <div className="currency-field__input">
        <div className="currency-select">
          {/* <img src="https://flagcdn.com/az.svg" alt={`${currency} flag`} /> */}
          <div
            style={{
              backgroundImage: `url(https://flagcdn.com/${country}.svg)`,
            }}
            className="flag"
          ></div>
          <select name="currency" onChange={onCurrencyChange}>
            {Object.entries(currencies).map(([code, name]) => (
              <option key={code} value={code}>
                {code.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <input type="number" value={amount} onChange={onChange} />
      </div>
    </div>
  );
}

export default CurrencyInput;
