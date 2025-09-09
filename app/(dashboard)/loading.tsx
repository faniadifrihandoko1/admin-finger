"use client";

import React from "react";
import {
  Box,
  CircularProgress,
  Typography,
  LinearProgress,
} from "@mui/material";
import { Dashboard, Fingerprint } from "@mui/icons-material";

export default function DashboardLoading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: 3,
      }}
    >
      {/* Loading Spinner */}
      <Box sx={{ position: "relative" }}>
        <CircularProgress
          size={80}
          thickness={4}
          sx={{
            color: "#0170B9",
            "& .MuiCircularProgress-circle": {
              strokeLinecap: "round",
            },
          }}
        />

        {/* Icon in center */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Dashboard sx={{ fontSize: 32, color: "#0170B9" }} />
        </Box>
      </Box>

      {/* Loading Text */}
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h6"
          component="h2"
          fontWeight="bold"
          sx={{ color: "text.primary", mb: 1 }}
        >
          Memuat Dashboard...
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Mengambil data terbaru
        </Typography>

        {/* Progress Bar */}
        <Box sx={{ width: 200, mx: "auto" }}>
          <LinearProgress
            sx={{
              height: 4,
              borderRadius: 2,
              backgroundColor: "rgba(1, 112, 185, 0.1)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#0170B9",
                borderRadius: 2,
              },
            }}
          />
        </Box>
      </Box>

      {/* Loading Stats */}
      <Box
        sx={{
          display: "flex",
          gap: 4,
          mt: 2,
          opacity: 0.7,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Fingerprint sx={{ fontSize: 20, color: "#0170B9", mb: 0.5 }} />
          <Typography variant="caption" color="text.secondary">
            Mesin
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Dashboard sx={{ fontSize: 20, color: "#0170B9", mb: 0.5 }} />
          <Typography variant="caption" color="text.secondary">
            Data
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
