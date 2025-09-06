'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Logout,
  Settings,
  ShoppingCart,
} from '@mui/icons-material';

interface HeaderProps {
  onDrawerToggle: () => void;
  onLogout: () => void;
}

export default function Header({ onDrawerToggle, onLogout }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        width: { sm: `calc(100% - 280px)` }, 
        ml: { sm: '280px' }, 
        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
        backdropFilter: 'blur(20px)', 
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)', 
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.08)', 
        color: 'text.primary' 
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 }, justifyContent: 'space-between' }}>
        {/* Mobile Menu Button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Empty space for mobile */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Information Cards */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Expiry Date Card */}
          <Chip
            label="15 hari lagi jatuh tempo"
            sx={{
              backgroundColor: 'rgba(33, 150, 243, 0.1)',
              color: '#1976d2',
              border: '1px solid rgba(33, 150, 243, 0.2)',
              fontWeight: 500,
              px: 2,
              py: 1,
              height: 'auto',
              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />

          {/* Balance Card */}
          <Chip
            label="Saldo fingerspot.io : Rp 0"
            sx={{
              backgroundColor: 'rgba(46, 125, 50, 0.1)',
              color: '#2e7d32',
              border: '1px solid rgba(46, 125, 50, 0.2)',
              fontWeight: 500,
              px: 2,
              py: 1,
              height: 'auto',
              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />

         

          

          {/* User Avatar */}
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuClick}
            color="inherit"
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 50%, #66bb6a 100%)',
                border: '2px solid white',
                boxShadow: '0 2px 8px rgba(46, 125, 50, 0.3)',
              }}
            >
              A
            </Avatar>
          </IconButton>

          {/* User Menu */}
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                minWidth: 200,
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <AccountCircle sx={{ mr: 2 }} />
              Profile
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Settings sx={{ mr: 2 }} />
              Settings
            </MenuItem>
            <MenuItem onClick={onLogout} sx={{ color: 'error.main' }}>
              <Logout sx={{ mr: 2 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
