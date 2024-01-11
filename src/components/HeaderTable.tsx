import { TableCell, TableHead, TableRow, Typography } from "@mui/material"

const HeaderTable = ({ sortByPrice, isSortByPrice, sortDefault, sortByChange }) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell> </TableCell>
                <TableCell>
                    <Typography sx={{ fontWeight: "bold", cursor: "default" }}>
                        Rank
                    </Typography>
                </TableCell>
                <TableCell align="left">
                    <Typography onClick={sortDefault} sx={{ fontWeight: "bold", cursor: "pointer" }}>
                        Name
                    </Typography>
                </TableCell>
                <TableCell align="left">
                    <Typography onClick={sortByPrice} sx={{ fontWeight: "bold", cursor: "pointer" }}>
                        Price {isSortByPrice ? "↑" : "↓"}
                    </Typography>
                </TableCell>
                <TableCell align="right">
                    <Typography sx={{ fontWeight: "bold", cursor: "default" }}>
                        Market Cap
                    </Typography>
                </TableCell>
                <TableCell align="right">
                    <Typography sx={{ fontWeight: "bold", cursor: "default" }}>
                        Volume(24Hr)
                    </Typography>
                </TableCell>
                <TableCell align="right">
                    <Typography onClick={sortByChange} sx={{ fontWeight: "bold", cursor: "pointer" }}>
                        Change(24Hr)
                    </Typography>
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

export default HeaderTable