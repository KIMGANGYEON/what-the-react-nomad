import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);

  const onClick = () => {
    setLoading2((prev) => !prev);

    // coin.quotes.USD.price가 money보다 작은 코인들을 필터링
    const filtered = coins.filter(
      (coin) => coin.quotes.USD.price > parseFloat(money)
    );
    setFilteredCoins(filtered);
  };

  const onChange = (event) => {
    setMoney(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setMoney("");
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select>
          {coins.map((coin, index) => (
            <option key={index}>
              {coin.name} ({coin.symbol}): ${Math.round(coin.quotes.USD.price)}{" "}
              USD
            </option>
          ))}
        </select>
      )}
      <hr />
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={money}
          type="number"
          placeholder="Write your money"
        />
        <button onClick={onClick}>click</button>
      </form>
      <hr />
      <h1>This coins you can buy {loading2 ? "" : filteredCoins.length}</h1>
      {loading2 ? (
        <strong>Loading...</strong>
      ) : (
        <select>
          {filteredCoins.map((coin, index) => (
            <option key={index}>
              {coin.name} ({coin.symbol}): ${Math.round(coin.quotes.USD.price)}{" "}
              USDD
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

// export default App;
