import { useState, useEffect, useCallback } from "react";
import "./App.css";
import CurrencyInput from "./components/CurrencyInput.jsx";

function App() {
  const [have, setHave] = useState("usd");
  const [want, setWant] = useState("inr");
  const [amount, setAmount] = useState(0);
  const [newAmount, setNewAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);

  const convert = useCallback(async () => {
    try {
      const response = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${have}.json`
      );
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const data = await response.json();
      const rate = data[have][want];
      setExchangeRate(rate);
      setNewAmount(parseFloat((rate * amount).toFixed(2)));
    } catch (err) {
      console.log(err);
    }
  }, [amount, have, want]);

  useEffect(() => {
    convert();
  }, [convert]);

  // Swap the two currencies
  const handleSwitch = () => {
    setHave(want);
    setWant(have);
  };

  return (
    <div className="converter">
      {/* Header */}
      <header className="converter__header">
        <h1 className="converter__title">Currency Converter</h1>
        <p className="converter__subtitle">
          Check live rates....
        </p>
      </header>

      {/* Converter Card */}
      <div className="converter__card">
        <CurrencyInput
          label={"Amount"}
          amount={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          selectedCurrency={have}
          onCurrencyChange={(e) => setHave(e.target.value)}
        />

        {/* Switch Button */}
        <div className="converter__switch">
          <button className="switch-button" onClick={handleSwitch}>
            ⇅
          </button>
        </div>

        <CurrencyInput
          label={"Converted Amount"}
          amount={newAmount}
          onChange={(e) => setNewAmount(Number(e.target.value))}
          selectedCurrency={want}
          onCurrencyChange={(e) => setWant(e.target.value)}
        />
      </div>

      <footer className="converter__rate">
        <p>Indicative Exchange Rate</p>
        <strong>
          1 {have.toUpperCase()} = {Number(exchangeRate).toFixed(4)}{" "}
          {want.toUpperCase()}
        </strong>
      </footer>
    </div>
  );
}

export default App;