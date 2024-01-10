import { Box } from "@mui/material"
import { NavLink } from "react-router-dom"

const Header = () => {
    return (
        <Box display="flex" justifyContent="space-between" p={2} borderBottom={1} borderColor="divider" mb={2}>
            <NavLink to="/table">Table</NavLink>
            <NavLink to="/">Home</NavLink>
        </Box>
    )
}

export default Header   