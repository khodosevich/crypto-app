import { Box } from "@mui/material"
import { useState, useEffect, useContext } from "react"
import { methods } from "../api/methods"
import { Table, TableBody, TableContainer, Paper, Pagination } from '@mui/material'
import CoinRow from "./CoinRow"
import { CoinType } from "../api/types"
import HeaderTable from "./HeaderTable"
import SearchComponent from "./SearchComponent"
import { FavouriteCoinsContext } from "./Home"

const CoinTable = () => {

    const { favouriteCoins } = useContext(FavouriteCoinsContext)

    const [coins, setCoins] = useState({ data: [] })

    const [search, setSearch] = useState<string | null>("")
    const [isSearch, setIsSearch] = useState(false)

    const [searchingCoins, setSearchingCoins] = useState<CoinType | null>(null)

    const handlerSearch = async () => {

        setIsSearch(true)

        if (search === "") {
            setIsSearch(false)
            return
        } else {

            try {

                const coin = coins.data.filter((coin: CoinType) => coin.id === search.toLowerCase())

                console.log(coin)

                const id = coin[0].id

                console.log(id)

                const data = await methods.getCoin(id)
                    .then(res => res.data)
                    .catch(err => console.log(err))
                    .finally(() => setSearch(""))
                setSearchingCoins(data.data)

            } catch (error) {
                console.log(error)
            }

        }
    }

    const fetchCoins = async () => {
        const data = await methods.getCoins().then(res => res.data).catch(err => console.log(err))
        console.log(data)
        setCoins(data)
    }

    const [isSortByPrice, setIsSortByPrice] = useState(false)
    const sortByPrice = () => {
        setIsSortByPrice(!isSortByPrice)

        if (isSortByPrice) {
            const sortedCoins = coins.data.sort((a: CoinType, b: CoinType) => b.priceUsd - a.priceUsd)
            setCoins({ data: sortedCoins })
        } else {
            const sortedCoins = coins.data.sort((a: CoinType, b: CoinType) => a.priceUsd - b.priceUsd)
            setCoins({ data: sortedCoins })
        }
    }

    const sortDefault = () => {
        fetchCoins()
    }

    const sortByChange = () => {
        const sortedCoins = coins.data.sort((a: CoinType, b: CoinType) => b.changePercent24Hr - a.changePercent24Hr)
        setCoins({ data: sortedCoins })
    }

    useEffect(() => {
        fetchCoins()
    }, [])

    return (
        <Box>

            <SearchComponent search={search} setSearch={setSearch} handlerSearch={handlerSearch} setIsSearch={setIsSearch} />

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">

                    <HeaderTable sortByChange={sortByChange} sortDefault={sortDefault} sortByPrice={sortByPrice} isSortByPrice={isSortByPrice} />

                    <TableBody>

                        {
                            isSearch &&
                            <CoinRow key={searchingCoins?.id} isSearch={true} coin={searchingCoins} favourites={favouriteCoins} />
                        }
                        {
                            coins.data.map((coin) => (
                                <CoinRow key={coin.id} isSearch={false} coin={coin} favourites={favouriteCoins} />
                            ))
                        }


                    </TableBody>
                </Table>
            </TableContainer>

            <Box display="flex" justifyContent="center" mt={2} mb={2}>
                <Pagination count={10} color="primary" />
            </Box>

        </Box>
    )
}

export default CoinTable