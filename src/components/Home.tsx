import { createContext, useState, Dispatch, SetStateAction } from "react";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { Fragment } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import CoinTable from "./CoinTable";
import Coin from "./CoinPage";
import Header from "./Header";
import Wallet from "./Wallet";


interface FavouriteCoinsContextType {
    favouriteCoins: string[];
    setFavouriteCoins: Dispatch<SetStateAction<string[]>>;
    addToFavourites: (id: string) => void;
}

export const FavouriteCoinsContext = createContext<FavouriteCoinsContextType | undefined>(undefined);

const Home = () => {

    const [favouriteCoins, setFavouriteCoins] = useState<string[]>([
        "bitcoin",
        "ethereum",
        "polkadot"
    ]);

    const addToFavourites = (id: string) => {
        setFavouriteCoins((prevFavourites) => {
            if (prevFavourites.includes(id)) {
                return prevFavourites.filter((coinId) => coinId !== id);
            } else {
                return [...prevFavourites, id];
            }
        });
    };

    const location = useLocation();
    const renderText = location.pathname === "/";

    return (
        <Fragment>
            <Box>
                <Container>
                    <CssBaseline />

                    <Header />

                    {
                        renderText &&
                        <Box textAlign="center" my={8}>
                            <Typography variant="h4" gutterBottom>
                                Добро пожаловать в CryptoTracker!
                            </Typography>
                            <Typography variant="body1" paragraph>
                                CryptoTracker - это удобное веб-приложение для отслеживания и анализа данных о криптовалютах.
                            </Typography>

                            <Typography variant="h5" gutterBottom>
                                Основные возможности:
                            </Typography>
                            <Typography variant="body1" paragraph>
                                - Простой и интуитивно понятный интерфейс.
                            </Typography>
                            <Typography variant="body1" paragraph>
                                - Моментальный обзор актуальных данных о криптовалютах.
                            </Typography>
                            <Typography variant="body1" paragraph>
                                - Поиск монеты по имени и просмотр данных о конкретной монете.
                            </Typography>
                            <Typography variant="body1" paragraph>
                                - Управление избранными монетами и создание персонального портфеля.
                            </Typography>
                            <Typography variant="body1" paragraph>
                                - Доступны сортировки по цене(Price), по имени(Name), по рейтингу(Rank), по изменению(Change).
                            </Typography>
                        </Box>
                    }

                    <FavouriteCoinsContext.Provider value={{ favouriteCoins, setFavouriteCoins, addToFavourites }}>
                        <Routes>
                            <Route path="/table/*" element={<CoinTable />} />
                            <Route path="/table/:id" element={<Coin />} />
                            <Route path="/wallet" element={<Wallet />} />
                        </Routes>
                    </FavouriteCoinsContext.Provider>

                </Container>
            </Box>
        </Fragment>
    );
};

export default Home;