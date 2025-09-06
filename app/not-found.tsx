'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Avatar,
} from '@mui/material';
import {
  Home,
  ArrowBack,
  ErrorOutline,
} from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 50%, #66bb6a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            textAlign: 'center',
            p: 4,
          }}
        >
          {/* Error Icon */}
          <Avatar
            sx={{
              width: 120,
              height: 120,
              mx: 'auto',
              mb: 3,
              background: 'linear-gradient(135deg, #f44336 0%, #e57373 100%)',
              fontSize: 60,
            }}
          >
            <ErrorOutline sx={{ fontSize: 60 }} />
          </Avatar>

          {/* Error Code */}
          <Typography
            variant="h1"
            component="h1"
            fontWeight="bold"
            sx={{
              fontSize: { xs: '4rem', sm: '6rem' },
              color: '#f44336',
              mb: 1,
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            404
          </Typography>

          {/* Error Message */}
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            gutterBottom
            sx={{ color: 'text.primary', mb: 2 }}
          >
            Halaman Tidak Ditemukan
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, lineHeight: 1.6 }}
          >
            Maaf, halaman yang Anda cari tidak dapat ditemukan. 
            Halaman mungkin telah dipindahkan, dihapus, atau URL yang Anda masukkan salah.
          </Typography>

          {/* Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<Home />}
              component={Link}
              href="/dashboard"
              sx={{
                borderRadius: 2,
                py: 1.5,
                px: 3,
                background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 50%, #66bb6a 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #4caf50 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(46, 125, 50, 0.4)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Kembali ke Dashboard
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<ArrowBack />}
              onClick={handleGoBack}
              sx={{
                borderRadius: 2,
                py: 1.5,
                px: 3,
                borderColor: '#2e7d32',
                color: '#2e7d32',
                '&:hover': {
                  borderColor: '#1b5e20',
                  backgroundColor: 'rgba(46, 125, 50, 0.04)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Kembali Sebelumnya
            </Button>
          </Box>

          {/* Additional Info */}
          <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
            <Typography variant="body2" color="text.secondary">
              Jika masalah ini terus berlanjut, silakan hubungi administrator sistem.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
