import { TableCell, TableRow, Typography, IconButton, Box, createTheme, useMediaQuery } from "@mui/material"
import { useNavigate } from "react-router-dom"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useContext } from "react";
import { FavouriteCoinsContext } from "./Home";


const theme = createTheme();
const CoinRow = ({ coin, favourites, isSearch }) => {

    const { addToFavourites } = useContext(FavouriteCoinsContext)
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const navigate = useNavigate()
    const redirectById = (id: string) => {
        navigate(`/table/${id}`)
    }

    const handlerIconClick = (e) => {
        e.stopPropagation();
        addToFavourites(coin?.id)
    }

    return (
        <TableRow
            onClick={() => redirectById(coin?.id)}
            sx={{
                '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer", transition: "all 0.6s", backgroundColor: isSearch ? "#E0E0E0" : "", "&:hover": { backgroundColor: "#E0E0E0" }
                , "@media (max-width: 800px)"
                    : {
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px"
                }


                ,
            }}
        >
            <TableCell width={isSmallScreen ? "30px" : "40px"} style={{ zIndex: "100" }} component="th" scope="row">
                <IconButton
                    sx={{
                        "@media (max-width: 800px)": { padding: 0 }
                    }}
                    onClick={(e) => handlerIconClick(e)} aria-label="favourite">
                    <StarBorderIcon sx={{ ":hover": { color: "gold", "@media (max-width: 800px)": { padding: 0 } }, color: favourites.includes(coin?.id) ? "gold" : "grey" }} />
                </IconButton>
            </TableCell>
            <TableCell width={isSmallScreen ? "30px" : "40px"} component="th" scope="row">
                <Typography>{coin?.rank}</Typography>
            </TableCell>
            <TableCell width={isSmallScreen ? "10px" : "20px"} align="left">
                <Box sx={{ display: "flex", alignItems: "center", 
                    "@media (max-width: 800px)"
                    : { flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                }
                }}>
                  
                    <Typography>{coin?.name}</Typography>
                    <span style={{ marginLeft: "5px", color: "gray" }}>{coin?.symbol}</span>
                     


                </Box>

            </TableCell>
            <TableCell width={isSmallScreen ? "30px" : "40px"} align="left">
                <Typography>
                    ${parseFloat(coin?.priceUsd).toFixed(2)}
                </Typography>
            </TableCell>

            {
                !isSmallScreen && <>
                    <TableCell align="right">
                        <Typography>
                            {new Intl.NumberFormat('en-US',
                                { style: 'currency', currency: 'USD', })
                                .format(coin?.marketCapUsd)}
                        </Typography>
                    </TableCell>
                    <TableCell align="right">
                        <Typography>
                            {new Intl.NumberFormat('en-US',
                                { style: 'currency', currency: 'USD', })
                                .format(coin?.volumeUsd24Hr)}
                        </Typography>
                    </TableCell>
                    <TableCell align="right">
                        <Typography sx={{ color: coin?.changePercent24Hr > 0 ? "green" : "red" }}>

                            {
                                coin?.changePercent24Hr !== null
                                    ? <>
                                        {parseFloat(coin?.changePercent24Hr).toFixed(2)}%
                                    </> : "no data"
                            }

                        </Typography>
                    </TableCell>
                </>
            }


        </TableRow>
    )
}

export default CoinRow