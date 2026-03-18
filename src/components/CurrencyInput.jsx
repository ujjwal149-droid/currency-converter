import { useEffect, useState } from "react";
import "./CurrencyInput.css";

const CURRENCY_TO_COUNTRY = {
  usd: "us",
  eur: "eu",
  gbp: "gb",
  inr: "in",
  jpy: "jp",
  cad: "ca",
  aud: "au",
  chf: "ch",
  cny: "cn",
  hkd: "hk",
  sgd: "sg",
  nzd: "nz",
  sek: "se",
  nok: "no",
  dkk: "dk",
  mxn: "mx",
  brl: "br",
  rub: "ru",
  zar: "za",
  try: "tr",
  aed: "ae",
  sar: "sa",
  thb: "th",
  myr: "my",
  idr: "id",
  php: "ph",
  pkr: "pk",
  egp: "eg",
  ngn: "ng",
  kes: "ke",
  cop: "co",
  ars: "ar",
  clp: "cl",
  pen: "pe",
  vnd: "vn",
  bdt: "bd",
  lkr: "lk",
  qar: "qa",
  kwd: "kw",
  bhd: "bh",
  omr: "om",
  jod: "jo",
  iqd: "iq",
  uzs: "uz",
  kzt: "kz",
  uah: "ua",
  pln: "pl",
  czk: "cz",
  huf: "hu",
  ron: "ro",
  bgn: "bg",
  hrk: "hr",
  isk: "is",
  ils: "il",
  mad: "ma",
};

function getCountryCode(currencyCode) {
  return CURRENCY_TO_COUNTRY[currencyCode?.toLowerCase()] ?? "un"; // United Nations flag as fallback
}

function CurrencyInput({ label, onChange, amount, selectedCurrency, onCurrencyChange }) {
  const [currencies, setCurrencies] = useState({});

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(
          "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json"
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

  const countryCode = getCountryCode(selectedCurrency);

  return (
    <div className="currency-field">
      <label className="currency-field__label">{label}</label>
      <div className="currency-field__input">
        <div className="currency-select">
          <div
            style={{
              backgroundImage: `url(https://flagcdn.com/${countryCode}.svg)`,
            }}
            className="flag"
          ></div>
          <select
            value={selectedCurrency}
            onChange={onCurrencyChange}
          >
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