const BASE_URL = 'https://api.coingecko.com/api/v3';

export const Coin = {
  index() {
    return fetch(`${BASE_URL}/coins/markets?vs_currency=cad`).then(response => {
      console.log(response);
      return response.json();
    });
  },
  show(id) {
    return fetch(`${BASE_URL}/coins/${id}`).then(res => res.json());
  }
};