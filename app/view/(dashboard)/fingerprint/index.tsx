"use client";

import { Box, Fade, Typography } from "@mui/material";
import { FingerprintTable } from "./table";

export const FingerprintView = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Fade in timeout={500}>
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography fontSize={22} fontWeight="bold" gutterBottom>
              Mesin Absensi 🖥️
            </Typography>
            <Typography fontSize={18} color="text.secondary">
              Kelola dan monitor semua mesin absensi dalam sistem
            </Typography>
          </Box>
        </Box>
      </Fade>

      <FingerprintTable />
    </Box>
  );
};
