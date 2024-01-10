import { Box, Container, CssBaseline } from "@mui/material";
import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import CoinTable from "./CoinTable";
import Coin from "./Coin";
import Header from "./Header";

const Home = () => {
    return (
        <Fragment>
                <Box>
                    <Container>
                        <CssBaseline />

                        <Header />

                        <Routes>
                            <Route path="/table/*" element={<CoinTable />} />
                            <Route path="/table/:id" element={<Coin />} />
                        </Routes>
                
                    </Container>
                </Box>
        </Fragment>
    );
};

export default Home;