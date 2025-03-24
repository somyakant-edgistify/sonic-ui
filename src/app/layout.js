"use client"; 

import "./globals.css";
import ToastNotification from "@/components/Toast";
import { Inter } from "next/font/google";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '"Inter", sans-serif',
        },
      },
    },
  },
});

export default function RootLayoutClient({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastNotification />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
