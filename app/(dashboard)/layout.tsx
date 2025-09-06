'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ClientOnly from '../components/ClientOnly';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Clear cookies
      document.cookie = 'isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      
      // Clear localStorage
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');
    }
    
    router.push('/login');
  };

  return (
    <ClientOnly fallback={<div>Loading...</div>}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - 280px)` },
            ml: { sm: '280px' },
            backgroundColor: 'rgba(248, 249, 255, 0.3)',
            minHeight: '100vh',
          }}
        >
          {/* Header */}
          <Header onDrawerToggle={handleDrawerToggle} onLogout={handleLogout} />
          
          {/* Main Content */}
          <Box sx={{ mt: '64px' }}>
            {children}
          </Box>
        </Box>
      </Box>
    </ClientOnly>
  );
}
