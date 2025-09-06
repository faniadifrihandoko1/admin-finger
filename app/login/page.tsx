'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Fingerprint,
  Login as LoginIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import ClientOnly from '../components/ClientOnly';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulasi login (ganti dengan logic authentication yang sesungguhnya)
    setTimeout(() => {
      if (formData.username === 'admin' && formData.password === 'admin123') {
        // Only run on client side
        if (typeof window !== 'undefined') {
          // Set cookies for authentication
          document.cookie = 'isAuthenticated=true; path=/; max-age=86400'; // 24 hours
          document.cookie = 'userRole=admin; path=/; max-age=86400'; // 24 hours
          
          // Also set localStorage for client-side use
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userRole', 'admin');
        }
        
        router.push('/dashboard');
      } else {
        setError('Username atau password salah');
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
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 50%, #66bb6a 100%)',
              padding: 3,
              textAlign: 'center',
              color: 'white',
            }}
          >
            <Fingerprint sx={{ fontSize: 48, mb: 1 }} />
            <Typography variant="h4" component="h1" fontWeight="bold">
              Admin Fingerprint
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Sistem Manajemen Fingerprint
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom textAlign="center" mb={3}>
              Masuk ke Dashboard
            </Typography>

            <ClientOnly fallback={
              <Box component="form">
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  margin="normal"
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
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
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 50%, #66bb6a 100%)',
                  }}
                  startIcon={<LoginIcon />}
                >
                  Masuk
                </Button>
              </Box>
            }>
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
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  margin="normal"
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
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
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 50%, #66bb6a 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #4caf50 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(46, 125, 50, 0.4)',
                    },
                  }}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                >
                  {loading ? 'Memproses...' : 'Masuk'}
                </Button>
              </Box>
            </ClientOnly>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Demo Login: admin / admin123
              </Typography>
            </Box>
          </CardContent>
        </Paper>
      </Container>
    </Box>
  );
}
