"use client";

import ClientOnly from "@/app/components/ClientOnly";
import {
  Fingerprint,
  Login as LoginIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CardContent,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const LoginView = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulasi login (ganti dengan logic authentication yang sesungguhnya)
    setTimeout(() => {
      if (formData.username === "admin" && formData.password === "admin123") {
        // Only run on client side
        if (typeof window !== "undefined") {
          // Set cookies for authentication
          document.cookie = "isAuthenticated=true; path=/; max-age=86400"; // 24 hours
          document.cookie = "userRole=admin; path=/; max-age=86400"; // 24 hours

          // Also set localStorage for client-side use
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userRole", "admin");
        }

        router.push("/dashboard");
      } else {
        setError("Username atau password salah");
      }
      setLoading(false);
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `
          radial-gradient(circle at 20% 80%, rgba(1, 112, 185, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(1, 112, 185, 0.06) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(1, 112, 185, 0.04) 0%, transparent 50%),
          linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f1f3f4 100%)
        `,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(45deg, transparent 30%, rgba(1, 112, 185, 0.02) 30%, rgba(1, 112, 185, 0.02) 70%, transparent 70%),
            linear-gradient(-45deg, transparent 30%, rgba(1, 112, 185, 0.015) 30%, rgba(1, 112, 185, 0.015) 70%, transparent 70%)
          `,
          backgroundSize: "60px 60px",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "300px",
          height: "300px",
          background:
            "linear-gradient(135deg, rgba(1, 112, 185, 0.08) 0%, rgba(1, 112, 185, 0.04) 100%)",
          borderRadius: "50%",
          filter: "blur(40px)",
        },
      }}
    >
      {/* Floating geometric shapes */}
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          right: "15%",
          width: "120px",
          height: "120px",
          background:
            "linear-gradient(135deg, rgba(1, 112, 185, 0.08) 0%, rgba(1, 112, 185, 0.04) 100%)",
          borderRadius: "20px",
          transform: "rotate(45deg)",
          filter: "blur(1px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "20%",
          left: "20%",
          width: "80px",
          height: "80px",
          background:
            "linear-gradient(135deg, rgba(1, 112, 185, 0.06) 0%, rgba(1, 112, 185, 0.03) 100%)",
          borderRadius: "50%",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "60%",
          right: "25%",
          width: "60px",
          height: "60px",
          background:
            "linear-gradient(135deg, rgba(1, 112, 185, 0.08) 0%, rgba(1, 112, 185, 0.04) 100%)",
          borderRadius: "8px",
          transform: "rotate(30deg)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "100px",
          height: "100px",
          background:
            "linear-gradient(135deg, rgba(1, 112, 185, 0.06) 0%, rgba(1, 112, 185, 0.02) 100%)",
          borderRadius: "30px",
          transform: "rotate(-30deg)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "25%",
          left: "5%",
          width: "40px",
          height: "40px",
          background:
            "linear-gradient(135deg, rgba(1, 112, 185, 0.08) 0%, rgba(1, 112, 185, 0.04) 100%)",
          borderRadius: "50%",
        }}
      />
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Paper
          elevation={24}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: `
              0 20px 40px rgba(0, 0, 0, 0.1),
              0 0 0 1px rgba(255, 255, 255, 0.05),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `,
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
              borderRadius: "inherit",
              pointerEvents: "none",
            },
          }}
        >
          <Box
            sx={{
              background:
                "linear-gradient(135deg, #0170B9 0%, #0288D1 50%, #03A9F4 100%)",
              padding: 4,
              textAlign: "center",
              color: "white",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `
                  radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
                `,
                pointerEvents: "none",
              },
            }}
          >
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Fingerprint
                sx={{
                  fontSize: 56,
                  mb: 2,
                  filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))",
                }}
              />
              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                sx={{
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  mb: 1,
                }}
              >
                Admin Fingerprint
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  opacity: 0.95,
                  textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
                }}
              >
                Sistem Manajemen Fingerprint
              </Typography>
            </Box>
          </Box>

          <CardContent sx={{ p: 5, position: "relative", zIndex: 1 }}>
            {/* <Typography
              variant="h5"
              component="h2"
              gutterBottom
              textAlign="center"
              mb={4}
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                background: 'linear-gradient(135deg, #0170B9 0%, #0288D1 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Masuk ke Dashboard
            </Typography> */}

            <ClientOnly
              fallback={
                <Box component="form">
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    margin="normal"
                    required
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(1, 112, 185, 0.15)",
                        transition: "all 0.3s ease",
                        // Neutralize browser autofill background
                        "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active": {
                          WebkitTextFillColor: "inherit",
                          WebkitBoxShadow: "0 0 0px 1000px transparent inset",
                          transition: "background-color 9999s ease-out 0s",
                          caretColor: "inherit",
                        },
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 1)",
                          border: "1px solid rgba(1, 112, 185, 0.25)",
                        },
                        "&.Mui-focused": {
                          backgroundColor: "rgba(255, 255, 255, 1)",
                          border: "2px solid #0170B9",
                          boxShadow: "0 0 0 2px rgba(1, 112, 185, 0.15)",
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "text.secondary",
                        fontWeight: 500,
                        "&.Mui-focused": {
                          color: "#0170B9",
                          fontWeight: 600,
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    margin="normal"
                    required
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(1, 112, 185, 0.15)",
                        transition: "all 0.3s ease",
                        // Neutralize browser autofill background
                        "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active": {
                          WebkitTextFillColor: "inherit",
                          WebkitBoxShadow: "0 0 0px 1000px transparent inset",
                          transition: "background-color 9999s ease-out 0s",
                          caretColor: "inherit",
                        },
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 1)",
                          border: "1px solid rgba(1, 112, 185, 0.25)",
                        },
                        "&.Mui-focused": {
                          backgroundColor: "rgba(255, 255, 255, 1)",
                          border: "2px solid #0170B9",
                          boxShadow: "0 0 0 2px rgba(1, 112, 185, 0.15)",
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "text.secondary",
                        fontWeight: 500,
                        "&.Mui-focused": {
                          color: "#0170B9",
                          fontWeight: 600,
                        },
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                      mt: 4,
                      mb: 2,
                      py: 2,
                      borderRadius: 3,
                      background:
                        "linear-gradient(135deg, #0170B9 0%, #0288D1 50%, #03A9F4 100%)",
                      boxShadow: "0 8px 20px rgba(1, 112, 185, 0.3)",
                      textTransform: "none",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                        transition: "left 0.5s",
                      },
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #01579B 0%, #0170B9 50%, #0288D1 100%)",
                        transform: "translateY(-3px)",
                        boxShadow: "0 12px 30px rgba(1, 112, 185, 0.5)",
                        "&::before": {
                          left: "100%",
                        },
                      },
                      "&:active": {
                        transform: "translateY(-1px)",
                      },
                    }}
                    startIcon={<LoginIcon />}
                  >
                    Masuk
                  </Button>
                </Box>
              }
            >
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  margin="normal"
                  required
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(1, 112, 185, 0.15)",
                      transition: "all 0.3s ease",
                      // Neutralize browser autofill background
                      "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active": {
                        WebkitTextFillColor: "inherit",
                        WebkitBoxShadow: "0 0 0px 1000px transparent inset",
                        transition: "background-color 9999s ease-out 0s",
                        caretColor: "inherit",
                      },

                    },

                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  margin="normal"
                  required
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(1, 112, 185, 0.15)",
                      transition: "all 0.3s ease",
                      // Neutralize browser autofill background
                      "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active": {
                        WebkitTextFillColor: "inherit",
                        WebkitBoxShadow: "0 0 0px 1000px transparent inset",
                        transition: "background-color 9999s ease-out 0s",
                        caretColor: "inherit",
                      },



                    },

                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                          sx={{
                            color: "text.secondary",
                            "&:hover": {
                              color: "#0170B9",
                              backgroundColor: "rgba(1, 112, 185, 0.1)",
                            },
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    mt: 4,
                    mb: 2,
                    py: 2,
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, #0170B9 0%, #0288D1 50%, #03A9F4 100%)",
                    boxShadow: "0 8px 20px rgba(1, 112, 185, 0.3)",
                    textTransform: "none",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                      transition: "left 0.5s",
                    },
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #01579B 0%, #0170B9 50%, #0288D1 100%)",
                      transform: "translateY(-3px)",
                      boxShadow: "0 12px 30px rgba(1, 112, 185, 0.5)",
                      "&::before": {
                        left: "100%",
                      },
                    },
                    "&:active": {
                      transform: "translateY(-1px)",
                    },
                    "&.Mui-disabled": {
                      background: "rgba(0, 0, 0, 0.12)",
                      color: "rgba(0, 0, 0, 0.26)",
                    },
                  }}
                  startIcon={
                    loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <LoginIcon />
                    )
                  }
                >
                  {loading ? "Memproses..." : "Masuk"}
                </Button>
              </Box>
            </ClientOnly>

            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  backgroundColor: "rgba(1, 112, 185, 0.1)",
                  padding: "8px 16px",
                  borderRadius: 2,
                  border: "1px solid rgba(1, 112, 185, 0.2)",
                  display: "inline-block",
                  fontWeight: 500,
                }}
              >
                Demo Login: admin / admin123
              </Typography>
            </Box>
          </CardContent>
        </Paper>
      </Container>
    </Box>
  );
};
