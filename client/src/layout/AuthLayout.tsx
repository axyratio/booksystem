import { Box, Container } from "@mui/material";
import auth_bg from "../assets/background/auth_background.svg";
import AuthCard from "../component/AuthCard";
  


const AuthLayout = () => (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      // ใช้ layered backgrounds: [overlay], [image]
      backgroundImage: `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url(${auth_bg})`,
      // ถ้าอยากให้มืดลงแทน ให้ใช้ rgba(0,0,0,0.35)
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundColor: "#f5f5f5",
    }}
  >
    <Container maxWidth="sm">
      <AuthCard />
    </Container>
  </Box>
);


export default AuthLayout;