import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { LineChart } from '@mui/x-charts/LineChart';
import axios from "axios";
import { methods } from "../api/methods";
import { CoinType } from "../api/types";

const Coin = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState<CoinType | null>(null);
    const [logo, setLogo] = useState<string>("");
    const [loading, setLoading] = useState(true);

    const fetchCoin = async () => {
        try {
            const data = await methods.getCoin(id);
            const coinData = data.data?.data;

            setCoin({
                id: coinData.id,
                name: coinData.name,
                symbol: coinData.symbol,
                rank: coinData.rank,
                priceUsd: coinData.priceUsd,
                volumeUsd24Hr: coinData.volumeUsd24Hr,
                supply: coinData.supply,
                maxSupply: coinData.maxSupply,
                marketCapUsd: coinData.marketCapUsd,
                changePercent24Hr: coinData.changePercent24Hr,
                vwap24Hr: coinData.vwap24Hr,
            });

            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinData.id}`);
            if (response && response.data && response.data.image && response.data.image.large) {
                const logoUrl = response.data.image.large;
                setLogo(logoUrl);
            } else {
                console.error("Некорректный ответ от API");
            }
        } catch (error) {
            console.error("Error fetching coin data:", error);
        } finally {
            setLoading(false);
        }
    };


    const [coordinates, setCoordinates] = useState([]);

    const fetchGraphics = async () => {
        try {
            if (coin !== null) {
                const data = await axios.get(`https://api.coincap.io/v2/assets/${coin?.id}/history?interval=d1`)
                console.log(data)

                setCoordinates(data.data.data)
            
            }

        } catch (error) {
            console.error('Error fetching graphics:', error);
        }
    };

    // const timeHandler = (time: number) => {

    //     const date = new Date(time);
    //     const hours = date.getHours();
    //     const minutes = date.getMinutes();
    //     const seconds = date.getSeconds();
    //     const formattedTime = `${hours}:${minutes}:${seconds}`;
    //     return parseFloat(formattedTime)
    // }


    useEffect(() => {
        fetchGraphics();
    }, [coin]);

    useEffect(() => {
        fetchCoin();
    }, []);


    return (
        <Box>
            {loading ? (
                <Box
                    sx={{
                        display: "flex", justifyContent: "center", alignItems: "center",
                        width: "100vw", height: "100vh", position: "absolute",
                        top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "999",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",

                    }}
                >
                    <CircularProgress size={300} />
                </Box>
            ) : (
                coin && (
                    <Box>
                        <img
                            style={{ width: "50px", height: "50px" }}
                            src={logo ? logo : "https://pbs.twimg.com/profile_images/1170840029758992390/RVydcfFF_400x400.jpg"}
                            alt="logo"
                        />
                        <Typography>{coin.id}</Typography>
                        <Typography>{coin.name}</Typography>
                        <Typography>{coin.priceUsd}</Typography>
                        <Typography>{coin.symbol}</Typography>
                        <Typography>{coin.volumeUsd24Hr}</Typography>

                        <LineChart
                            
                            height={400}
                            width={1300}

                            xAxis={[
                                {
                                    data: coordinates.map((item) => new Date(item.time)),
                                    label: 'Время',
                                    scaleType: 'time',
                                }
                            ]}
                            yAxis={[
                                {
                                    data: coordinates.map((item) => parseFloat(item.priceUsd)),
                                }
                            ]}
                            series={[
                                { data: coordinates.map((item) => parseFloat(item.priceUsd)), label: 'Цена', area: true }
                            ]}
                          
                        />



                    </Box>
                )
            )}
        </Box>
    );
};

export default Coin;
