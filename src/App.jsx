import { useState } from "react";
import "./App.css";
import CurrencyInput from "./components/CurrencyInput.jsx";
import { useEffect } from "react";

function App() {
  const [have, setHave] = useState("usd");
  const [want, setWant] = useState("inr");
  const [amount, setAmount] = useState(0);
  const [newAmount, setNewAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);

  const convert = async () => {
    let data;
    try {
      const response = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${have}.json`,
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`); //
      }

      data = await response.json();
      const requiredAmount = data[have][want] * amount;
      setNewAmount(requiredAmount);
      setExchangeRate(data[have][want]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    convert();
  }, [amount, have, want]);

  return (
    <div className="converter">
      {/* Header */}
      <header className="converter__header">
        <h1 className="converter__title">Currency Converter</h1>
        <p className="converter__subtitle">
          Check live rates, set rate alerts, receive notifications and more.
        </p>
      </header>

      {/* Converter Card */}
      <div className="converter__card">
        <CurrencyInput
          label={"Amount"}
          amount={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          country={have.substring(0, 2)}
          onCurrencyChange={(e) => setHave(String(e.target.name).toLocaleLowerCase())}
        />

        {/* Switch Button */}
        <div className="converter__switch">
          <button className="switch-button">⇅</button>
        </div>

        <CurrencyInput
          label={"Converted Amount"}
          amount={newAmount}
          onChange={(e) => setNewAmount(Number(e.target.value))}
          country={want.substring(0,2)}
          onCurrencyChange={(e) => setWant(String(e.target.name).toLocaleLowerCase())}
        />
      </div>

      {/* Exchange Rate */}
      <footer className="converter__rate">
        <p>Indicative Exchange Rate</p>
        <strong>
          1 {have} = {Number(exchangeRate).toFixed(2)} {want}
        </strong>
      </footer>
    </div>
  );
}

export default App;
