const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins(){
    return fetch(`${BASE_URL}/coins`).then((resp) => resp.json());
}
export function fetchCoinInfo(coinId: string){
    return fetch(`${BASE_URL}/coins/${coinId}`).then((resp) => resp.json());
}
export function fetchCoinTickers(coinId: string){
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((resp) => resp.json());
}

export function fetchCoinHistory(coinId: string){
    const endDate = Math.floor(Date.now()/1000);
    const startDate = endDate - 60 *60 *60*7; //get 2weeks data
    return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`).then((response) => response.json())
}