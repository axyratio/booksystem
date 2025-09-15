// src/theme.ts
import { createTheme } from "@mui/material";
import '@mui/material/styles';

declare module '@mui/material/styles' {
  export interface Palette {
    cards: {
      [key: string]: {
        bg: string;        // พื้นหลัง (รับ linear-gradient ได้)
        bgHover?: string;  // พื้นหลังตอน hover
        text: string;      // สีตัวอักษรบนการ์ด
        muted?: string;    // สีข้อความรอง/ดาว
        chipBg?: string;   // สีป้าย/ชิป
        chipText?: string; // สีตัวอักษรในชิป
        btnBg?: string;    // สีปุ่มในการ์ด
        btnText?: string;  // สีข้อความปุ่ม
        border?: string;   // เส้นขอบ (ถ้ามี)
      };
    };
  }

  interface PaletteOptions {
    cards?: Palette['cards'];
  }
}


const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#3f50b5", contrastText: "#fff", },
    secondary: { main: "#5651AB", contrastText: "#ffffff" },
    background: { default: "#ffffff" },
    text: { primary: "#464646", secondary: "#616161", disabled: "#9e9e9e"},
    error: { main: "#f44336", contrastText: "#fff" },
    info: { main: "#5651AB", contrastText: "#fff" },
    success: { main: "#5651AB", contrastText: "#fff" },

    

    // ชุดสีสำหรับการ์ดหลาย ๆ แบบ
    cards: {
      sky: {
        bg: "linear-gradient(135deg, #B3E5FC 0%, #81D4FA 50%, #64B5F6 100%)",
        bgHover: "linear-gradient(135deg, #A5DDFB 0%, #77CCF7 50%, #5EAEF3 100%)",
        text: "#ffffff",
        muted: "rgba(11,42,74,.7)",
        chipBg: "rgba(255,255,255,.6)",
        chipText: "#0b2a4a",
        btnBg: "rgba(255,255,255,.85)",
        btnText: "#0b2a4a",
      },
      purple: {
        bg: "linear-gradient(135deg, #C3B7FF 0%, #A78BFA 50%, #7C4DFF 100%)",
        bgHover: "linear-gradient(135deg, #B9ACFF 0%, #9E83F8 50%, #7447F1 100%)",
        text: "#1c0e3a",
        muted: "rgba(28,14,58,.7)",
        chipBg: "rgba(255,255,255,.65)",
        chipText: "#1c0e3a",
        btnBg: "rgba(255,255,255,.9)",
        btnText: "#1c0e3a",
      },
      pink: {
        bg: "linear-gradient(135deg, #FFC1E3 0%, #FF9EC4 50%, #FF6FA8 100%)",
        bgHover: "linear-gradient(135deg, #FFB6DB 0%, #FF93BC 50%, #F7649D 100%)",
        text: "#4a0b24",
        muted: "rgba(74,11,36,.75)",
        chipBg: "rgba(255,255,255,.65)",
        chipText: "#4a0b24",
        btnBg: "rgba(255,255,255,.9)",
        btnText: "#4a0b24",
      },
      mint: {
        bg: "linear-gradient(135deg, #B2F5EA 0%, #81E6D9 50%, #4FD1C5 100%)",
        bgHover: "linear-gradient(135deg, #A8EFE4 0%, #77DFD2 50%, #48C8BD 100%)",
        text: "#083a34",
        muted: "rgba(8,58,52,.75)",
        chipBg: "rgba(255,255,255,.65)",
        chipText: "#083a34",
        btnBg: "rgba(255,255,255,.9)",
        btnText: "#083a34",
      },
      orange: {
        bg: "linear-gradient(135deg, #FFD8B2 0%, #FFB74D 50%, #FF9800 100%)",
        bgHover: "linear-gradient(135deg, #FECF9F 0%, #F5AB45 50%, #F08F00 100%)",
        text: "#3a2108",
        muted: "rgba(58,33,8,.75)",
        chipBg: "rgba(255,255,255,.7)",
        chipText: "#3a2108",
        btnBg: "rgba(255,255,255,.92)",
        btnText: "#3a2108",
      },
    },
  },

  

  shape: { borderRadius: 16 },
  typography: {
    fontFamily: [
      "Inter","-apple-system","BlinkMacSystemFont","Segoe UI","Roboto",
      "Helvetica Neue","Arial","Noto Sans","Apple Color Emoji","Segoe UI Emoji",
    ].join(","),
    h3: { fontWeight: 800 },
  },
});

export default theme;
