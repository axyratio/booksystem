import { Container } from "@mui/material"
import { Outlet } from "react-router-dom"
import Home from "../view/Home"

const HomeLayout = () => {
    return (
        <>
        <Container
            maxWidth="xl"
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                py: 0
            }}
        >
             <Home />
            <Outlet />
        </Container>
           
        </>
    )
}

export default HomeLayout