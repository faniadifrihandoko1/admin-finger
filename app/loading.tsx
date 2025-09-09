"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Paper,
  Avatar,
} from "@mui/material";
import { Fingerprint } from "@mui/icons-material";

export default function Loading() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0170B9 0%, #0288D1 50%, #03A9F4 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            textAlign: "center",
            p: 4,
          }}
        >
          {/* Logo */}
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mx: "auto",
              mb: 3,
              background:
                "linear-gradient(135deg, #0170B9 0%, #0288D1 50%, #03A9F4 100%)",
            }}
          >
            <Fingerprint sx={{ fontSize: 40 }} />
          </Avatar>

          {/* Loading Spinner */}
          <Box sx={{ mb: 3 }}>
            <CircularProgress
              size={60}
              thickness={4}
              sx={{
                color: "#0170B9",
                "& .MuiCircularProgress-circle": {
                  strokeLinecap: "round",
                },
              }}
            />
          </Box>

          {/* Loading Text */}
          <Typography
            variant="h5"
            component="h1"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "text.primary", mb: 1 }}
          >
            Memuat Halaman...
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Mohon tunggu sebentar
          </Typography>

          {/* Animated Dots */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
            {[0, 1, 2].map(index => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#0170B9",
                  animation: "pulse 1.4s ease-in-out infinite both",
                  animationDelay: `${index * 0.16}s`,
                  "@keyframes pulse": {
                    "0%, 80%, 100%": {
                      transform: "scale(0.8)",
                      opacity: 0.5,
                    },
                    "40%": {
                      transform: "scale(1)",
                      opacity: 1,
                    },
                  },
                }}
              />
            ))}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
