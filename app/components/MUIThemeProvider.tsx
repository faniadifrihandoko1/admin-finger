"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useEffect } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32", // Green primary
      light: "#4caf50",
      dark: "#1b5e20",
    },
    secondary: {
      main: "#66bb6a", // Light green secondary
      light: "#81c784",
      dark: "#388e3c",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function MUIThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div
        style={{
          visibility: "hidden",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
