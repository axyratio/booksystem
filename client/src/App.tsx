import { Navigate, Route, Routes } from "react-router-dom";
import RequireAuth from "./component/RequireAuth.js";
import AuthLayout from "./layout/AuthLayout.tsx";
import Home from "./layout/HomeLayout.tsx";
import VerifyLayout from "./layout/OtpLayout";
import { Recover, RecoverConfirmOtp } from "./layout/RecoverLayout.jsx";
import Profile from "./view/Profile.tsx";


const App = () => {
   
  return (
<Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route path="/profile" element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        } 
      />
      <Route path="/registration" element={<AuthLayout />} />
      <Route path="/verify" element={<VerifyLayout />} />
      <Route path="/recover" element={<Recover />} />
      <Route path="/recover/otp" element={<RecoverConfirmOtp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
  
};

export default App;