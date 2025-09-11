import { Box } from "@mui/material";
import { Recover, RecoverConfirmOtp }  from "../view/Recover.jsx"

const RecoverLayout = () => {
    return (
        <>
            <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}} >
                <Recover />
            </Box>
        </>
    )
}

const RecoverConfirmOtpLayout = () => {
    return (
        <>
            <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}} >
                <RecoverConfirmOtp />
            </Box>
        </>
    )
}

export { RecoverLayout as Recover, RecoverConfirmOtpLayout as RecoverConfirmOtp }