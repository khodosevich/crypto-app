import { TableCell, TableHead, TableRow, Typography, useMediaQuery, createTheme } from "@mui/material"


const theme = createTheme();
const HeaderTable = ({ sortByPrice, isSortByPrice, sortDefault, sortByChange, sortByName }) => {

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <TableHead>
            <TableRow>
                <TableCell  sx={{ "@media (max-width: 800px)": { padding:0 }}}> </TableCell>
                <TableCell >
                    <Typography align="left" width={isSmallScreen ? "10px" : "20px"} onClick={sortDefault} sx={{ fontWeight: "bold", cursor: "pointer", padding:0 }}>
                        Rank
                    </Typography>
                </TableCell>
                <TableCell width={isSmallScreen ? "30px" : "40px"} align="left">
                    <Typography align="left"  width={isSmallScreen ? "30px" : "40px"} onClick={sortByName} sx={{ fontWeight: "bold", cursor: "pointer" }}>
                        Name
                    </Typography>
                </TableCell>
                <TableCell width={isSmallScreen ? "30px" : "40px"} align="left">
                    <Typography width="100%" onClick={sortByPrice} sx={{ fontWeight: "bold", cursor: "pointer" }}>
                        Price {isSortByPrice ? "↑" : "↓"}
                    </Typography>
                </TableCell>

                {
                    !isSmallScreen && <>

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
                    </>
                }

            </TableRow>
        </TableHead>
    )
}

export default HeaderTable