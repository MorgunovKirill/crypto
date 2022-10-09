const API_KEY =
  "91d258e61c3a806be8ce7c2f5c859a5047d6b20fe587ac8d18161dc1eba0f4ee";

export const loadTicker = (tickerName) => {
  return fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=${tickerName}&tsyms=USD&api_key=${API_KEY}`
  ).then((res) => res.json());
};
