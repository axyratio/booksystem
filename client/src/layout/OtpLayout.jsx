import { Box } from "@mui/material"
import Verify from "../view/Verify.jsx"

const OtpLayout = () => {
    return (
        <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}} >
            <Verify />
        </Box>
    )
}

export default OtpLayout