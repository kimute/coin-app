import { useQuery } from "react-query";
import {fetchCoinHistory} from "../api";
import ApexChart from "react-apexcharts";

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

function Chart({coinId}:ChartProps){
    const { isLoading, data } = useQuery<IHistory[]>(["ohlcv", coinId],()=>fetchCoinHistory(coinId))
    return (
       <div>
           {isLoading ? (
               "Loading chart...."
               ) : (
                 <ApexChart 
                   type="line" 
                   series={[
                       {
                           name: "coin closing Price",
                           data: data?.map(price =>Math.floor(price.close))
                       }]}
                   options={{
                       theme: {
                           mode: "dark"
                       },
                       chart: { 
                           height:300, 
                           width:500,
                           background: "transparent"
                        },
                        stroke:{
                            curve: "smooth",
                            width: 4
                        },
                        dataLabels: {
                            enabled: false
                          },
                        xaxis: {
                            axisTicks: {show: false},
                            axisBorder: { show: false },
                            type: "datetime",
                            categories: data?.map(price =>(price.time_close).slice(5,10)),
                            
                        },
                        yaxis:{
                            axisBorder: { show: false },
                            axisTicks:  { show: false},
                            
                        },
                        fill: {
                            type: "gradient",
                            gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
                          },
                          colors: ["#0fbcf9"],
                            
                        }
                }/>)}</div>);
}

export default Chart;