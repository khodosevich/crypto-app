import { Alert, Box, CircularProgress } from "@mui/material"
import { useState, useEffect, useContext } from "react"
import { methods } from "../api/methods"
import { Table, TableBody, TableContainer, Paper, Pagination } from '@mui/material'
import CoinRow from "./CoinRow"
import { CoinType } from "../api/types"
import HeaderTable from "./HeaderTable"
import SearchComponent from "./SearchComponent"
import { FavouriteCoinsContext } from "./Home"

const CoinTable = () => {

    const itemsPerPage = 50;
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages] = useState(Math.ceil(2296 / itemsPerPage))

    const { favouriteCoins } = useContext(FavouriteCoinsContext)

    const [coins, setCoins] = useState({ data: [] })

    const [search, setSearch] = useState<string | null>("")
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [badSearch, setBadSearch] = useState<boolean>(false)
    const [searchCoin, setSearchCoin] = useState<boolean>(false)

    const [searchingCoins, setSearchingCoins] = useState<CoinType | null>(null)

    const [isFeatching, setIsFeatching] = useState<boolean>(false)

    const handlerSearch = async () => {

        if (search === "") {
            setSearchCoin(false)
            return
        } else {

            try {

                const coin = coins.data.filter((coin: CoinType) => coin.id === search.toLowerCase())

                if (coin.length === 0) {
                    if (!searchCoin) {
                        setIsSearch(false)
                    }
                    setSearch("")
                    setBadSearch(true)
                    setTimeout(() => setBadSearch(false), 3000)
                    return
                }

                const id = coin[0].id

                try {
                    const data = await methods.getCoin(id).then(res => res.data)
                    setSearchingCoins(data.data)
                    setSearchCoin(true)
                    setIsSearch(true)

                } catch (error) {
                    setBadSearch(true)
                    console.log(error)
                } finally {
                    setSearch("")
                }

            } catch (error) {
                setBadSearch(true)
                console.log(error)
            }
        }
    }

    const handlerClear = () => {
        setIsSearch(false)
        setSearchCoin(false)
    }

    const fetchCoins = async () => {

        try {
            setIsFeatching(true)
            const response = await methods.getCoins(currentPage, itemsPerPage);

            setCoins(response.data);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        } finally {
            setIsFeatching(false)
        }
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

    const sortByName = () => {
        const sortedCoins = coins.data.sort((a: CoinType, b: CoinType) => a.name.localeCompare(b.name))
        setCoins({ data: sortedCoins })
    }

    const handlePageChange = (event, page: number) => {
        console.log(event)
        setCurrentPage(page)
    }

    useEffect(() => {
        fetchCoins()
        window.scrollTo(0, 0);
    }, [currentPage])

    return (
        <Box>

            {
                isFeatching &&
                <Box sx={{
                    display: "flex", justifyContent: "center", alignItems: "center",
                    width: "100vw", height: "100vh", position: "absolute",
                    top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "999",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}>
                    <CircularProgress size={300} />
                </Box>

            }

            <Box sx={{ position: "relative" }}>
                {
                    badSearch && <Alert sx={{ margin: "20px 0", position: "absolute", top: "-80px", left: "50%", minHeight: "50px", minWidth: "320px", transform: "translate(-50%, 0)", zIndex: "999" }} severity="error">Coin not found</Alert>
                }

                <SearchComponent search={search} setSearch={setSearch} handlerSearch={handlerSearch} handlerClear={handlerClear} isSearch={isSearch} />

            </Box>


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">

                    <HeaderTable sortByChange={sortByChange} sortDefault={sortDefault} sortByPrice={sortByPrice} sortByName={sortByName} isSortByPrice={isSortByPrice} />

                    <TableBody>

                        {
                            searchCoin &&
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
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>

        </Box>
    )
}

export default CoinTable