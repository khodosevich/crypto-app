import { TableCell, TableRow, Typography, IconButton,Box } from "@mui/material"
import {  useNavigate } from "react-router-dom"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useContext } from "react";
import { FavouriteCoinsContext } from "./Home";
// import { getIcon } from "../api/methods";


const CoinRow = ({ coin, favourites, isSearch }) => {

    const { addToFavourites } = useContext(FavouriteCoinsContext)

    const navigate = useNavigate()
    const redirectById = (id: string) => {
        navigate(`/table/${id}`)
    }

    const handlerIconClick = (e) => {
        e.stopPropagation();
        addToFavourites(coin?.id)
    }

    // const [logoUrl, setLogoUrl] = useState<string>("")

    // const fetchLogo = async () => {

    //     try {
    //         const data = await getIcon(coin?.symbol)
    //         setLogoUrl(data?.data?.image?.large)
    //     } catch (error) {
    //         console.log(error)
    //     }

    // }

    // useEffect(() => {
    //     fetchLogo()
    // }, [])

    return (
        <TableRow
            onClick={() => redirectById(coin?.id)}
            sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer", transition: "all 0.6s", backgroundColor: isSearch ? "#E0E0E0" : "", "&:hover": { backgroundColor: "#E0E0E0" }, }}
        >
            <TableCell style={{ zIndex: "100" }} component="th" scope="row">
                <IconButton
                    onClick={(e) => handlerIconClick(e)} aria-label="favourite">
                    <StarBorderIcon sx={{ ":hover": { color: "gold" }, color: favourites.includes(coin?.id) ? "gold" : "grey" }} />
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
                <Typography>{coin?.rank}</Typography>
            </TableCell>
            <TableCell align="left">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {/* <img src={logoUrl} alt="logo" style={{ width: "25px", height: "25px", marginRight: "5px" }} /> */}
                    <Typography>{coin?.name}</Typography>
                    <span style={{ marginLeft: "5px", color: "gray" }}>{coin?.symbol}</span>
                </Box>
             
            </TableCell>
            <TableCell align="left">
                <Typography>
                    ${parseFloat(coin?.priceUsd).toFixed(2)}
                </Typography>
            </TableCell>
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
                        ?   <>
                             {parseFloat(coin?.changePercent24Hr).toFixed(2)}%
                        </> : "no data"
                    }

                </Typography>
            </TableCell>
        </TableRow>
    )
}

export default CoinRow