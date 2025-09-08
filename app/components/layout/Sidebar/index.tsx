'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Dashboard,
  People,
  Fingerprint,
  Analytics,
  Settings,
  Security,
  Notifications,
  Assessment,
  AdminPanelSettings,
} from '@mui/icons-material';

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Dashboard, href: '/dashboard' },
  { id: 'fingerprints', label: 'Mesin Absensi', icon: Fingerprint, href: '/fingerprints' },
  // { id: 'users', label: 'User', icon: People, href: '/users' },
];

export default function Sidebar({ mobileOpen, handleDrawerToggle }: SidebarProps) {
  const pathname = usePathname();


  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
       <Box sx={{ p: 3, background: 'linear-gradient(135deg, #0170B9 0%, #0288D1 50%, #03A9F4 100%)', color: 'white', textAlign: 'center' }}>
         <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}>
           <AdminPanelSettings sx={{ fontSize: 30 }} />
         </Avatar>
         <Typography variant="h6" fontWeight="bold" gutterBottom>Admin Panel</Typography>
         <Typography variant="body2" sx={{ opacity: 0.9 }}>Fingerprint System</Typography>
         <Chip label="Online" size="small" sx={{ mt: 1, background: 'rgba(2, 136, 209, 0.3)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)' }} />
       </Box>
      <Divider />
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List sx={{ px: 2, py: 1 }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            // Only check pathname after component is mounted to prevent hydration mismatch
            const isSelected = pathname === item.href;
            return (
              <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
                <Link href={item.href} style={{ textDecoration: 'none', width: '100%' }}>
                  <ListItemButton
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      px: 2,
                      backgroundColor: isSelected ? 'rgba(1, 112, 185, 0.15)' : 'transparent',
                      border: isSelected ? '1px solid rgba(1, 112, 185, 0.3)' : '1px solid transparent',
                      '&:hover': { backgroundColor: 'rgba(1, 112, 185, 0.08)', transform: 'translateX(4px)', boxShadow: '0 2px 8px rgba(1, 112, 185, 0.2)' },
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, color: isSelected ? '#0170B9' : 'text.secondary' }}>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: isSelected ? 600 : 400, color: isSelected ? '#0170B9' : 'text.primary' }} />
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 } }}>
        {drawer}
      </Drawer>
      <Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 } }} open>
        {drawer}
      </Drawer>
    </>
  );
}
