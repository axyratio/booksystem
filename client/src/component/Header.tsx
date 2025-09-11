import { Box } from "@mui/material";
import CircleProfile from "./CircleProfile";
import Search from "./Search";

const Header = () => {

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap : 2
            }}
        >
            <Search/>
            <CircleProfile />
        </Box>
   
    )
}

export default Header