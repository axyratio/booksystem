const axios = require("axios").default;

const BASE_URL = "http://localhost:3000"; // เปลี่ยนให้ตรงกับ API ของคุณ
const MAIN_PATH = "/api/auth";

const testUser = {
  firstname: "John",
  lastname: "Doe",
  email: "john.doe123@example.com",
  username: "johnny12345",
  password: "StrongPass@123",
  new_password: "NewPass@2024",
};

let accessToken = "";
const cookieJar = {};

(async () => {
  try {
    // 1. REGISTER
    console.log("▶ Register...");
    await axios.post(`${BASE_URL}${MAIN_PATH}/register`, {
      firstname: testUser.firstname,
      lastname: testUser.lastname,
      email: testUser.email,
      username: testUser.username,
      password: testUser.password,
    });
    console.log("✅ Registered successfully");

    // 2. LOGIN
    console.log("▶ Login...");
    const loginRes = await axios.post(
      `${BASE_URL}${MAIN_PATH}/login`,
      {
        username: testUser.username,
        password: testUser.password,
      },
      { withCredentials: true }
    );

    const cookies = loginRes.headers["set-cookie"];
    if (cookies) {
      cookieJar.cookie = cookies.map((c) => c.split(";")[0]).join("; ");
    }

    accessToken = loginRes.data.token || "";
    console.log("✅ Logged in");

    // 3. CHANGE PASSWORD
    console.log("▶ Change Password...");
    await axios.patch(`${BASE_URL}${MAIN_PATH}/change-password`, {
      username: testUser.username,
      new_password: testUser.new_password,
    });
    console.log("✅ Password changed");

    // 4. REFRESH TOKEN
    console.log("▶ Refresh Token...");
    await axios.post(
      `${BASE_URL}${MAIN_PATH}/refresh`,
      {},
      {
        headers: {
          Cookie: cookieJar.cookie,
        },
      }
    );
    console.log("✅ Token refreshed");

    // 5. EDIT PROFILE
    console.log("▶ Edit Profile...");
    await axios.patch(
      `${BASE_URL}${MAIN_PATH}/edit-profile`,
      {
        firstname: "Jonathan",
        username: "johnupdated",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ Profile updated");

    // 6. LOGOUT
    console.log("▶ Logout...");
    await axios.post(
      `${BASE_URL}${MAIN_PATH}/logout`,
      {},
      {
        headers: {
          Cookie: cookieJar.cookie,
        },
      }
    );
    console.log("✅ Logged out successfully");

    // 7. DELETE ACCOUNT
    console.log("▶ Delete Account...");
    await axios.delete(`${BASE_URL}${MAIN_PATH}/delete`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: {
        password: testUser.new_password, // ใช้รหัสผ่านใหม่หลังเปลี่ยน
      },
    });
    console.log("✅ Account deleted");

  } catch (err) {
    console.error("❌ Error:", err.response?.data || err.message);
  }
})();
