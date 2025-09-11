import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type FieldErrors = Partial<{ otp: string; email: string }>;

const Verify: React.FC = () => {
  const email = sessionStorage.getItem("email") || ""; // ยังไม่ได้ลบหลัง process เสร็จ และ useState
  const navigate = useNavigate(); // ✅ ประกาศ hook ที่นี่

  const [otp, setOtp] = useState<string>("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "otp") setOtp(value);
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        email: email,
        otp_code: otp,
      };

      await axios.post("http://localhost:3000/api/auth/verify-email", payload);

      // ✅ redirect หลังสำเร็จ
      navigate("/registration");
    } catch (err: any) {
      console.error(err.response?.data || err.message);

      const serverErrors = err?.response?.data?.errors ?? {};
      const normalized: FieldErrors = {};

      if (typeof serverErrors === "object" && serverErrors !== null) {
        if (serverErrors.otp) normalized.otp = String(serverErrors.otp);
        if (serverErrors.otp_code) normalized.otp = String(serverErrors.otp_code);
        if (serverErrors.email) normalized.email = String(serverErrors.email);
      }

      const message = err?.response?.data?.message;
      if (!normalized.otp && typeof message === "string") {
        normalized.otp = message;
      }

      setErrors((prev) => ({ ...prev, ...normalized }));
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length) {
      console.log("errors updated:", errors);
    }
  }, [errors]);

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 4, width: 420, maxWidth: "95vw" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
            gap: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Verify Email
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
            gap: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Please check your email {email} to verify your account.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
            gap: 1,
            width: "100%",
          }}
        >
          <TextField
            label="OTP"
            type="text"
            name="otp"
            value={otp}
            onChange={handleChange}
            error={Boolean(errors.otp)}
            helperText={errors.otp || ""}
            fullWidth
            required
          />
        </Box>

        <Button
          onClick={handleSubmit}
          type="button"
          variant="contained"
          size="large"
          sx={{ py: 2 }}
          fullWidth
        >
          Verify
        </Button>
      </Paper>
    </Box>
  );
};

export default Verify;
