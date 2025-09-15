import { Box, Container } from "@mui/material"
import Profile from "../view/Profile"


const ProfileLayout = () => {
    return (
        <Box
            sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            px: 6,
            }}
        >
            <Profile />
        </Box>
    )
}

export default ProfileLayout