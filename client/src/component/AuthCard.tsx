// เพิ่ม import
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Backdrop, Box,
  Button, CircularProgress, Container,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Paper,
  TextField,
  Typography
} from "@mui/material"; // NEW
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type FieldErrors = Partial<Record<
  "firstname" | "lastname" | "username" | "email" | "password" | "confirmPassword" | "error",
  string
>>;
const AuthCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});

  // เพิ่ม state
  const [loading, setLoading] = useState(false); // NEW


  const [showPwd, setShowPwd] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const navigator = useNavigate();

  const handleToggle = (newMode: "signin" | "signup") => {
    setMode(newMode);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({});
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
    if (name === "firstname") setFirstName(value);
    if (name === "lastname") setLastName(value);
    if (name === "username") setUsername(value);

    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  // --- handleSubmit: แยก payload ให้ตรงกับ backend ---
  // แก้ handleSubmit แบบเพิ่ม setLoading ครอบ try/finally
  const handleSubmit = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    if (loading) return;              // NEW: กันกดซ้ำ
    setLoading(true);                 // NEW

    try {
      console.log("Submit form:", { email, password });

      if (mode === "signin") {
        const newErrors: FieldErrors = {};
        if (!email) newErrors.email = "No email";
        if (!password) newErrors.password = "No password";
        if (Object.keys(newErrors).length > 0) {
          newErrors.error = "You must fill in all the fields";
          setErrors(newErrors);
          return;
        }

        setErrors({});
        const res = await axios.post("http://localhost:3000/api/auth/login", { email, password }, { withCredentials: true });
        // console.log(res.data)
        // sessionStorage.setItem("token", res.data.token);
        navigator("/", { replace: true });
        return;
      } else if (mode === "signup") {
        console.log("issubmit")
        const newErrors: FieldErrors = {};
        if (!firstname) newErrors.firstname = "No firstname";
        if (!lastname) newErrors.lastname = "No lastname";
        if (!username) newErrors.username = "No username";
        if (!email) newErrors.email = "No email";
        if (!password) newErrors.password = "No password";
        if (!confirmPassword) newErrors.confirmPassword = "No confirm password";
        if (Object.keys(newErrors).length > 0) {
          newErrors.error = "You must fill in all the fields";
          setErrors(newErrors);
          return;
        }

        setErrors({});
        console.log("Submit form:", { firstname, lastname, username, email, password });

        if (!firstname || !lastname || !username || !email || !password) {
          setErrors({ error: "You must fill in all the fields" });
          return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setErrors({ error: "Invalid format email" });
          return;
        }
        if (password !== confirmPassword) {
          setErrors({ error: "Password and confirm password do not match" });
          return;
        }

        const payload = { firstname, lastname, username, email, password };
        const res = await axios.post("http://localhost:3000/api/auth/register", payload);

        console.log(res.data, "sssssssssssssssssss====");
        console.log("Register success:", res.data);
        console.log(res.status);

        if (res.status === 200 || res.status === 201) {
          sessionStorage.setItem("email", email);
          navigator("/verify", { replace: true });
          return;
        }
        navigator("/registration");
      }
    } catch (err: any) {
      console.log(err);
      console.error(err.response?.data || err.message);
      setErrors((prev) => ({
        ...prev,
        error: err.response?.data?.message,
        password: Array.isArray(err.response?.data?.errors)
          ? err.response.data.errors.join("\n")
          : err.response?.data?.errors || "",
      }));
      if (err.status == 500) {
        alert(err.response?.data?.message);
      }
    } finally {
      setLoading(false);              // NEW: ปิดโหลดทุกกรณี
    }
  };


  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 480,
          mx: "auto",
          gap: 6,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* toggle signin/signup */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
          sx={{ opacity: 1 }}
        >
          {mode === "signin" ? (
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              Sign In
            </Typography>
          ) : (
            <Button variant="outlined" onClick={() => handleToggle("signin")}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 700, textTransform: "none" }}
              >
                Sign In
              </Typography>
            </Button>
          )}

          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Or
          </Typography>

          {mode === "signup" ? (
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              Sign Up
            </Typography>
          ) : (
            <Button variant="outlined" onClick={() => handleToggle("signup")}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 700, textTransform: "none" }}
              >
                Sign Up
              </Typography>
            </Button>
          )}
        </Box>

        {/* form */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="end"
          gap={2}
          // เพิ่มการซีดและบล็อกคลิกตอนโหลด
          sx={{
            opacity: loading ? 0.6 : 1,
            pointerEvents: loading ? "none" : "auto",
          }}
        >
          {mode === "signin" && (
            <>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={email}
                fullWidth
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <TextField
                label="Password"
                name="password"
                value={password}
                type={showPwd ? "text" : "password"}
                error={Boolean(errors.password)}
                helperText={
                  Array.isArray(errors.password)
                    ? (
                      <ul style={{ margin: 0, paddingLeft: 16 }}>
                        {errors.password.map((e, i) => <li key={i}>{e}</li>)}
                      </ul>
                    )
                    : (errors.password)
                }
                fullWidth
                onChange={handleChange}
                InputProps={{
                  endAdornment: password.length > 0 && (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPwd(p => !p)} edge="end">
                        {showPwd ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errors.error && (
                <Typography variant="body2" sx={{ fontWeight: 300, color: "red" }}>
                  {typeof errors.error === "string" ? errors.error : ""}
                </Typography>
              )}

              <MuiLink component={Link} to="/recover" underline="hover" sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
                Forgot password?
              </MuiLink>
            </>
          )}
          {mode == "signup" && (
            <>
              <TextField
                label="First Name"
                fullWidth
                name="firstname"
                type="text"
                value={firstname}
                onChange={handleChange}
                error={Boolean(errors.firstname)}
                helperText={errors.firstname}
              />

              <TextField
                label="Last Name"
                fullWidth
                name="lastname"
                type="text"
                value={lastname}
                onChange={handleChange}
                error={Boolean(errors.lastname)}
                helperText={errors.lastname}
              />

              <TextField
                label="Username"
                fullWidth
                name="username"
                value={username}
                onChange={handleChange}
                error={Boolean(errors.username)}
                helperText={errors.username}
              />

              <TextField
                label="Email"
                fullWidth
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />

              <TextField
                label="Password"
                fullWidth
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={
                  Array.isArray(errors.password)
                    ? (
                      <ul style={{ margin: 0, paddingLeft: "16px" }}>
                        {errors.password.map((e: string, i: number) => (
                          <li key={i}>{e}</li>
                        ))}
                      </ul>
                    )
                    : errors.password
                }
              />

              <TextField
                label="Confirm Password"
                fullWidth
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleChange}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
              />
              <Typography variant="body2" sx={{ fontWeight: 300, color: "red" }}>{errors.error}</Typography>
            </>

          )}

        </Box>
        {mode === "signin" ? (
          
            <Button
              component="button"
              sx={{ py: 2 }}
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={loading}               // NEW
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          
        ) : (
          <Button
              component="button"
              sx={{ py: 2 }}
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={loading}               // NEW
            >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        )}

        <Backdrop open={loading} sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
          <CircularProgress />
        </Backdrop>

      </Paper>
    </Container>
  );
};

export default AuthCard;

