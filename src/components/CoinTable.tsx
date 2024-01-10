import { Box } from "@mui/material"
import { useState, useEffect } from "react"
import { methods } from "../api/methods"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { NavLink } from "react-router-dom"

const CoinTable = () => {

    const [coins, setCoins] = useState({ data: [] })

    const fetchCoins = async () => {
       
        const data = await methods.getCoins().then(res => res.data).catch(err => console.log(err))
        console.log(data)
        setCoins(data)
    }

    useEffect(() => {
        fetchCoins()
    }, [])

    // "id": "bitcoin",
    // "rank": "1",
    // "symbol": "BTC",
    // "name": "Bitcoin",
    // "supply": "17193925.0000000000000000",
    // "maxSupply": "21000000.0000000000000000",
    // "marketCapUsd": "119150835874.4699281625807300",
    // "volumeUsd24Hr": "2927959461.1750323310959460",
    // "priceUsd": "6929.8217756835584756",
    // "changePercent24Hr": "-0.8101417214350335",
    // "vwap24Hr": "7175.0663247679233209"

    return (
        <Box>
             <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="right">Id</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Symbol</TableCell>
                        <TableCell align="right">volumeUsd24Hr</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {coins.data.map((coin) => (
                        <TableRow
                        key={coin.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {coin.rank}
                        </TableCell>
                        <TableCell align="right">
                            <NavLink to={`/table/${coin.id}`}>
                                {coin.id}
                            </NavLink>    
                        </TableCell>
                        <TableCell align="right">{coin.name}</TableCell>
                        <TableCell align="right">{Math.round(coin.priceUsd * 100) / 100}</TableCell>
                        <TableCell align="right">{coin.symbol}</TableCell>
                        <TableCell align="right">{coin.volumeUsd24Hr}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default CoinTable