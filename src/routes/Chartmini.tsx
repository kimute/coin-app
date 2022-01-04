import { useQuery } from "react-query";
import {fetchCoinHistory} from "../api";


interface IHistory {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface ChartProps {
    coinId: string;
}

function Chart_mini({coinId}:ChartProps){
    const { isLoading, data } = useQuery<IHistory[]>(["ohlcv2", coinId],()=>fetchCoinHistory(coinId))
    return (
       <div>
           {isLoading ? (
               "Loading chart...."
               ) : (data?.map((price)=> price.close))}
        </div>)

}

export default Chart_mini;