import { Box, Button, TextField } from "@mui/material"

const SearchComponent = ({ search, setSearch, handlerSearch, setIsSearch }) => {

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                alignItems: "center",
                mb: 2
            }}>
            <TextField
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                    width: "30%",
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
                    width: "10%",
                    height: "50px",
                    borderRadius: "5px",
                    color: "white"
                }}>

                Search
            </Button>

            <Button
                onClick={() => setIsSearch(false)}
                variant="contained"
                color="error"
                sx={{
                    width: "10%",
                    height: "50px",
                    borderRadius: "5px",

                    color: "white"
                }}>
                Cancel
            </Button>
        </Box>
    )
}

export default SearchComponent