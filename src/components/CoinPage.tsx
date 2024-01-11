import { useEffect, useState } from "react"
import { methods } from "../api/methods"
import {  useParams } from "react-router-dom"
import { Box, Typography } from "@mui/material"
import {CoinType} from "../api/types"

const Coin = () => {


    const { id } = useParams()

    const [coin, setCoin] =  useState<CoinType | null>(null)

    const fetchCoin = async () => {
        
        try {
            const data = await methods.getCoin(id);
    
            const coinData = data.data?.data;
            
            console.log(coinData)

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
                vwap24Hr: coinData.vwap24Hr
            });

            console.log(coin)
        } catch (error) {
            console.error("Error fetching coin data:", error);
        }
    }

    useEffect(() => {
        fetchCoin()
    }, [])

    return (
        <Box>
            {
                coin && (
                    <Box>
                        <Typography>{coin.id}</Typography>
                        <Typography>{coin.name}</Typography>
                        <Typography>{coin.priceUsd}</Typography>
                        <Typography>{coin.symbol}</Typography>
                        <Typography>{coin.volumeUsd24Hr}</Typography>
                    </Box>
                )
            }
        </Box>
    )
}

export default Coin