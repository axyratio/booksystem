const axios = require("axios").default;

// 🔧 Config
const BASE_URL = "http://localhost:3000";
const MAIN_PATH = "/api/auth";

// 📦 จำลองข้อมูลผู้ใช้
const testUser = {
  email: "john.doe123@example.com", // ต้องตรงกับที่มีในระบบ
  username: "johnny12345",
  password: "NewPass@2024",
  new_password: "NewPass@2024",
  updated_name: "Jonathan",
  updated_username: "johnupdated"
};

let accessToken = "";
const cookieJar = {};

(async () => {
  try {
    // 1. ✅ LOGIN
    console.log("▶ Logging in...");
    const loginRes = await axios.post(`${BASE_URL}${MAIN_PATH}/login`, {
      username: testUser.username,
      password: testUser.password,
    }, {
      withCredentials: true,
    });

    const cookies = loginRes.headers["set-cookie"];
    if (cookies) {
      cookieJar.cookie = cookies.map((c) => c.split(";")[0]).join("; ");
    }

    
    accessToken = loginRes.data.token || "";
    console.log("✅ Logged in");
    console.log("access token", accessToken)

  

    // 4. ✅ EDIT PROFILE
    // console.log("▶ Editing profile...");
    // await axios.patch(`${BASE_URL}${MAIN_PATH}/edit-profile`, {
    //   firstname: testUser.updated_name,
    //   username: testUser.updated_username,
    // }, {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //     "Content-Type": "application/json"
    //   }
    // });
    // console.log("✅ Profile updated");

    // // 5. ✅ LOGOUT
    // console.log("▶ Logging out...");
    // await axios.post(`${BASE_URL}${MAIN_PATH}/logout`, {}, {
    //   headers: {
    //     Cookie: cookieJar.cookie
    //   }
    // });
    // console.log("✅ Logged out");

    // 6. ✅ DELETE ACCOUNT
    console.log("▶ Deleting account...");
   console.log("▶ Deleting account...");
const res = await axios.delete(`${BASE_URL}${MAIN_PATH}/delete`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
  data: {
    password: testUser.password
  }
});

console.log("✅ Account deleted");
console.log("📥 Response:", res.data);


  } catch (err) {
    const errorRes = err.response?.data || {};
    console.error("❌ Error:", errorRes.message || err.message);
    if (errorRes.errors) {
      console.error("📋 Details:", errorRes.errors);
    }
  }
})();
