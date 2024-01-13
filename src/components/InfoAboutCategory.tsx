import { useState } from "react";
import { Box, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

const InfoAboutCategory = ({ title, value, info }) => {

    const [isBoxVisible, setIsBoxVisible] = useState<boolean>(false);
    console.log(value)

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Box sx={{ position: "relative", display: "flex", alignItems: "center", gap: "10px" }}>
               
                <Typography sx={{display: "flex", alignItems: "center", gap: "4px"}}>{title}: {
                    value === null ? <AllInclusiveIcon/> :
                        new Intl.NumberFormat('en-US',
                        { style: 'currency', currency: 'USD', })
                        .format(value)}
                    
                </Typography>

                <InfoIcon
                    sx={{ color: "#A6B0C3" }}
                    onMouseEnter={() => setIsBoxVisible(true)}
                    onMouseLeave={() => setIsBoxVisible(false)}
                />

                {isBoxVisible && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "white",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            position: "absolute",
                            top: "100%",
                            left: "0",
                            zIndex: 1,
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                            width:"250px",
                        }}
                    >
                        <Typography sx={{padding:"4px"}} variant="body1">
                            {info}
                        </Typography>
                    </Box>
                )}
            </Box>


        </Box>
    )
}

export default InfoAboutCategory