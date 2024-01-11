import { useContext, useEffect, useState } from "react"
import { FavouriteCoinsContext } from "./Home"
import { Box, Typography, Table, TableBody } from "@mui/material"
import { methods } from "../api/methods"
import { CoinType } from "../api/types";
import CoinRow from "./CoinRow";

const Wallet = () => {
    const { favouriteCoins } = useContext(FavouriteCoinsContext);

    const [coins, setCoins] = useState<CoinType[]>([])

    const fetchCoins = async () => {

        try {
            const coinData = await Promise.all(
                favouriteCoins.map(async (coin) => {
                    const data = await methods.getCoin(coin).then(res => res.data);
                    return data.data;
                })
            );

            setCoins(coinData)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchCoins()
    }, [favouriteCoins]);

    return (
        <Box>

            <Typography variant="h3">Your wallet:</Typography>
            <Table>
                <TableBody>
                    {coins.map((coin) => (
                        <CoinRow key={coin.id} coin={coin} isSearch={false} favourites={favouriteCoins} />
                    ))}
                </TableBody>
            </Table>

        </Box>
    );
};

export default Wallet