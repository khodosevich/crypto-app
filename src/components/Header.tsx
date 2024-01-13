import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { CoinType } from "../api/types"
import { methods } from "../api/methods"
import links from "../components/NavLinks.json"

const Header = () => {

    const [coins, setCoins] = useState<CoinType[]>([])

    const fetchCoins = async () => {
        try {
            const data = await methods.getTopCoins()
            setCoins(data.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCoins()
    }, [])

    return (
        <Box  sx={{display:"flex", justifyContent:"space-between" , gap: "20px" , alignItems:"center",  padding: "10px", borderColor:"divider" , 
        "@media (max-width: 800px)"
                : { flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px"
            }}} 
        
        >
            <Box display="flex" justifyContent="center" gap={2} 
                sx={{
                    "@media (max-width: 800px)"
                    : { flexWrap: "wrap"}
                }}
            >
                {
                    coins.map((coin: CoinType) => {
                        return (
                            <Box sx={{ cursor: "pointer" , gap: "20px", fontSize: "14px", transition: "all 0.3s ease-in-out" ,
                            "&:hover": {transform: "scale(1.05)"},}}  key={coin.id}>
                                <NavLink 
                                    style={{ textDecoration: "none", color: "black"}} to={`/table/${coin.id}`}>
                                    
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
                {
                    links.map((link) =>  (
                            <NavLink key={link.id} style={{ textDecoration: "none", color: "black", fontSize: "20px"}} to={link.path}>
                                {link.name}
                            </NavLink>
                        ))
                }
            </Box>
        </Box>

    )
}

export default Header   