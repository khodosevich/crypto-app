import { useEffect, useState } from "react"
import { methods } from "../api/methods"
import {  useParams } from "react-router-dom"
import { Box, Typography } from "@mui/material"

const Coin = () => {

    const { id } = useParams()

    const [coin, setCoin] =  useState({
        id: "",
        name: "",
        symbol: "",
        rank: "",
        priceUsd: "",
        volumeUsd24Hr: ""
    })

    const fetchCoin = async () => {
        
        const data = await methods.getCoin(id)

        console.log(data.data.data)
        setCoin({
            id: data.data.data.id,
            name: data.data.data.name,
            symbol: data.data.data.symbol,
            rank: data.data.data.rank,
            priceUsd: data.data.data.priceUsd,
            volumeUsd24Hr: data.data.data.volumeUsd24Hr
        })
    }

    useEffect(() => {
        fetchCoin()
    }, [])

    return (
        <Box>
            <Typography>{coin.rank}</Typography>
            <Typography>
                    {coin.id}
            </Typography>
            <Typography>{coin.name}</Typography>
            <Typography>{coin.priceUsd}</Typography>
            <Typography>{coin.symbol}</Typography>
            <Typography>{coin.volumeUsd24Hr}</Typography>
        </Box>
    )
}

export default Coin