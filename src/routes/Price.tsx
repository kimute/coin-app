import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";

interface IPriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      };
    };
  }


interface PriceProps {
    coinId: string;
}

const Loader = styled.span`
   text-align: center;
   display:block;
`;
const PriceList = styled.ul``;
const PriceItems = styled.li`
   background-color:rgba(0, 0, 0, 0.5);
   display:flex;
   padding:10px;
   justify-content:space-between;
   margin-bottom: 10px;
   border-radius: 15px;
   span:last-child {
   color:${props =>props.theme.accentColor};
   }
`;

function Price({coinId}:PriceProps){
    const {isLoading, data:tickers} =useQuery<IPriceData>(["priceInfo", coinId],() =>fetchCoinTickers(coinId) )
    console.log("!!!!!!!!!!!!!!!!!!1",tickers)
    return (
        <>
        {isLoading ? <Loader>Loading..</Loader>:(
            <PriceList>
                <PriceItems>
                    <span>Price:</span>
                    <span>${tickers?.quotes.USD.price.toLocaleString('en-US')}</span>
                </PriceItems>
                <PriceItems>
                     <span>Last updated:</span>
                     <span>{tickers?.last_updated}</span>
                </PriceItems>
                <PriceItems>
                    <span>Price change ratio. in 15 min:</span>
                    <span>{tickers?.quotes.USD.percent_change_15m}</span>
                </PriceItems>
                <PriceItems>
                    <span>Price change ratio. in 30 min:</span>
                    <span>{tickers?.quotes.USD.percent_change_30m}</span>
                </PriceItems>
                <PriceItems>
                    <span>Price change ratio. in 1h:</span>
                    <span>{tickers?.quotes.USD.percent_change_1h}</span>
                </PriceItems>
                <PriceItems>
                    <span>Price change ratio. in 6h:</span>
                    <span>{tickers?.quotes.USD.percent_change_6h}</span>
                </PriceItems>
                <PriceItems>
                    <span>Price change ratio. in 12h:</span>
                    <span>{tickers?.quotes.USD.percent_change_12h}</span>
                </PriceItems>
                <PriceItems>
                    <span>Price change ratio. in 24h:</span>
                    <span>{tickers?.quotes.USD.percent_change_24h}</span>
                </PriceItems>
                <PriceItems>
                    <span>Price change ratio. in 7days:</span>
                    <span>{tickers?.quotes.USD.percent_change_7d}</span>
                </PriceItems>
                <PriceItems>
                    <span>Price change ratio. in 30days:</span>
                    <span>{tickers?.quotes.USD.percent_change_30d}</span>
                </PriceItems>
                
            </PriceList>
        )}
        </>
    )

}

export default Price;