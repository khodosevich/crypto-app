import { Box } from "@mui/material"
import { NavLink } from "react-router-dom"

const Header = () => {
    return (
        <Box display="flex" justifyContent="center" gap={2} alignItems="center" p={2} borderColor="divider" mb={2}>
            <NavLink style={{ textDecoration: "none", color: "black", fontSize: "20px" }} to="/table">Table</NavLink>
            <NavLink style={{ textDecoration: "none", color: "black", fontSize: "20px" }} to="/">Home</NavLink>
            <NavLink style={{ textDecoration: "none", color: "black", fontSize: "20px" }} to="/wallet">Wallet</NavLink>
        </Box>
    )
}

export default Header   