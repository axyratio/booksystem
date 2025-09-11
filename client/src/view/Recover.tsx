// File: src/pages/Recover.tsx
import type { Margin } from "@mui/icons-material";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

type FieldErrors = Partial<Record<"otp", string>>;

const Recover = () => (
  <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
    <Box sx={{ width: "100%" }}>
      <Stack alignItems="center" spacing={3}>
        <Typography variant="h4">Recover Password</Typography>
        <Paper elevation={3} sx={{ p: 4, width: 420, maxWidth: "95vw" }}>
          <Stack
            spacing={2}
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <TextField label="Email" type="email" fullWidth required />
            <Button type="submit" variant="contained" size="large">
              Send reset link
            </Button>
            <Button component={RouterLink} to="/recover/otp" variant="text">
              Back to sign in
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  </Box>
);


const RecoverConfirmOtp = () => {
  const [otp, setOtp] = useState<string>("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOtp(value);
    // Clear the error for the 'otp' field when the user starts typing again
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // This is crucial to prevent the default form submission behavior (page reload)
    
    // Simple validation
    if (!otp) {
      setErrors({ otp: "OTP is required" });
      console.log(errors.otp)
      return;
    }

    try {
      console.log(otp);
      // Here you would typically make your API call
      // Example: await yourApiCall(otp);
      
      // Handle success case
      setErrors({otp : "OTP Invalid"});
    } catch (error: any) {
      // Set a generic or specific error message from the API response
      setErrors({ otp: error.response?.data?.message || "An unknown error occurred." });
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%" }}>
        <Stack alignItems="center" spacing={3}>
          <Typography variant="h4">Recover Password</Typography>
          <Paper elevation={3} sx={{ p: 4, width: 420, maxWidth: "95vw" }}>
            <Stack
              spacing={2}
              component="form"
              onSubmit={handleSubmit} // 🎯 This is the fix! Attach the handler to the form.
            >
              <TextField
                label="OTP"
                type="text"
                name="otp"
                onChange={handleChange}
                value={otp}
                error={Boolean(errors.otp)}
                helperText={errors.otp}
                fullWidth
                required
              />
              <Button
                sx={{ py: 2 }}
                type="submit" // 🎯 This is correct. It triggers the form's onSubmit.
                variant="contained"
                size="large"
              >
                Confirm
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
};

export { Recover, RecoverConfirmOtp };
