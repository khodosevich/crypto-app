import { Box, Button, TextField } from "@mui/material"

const SearchComponent = ({ search, setSearch, handlerSearch, handlerClear, isSearch }) => {

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                alignItems: "center",
                margin:"35px 0",

                "@media (max-width: 800px)"
                : { flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }
            }}>
            <TextField
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                    width: "30%",
                    minWidth: "300px",
                    height: "50px",
                    backgroundColor: "white",
                    borderRadius: "5px"
                }}
                label="Search"
                variant="outlined"
            />
            <Button
                onClick={handlerSearch}
                variant="contained"
                sx={{
                    minWidth: "150px",
                    width: "10%",
                    height: "50px",
                    borderRadius: "5px",
                    color: "white"
                }}>
                Search
            </Button>

            <Button
                onClick={handlerClear}
                variant="contained"
                color="error"
                disabled={!isSearch}
                sx={{
                    minWidth: "150px",
                    width: "10%",
                    height: "50px",
                    borderRadius: "5px",
                    color: "white"
                }}
                >
                Clear
            </Button>
        </Box>
    )
}

export default SearchComponent