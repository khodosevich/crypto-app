import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, IconButton } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { LineChart } from '@mui/x-charts/LineChart';
import axios from "axios";
import { methods } from "../api/methods";
import { CoinType } from "../api/types";
import { FavouriteCoinsContext } from "./Home";
import InfoAboutCategory from "./InfoAboutCategory";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { createTheme, useMediaQuery } from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const theme = createTheme();
const Coin = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState<CoinType | null>(null);
    const [logo, setLogo] = useState<string>("");
    const [loading, setLoading] = useState(true);

    const { favouriteCoins, addToFavourites } = useContext(FavouriteCoinsContext)

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));

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
    const [showGraph, setShowGraph] = useState<boolean>(true);

    const fetchGraphics = async () => {
        try {
            if (coin !== null) {
                const data = await axios.get(`https://api.coincap.io/v2/assets/${coin?.id}/history?interval=d1`)
                setCoordinates(data.data.data)
                if(data.data.data.length > 0) {
                    setShowGraph(true)
                } else {
                    setShowGraph(false)
                }
            }

        } catch (error) {
            setShowGraph(false)
            console.error('Error fetching graphics:', error);
        }
    };

    const handlerIconClick = () => {
        addToFavourites(coin?.id)
    }

    useEffect(() => {
        fetchGraphics();
    }, [coin]);

    useEffect(() => {
        fetchCoin();
    }, [id]);


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
                    <Box sx={{
                        "@media (max-width: 1200px)"
                            : {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "20px"
                        }
                    }}>
                        <Box display="flex" justifyContent="start" alignItems="center" marginTop="20px" >

                            <IconButton
                                onClick={handlerIconClick} aria-label="favourite">
                                <StarBorderIcon sx={{ transition: "all 0.6s", ":hover": { color: "gold", transform: "scale(1.3)" }, color: favouriteCoins.includes(coin?.id) ? "gold" : "grey" }} />
                            </IconButton>

                            <img
                                style={{ width: "60px", height: "60px" }}
                                src={logo ? logo : "https://pbs.twimg.com/profile_images/1170840029758992390/RVydcfFF_400x400.jpg"}
                                alt="logo"
                            />
                            <Box display="flex" flexDirection="column" alignItems="start">
                                <Typography variant="h4">{coin.name}</Typography>
                                <Typography sx={{ color: "grey" }}>({coin.symbol})</Typography>
                            </Box>

                        </Box>

                        <Typography sx={{ marginTop: "20px" }}>Rank: {coin.rank}</Typography>
                        <Typography sx={{ display: "flex", alignItems: "center" }}>

                            Pcice: $ {!(typeof coin.priceUsd === 'number') && !(Math.abs(coin.priceUsd) < 0.01)
                                ? parseFloat(coin.priceUsd).toFixed(2)
                                : coin.priceUsd
                            }
                            <span style={{ color: coin.changePercent24Hr > 0 ? "green" : "red", display: "flex", alignItems: "center", marginLeft: "10px" }}>
                                {coin.changePercent24Hr > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                                {typeof coin.changePercent24Hr === 'number'
                                    ? coin.changePercent24Hr.toFixed(2)
                                    : parseFloat(coin.changePercent24Hr).toFixed(2)}
                            </span>
                        </Typography>

                        <InfoAboutCategory
                            title="Maxsupply"
                            value={coin.maxSupply}
                            info="The maximum amount of coins that will ever exist in the lifetime of the cryptocurrency. It is analogous to the fully diluted shares in the stock market.
                            If the project did not submit this data nor was it verified by CoinMarketCap, max. supply shows “--”."
                        />

                        <InfoAboutCategory
                            title="Supply"
                            value={coin.supply}
                            info="Total supply = Total coins created - coins that have been burned (if any) It is comparable to outstanding shares in the stock market.
                            If the project did not submit this data nor was it verified by CoinMarketCap, total supply shows “--”."
                        />

                        <InfoAboutCategory
                            title="Market cap"
                            value={coin.marketCapUsd}
                            info="The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market.
                            Market cap = Current price x Circulating supply"
                        />

                        <InfoAboutCategory title="Volume (24Hr)" value={coin.volumeUsd24Hr} info="A measure of how much of a cryptocurrency was traded in the last 24 hours." />

                        {
                            showGraph
                                ? <LineChart

                                    height={isSmallScreen ? 300 : 500}
                                    width={isSmallScreen ? 320 : 1300}

                                    xAxis={[
                                        {
                                            data: coordinates.map((item) => new Date(item.time)),
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
                                /> : <Typography sx={{display: "flex", justifyContent: "center", alignItems: "center", margin: "100px 0"}} variant="h5">
                                    Graph not found
                                </Typography>
                        }

                    </Box>
                )
            )}
        </Box >
    );
};

export default Coin;
