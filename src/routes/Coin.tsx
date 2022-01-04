import { useEffect } from "react";
import { useState } from "react";
import { Helmet} from "react-helmet";
import { useQuery } from "react-query";
import { useParams, useRouteMatch } from "react-router";
import { Switch,Route, useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Chart from "./Chart";
import Price  from "./Price";

const Container = styled.div`
   padding: 0px 20px;
   max-width: 480px;
   min-width: 378px;
   margin:0 auto;
`;
const Home = styled.div`
   display:flex;
   justify-content: center;
   aligin-items: center;

    font-size: 20px;
    margin: 12px 60vh 0px 0px;
   
`;

const Header = styled.header`
   height: 15vh;
   display: flex;
   justify-content: center;
   aligin-items: center;
`;

const Title = styled.h1`
   font-size:48px;
   color:${props => props.theme.accentColor}
`;

const Loader = styled.span`
   text-align: center;
   display:block;
`;

const Overview = styled.div`;
   display: flex;
   justify-content: space-between;
   background-color: rgba(0, 0, 0, 0.5);
   padding:10px 20px;
   border-radius: 10px;
`;
const Description = styled.p`
   display:flex;
   margin: 20px 5px;
`;
const OverviewItem = styled.div`
   display: flex;
   flex-direction: column;
   span:first-child {
       font-size: 10px;
       font-weight: 400;
       text-transform: uppercase;
       margin-bottom: 5px;
       
   }
`;

const Tabs = styled.div`
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   margin: 25px 0px;
   gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  color: ${(props) => props.isActive ? props.theme.accentColor : props.theme.textColor};
  background-color: rgba(0, 0, 0, 0.5);
  padding: 12px 0px;
  border-radius: 10px;
  a {
      display: block;
  }
`;

interface RouteParams {
    coinId: string;
}

interface RouteState {
    name: string;
}

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface PriceData {
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

function Coin() {
    const {coinId} = useParams<RouteParams>();
    const {state} =useLocation<RouteState>();
    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");
    const {isLoading: infoLoading, data: InfoData} = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId));
    const {isLoading: tickersLoading, data: tickersData} = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId))
    
    //const params = useParams();
    //console.log(params);
    
    /*const [info, setInfo] = useState<InfoData>();
    const [priceinfo, setPriceInfo] = useState<PriceData>();
    const [loading, setLoading] = useState(true);
    

    useEffect(()=>{
        (async() =>{
            const infoData = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            console.log(infoData);
            const priceData = await (
                    await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            console.log(priceData);
           //const {quotes:{USD:price}} = priceData
           //console.log(price.price)
           setInfo(infoData);
           setPriceInfo(priceData);
           setLoading(false);
        })();
    },[coinId]);*/
    const loading = infoLoading || tickersLoading;
    
    return (
        <>
        <Home>
                <Link to='/'>
                   <FontAwesomeIcon icon={faHome} />
                </Link>
            </Home>
        <Container>
            <Helmet>
                <title>
                { state?.name ? state.name : loading ? "Loading..." : InfoData?.name}
                </title>
            </Helmet>
            <Header>
                <Title>{ state?.name ? state.name : loading ? "Loading..." : InfoData?.name}</Title>
            </Header>
            {loading ? (<Loader>Loading...</Loader>) : (
                <>
                <Overview>
                    <OverviewItem>
                        <span>Rank</span>
                        <span>{InfoData?.rank}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>SYMBOL</span>
                        <span>{InfoData?.symbol}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>PRICE NOW</span> 
                        <span>${(tickersData?.quotes.USD.price.toLocaleString('en-US'))}</span>
                    </OverviewItem>
                </Overview>
                <Description>
                    {InfoData?.description}
                </Description>
                <Overview>
                    <OverviewItem>
                        <span>Total Supply:</span>
                        <span>{(tickersData?.total_supply)?.toLocaleString('en-US')}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Max Supply:</span>
                        <span>{(tickersData?.max_supply)?.toLocaleString('en-US')}</span>
                    </OverviewItem>
                </Overview>
                <Tabs>
                    <Tab isActive={chartMatch !== null}>
                        <Link to={`/${coinId}/chart`}>Chart</Link>
                    </Tab>
                    <Tab isActive={priceMatch
                     !== null}>
                        <Link to={`/${coinId}/price`}>Price</Link>
                    </Tab>
                </Tabs>
                
                
                <Switch>
                    <Route path={`/:coinId/price`}>
                        <Price coinId={coinId}/>
                    </Route>
                    <Route path={`/:coinId/chart`}>
                        <Chart coinId={coinId}/>
                    </Route>
                </Switch>
                </>
            )}
        </Container>
        </>
    );
}
export default Coin;
