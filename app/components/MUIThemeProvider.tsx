"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { alpha, createTheme, ThemeProvider } from "@mui/material/styles";
import type { } from "@mui/x-data-grid/themeAugmentation";
import { useEffect, useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0170B9", // Blue primary (current brand)
      light: "#03A9F4",
      dark: "#01579B",
    },
    secondary: {
      main: "#0288D1", // Complementary light blue
      light: "#4FC3F7",
      dark: "#0277BD",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#f3f4f6", // Warna header
            fontWeight: 500,
            fontSize: 14,
          },
          "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell": {
            padding: "0px 15px",
          },
          "& .MuiDataGrid-cell": {
            fontSize: 13,
            fontWeight: 400,
          },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "#f9fafb",
            "&:hover": {
              backgroundColor: "#e5e7eb",
            },
          },

          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: "#ffffff",
            "&:hover": {
              backgroundColor: "#e5e7eb",
            },
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-root": {
            color: alpha("#000000", 0.87),
            backgroundColor: "#f3f4f6",
          },
        },
      },
    },
    // MuiTableBody: {
    //   styleOverrides: {
    //     root: {
    //       "& .MuiTableRow-root:nth-of-type(even)": {
    //         backgroundColor: "#f9fafb",
    //         "&:hover": {
    //           backgroundColor: "#e5e7eb",
    //         },
    //       },
    //       "& .MuiTableRow-root:nth-of-type(odd)": {
    //         backgroundColor: "#ffffff",
    //         "&:hover": {
    //           backgroundColor: "#e5e7eb",
    //         },
    //       },
    //     },
    //   },
    // },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          border: "1px solid #e5e7eb", // Border hanya di luar
          // borderRadius: "5px", // Rounded corners
          // overflow: "hidden", // Agar border-radius tidak terpotong
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        // root: {
        //   paddingLeft: 0,
        //   fontSize: 13,
        // },
        head: {
          fontWeight: 600,
        },
      },
    },
  }
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
      <ToastContainer position="top-right"
       autoClose={2000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick={false}
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="colored"
       transition={Bounce} />
    </ThemeProvider>
  );
}

