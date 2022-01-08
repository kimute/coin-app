import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchCoins, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";
import { Button } from "@material-ui/core";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
   padding: 0px 20px;
   max-width: 480px;
   min-width: 378px;
   margin:0 auto;
`;

const Header = styled.header`
   height: 15vh;
   display: flex;
   justify-content: center;
   aligin-items: center;
`;
const Btn = styled.div`
position: absolute;
margin-left: 50vh;

`;
const Title = styled.h1`
   margin-top:10px;
   font-size:48px;
   color:${props => props.theme.accentColor}
`;

const CoinList = styled.ul`

`;

const Coin = styled.li`
   background-color:${(props) => props.theme.cardBgColor};
   display:flex;
   justify-content:space-between;
   padding:10px;
   color:${props => props.theme.textColor};
   margin-bottom: 10px;
   border-radius: 15px;
   border: 1px solid white;

   a {
       display: flex;
       align-items: center;
       padding:20px;
       transition: color 0.2s ease-in;
       
   }
   &:hover {
       a {
           color: ${(props) => props.theme.accentColor};
       }
   }
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}

const Loader = styled.span`
   text-align: center;
   display:block;
`;
const Img = styled.img`
   width:35px;
   height:35px;
   margin-right:10px;
`; 
const MiniChart = styled.span`
   margin-top:20px;
   text-align: center;
   display:block;
   font-size:28px;
   

`;

interface IcoinProps {}


function Coins({}:IcoinProps) {
    const setDarkAtom = useSetRecoilState(isDarkAtom)
    const toggleDark = () => setDarkAtom((prev) => !prev);
     //1:uniq name 1:func. name
    const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins)
    /*
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoding] = useState(true);
    useEffect(() =>{
        //start immediately
        (async() =>{
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0,100));
            setLoding(false);
        })();
    }, []);*/
    return (
        <>
        <Container>
            <Helmet>
                <title>Coin</title>
            </Helmet>
            <Header>
                <Title>Coins</Title>
                <Btn>
                <Button onClick={toggleDark}>Switch</Button>
                </Btn>
                
            </Header>
            {isLoading ? <Loader>Loding...</Loader>:(<CoinList>
                {data?.slice(0, 100).map(coin =>(
                <Coin key={coin.id}>
                    <Link to={{
                        pathname:`/${coin.id}`,
                        state: {name:coin.name}
                    }}>
                        <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                        {coin.name}
                    </Link>
                    <MiniChart>
                      &rarr;
                    </MiniChart>  
                </Coin>
                ))}
                
            </CoinList>)}
        </Container>
         </>
        
    );
}
export default Coins;