import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { CoinType } from "../api/types"
import { methods } from "../api/methods"

const Header = () => {

    const [coins, setCoins] = useState<CoinType[]>([])

    const fetchCoins = async () => {
        try {
            const data = await methods.getTopCoins()
            console.log(data.data.data)
            setCoins(data.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCoins()
    }, [])

    return (
        <Box display="flex" justifyContent="space-between" gap={2} alignItems="center" p={2} borderColor="divider" mb={2} >
            <Box display="flex" justifyContent="center" gap={2}>
                {
                    coins.map((coin: CoinType) => {
                        return (
                            <Box sx={{ cursor: "pointer" , gap: "20px", transition: "all 0.3s ease-in-out","&:hover": {transform: "scale(1.05)"}}}  key={coin.id}>
                                <NavLink style={{ textDecoration: "none", color: "black", fontSize: "14px" }} to={`/table/${coin.id}`}>
                                    
                                    <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                        {coin.name}
                                        
                                        ({coin.symbol})   
                                        
                                        <span style={{ color: coin.changePercent24Hr > 0 ? "green" : "red" }}>
                                            {coin?.changePercent24Hr.toString().slice(0, 5)}%
                                        </span>
                                    </Box>
            
                                
                                </NavLink>
                            </Box>
                        )
                    })
                }
            </Box>
            <Box display="flex" justifyContent="center" gap={2} alignItems="center">
                <NavLink style={{ textDecoration: "none", color: "black", fontSize: "20px" }} to="/table">Table</NavLink>
                <NavLink style={{ textDecoration: "none", color: "black", fontSize: "20px" }} to="/">Home</NavLink>
                <NavLink style={{ textDecoration: "none", color: "black", fontSize: "20px" }} to="/wallet">Wallet</NavLink>
            </Box>
        </Box>

    )
}

export default Header   