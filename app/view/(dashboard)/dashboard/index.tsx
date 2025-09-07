'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Avatar,
  LinearProgress,
  Chip,
  Button,
  IconButton,
  Fade,
  Grow,
} from '@mui/material';
import {
  CheckCircle,
  Warning,
  Cancel,
  People,
  Fingerprint,
  TrendingUp,
  TrendingDown,
  AccessTime,
  Refresh,
  Add,
} from '@mui/icons-material';

interface DashboardStats {
  totalUsers: number;
  registeredUsers: number;
  pendingUsers: number;
  notRegisteredUsers: number;
  totalMachines: number;
  activeMachines: number;
  offlineMachines: number;
}

interface RecentActivity {
  id: string;
  user: string;
  action: string;
  time: string;
  status: 'success' | 'warning' | 'error';
}

export const DashboardView = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 156,
    registeredUsers: 142,
    pendingUsers: 8,
    notRegisteredUsers: 6,
    totalMachines: 12,
    activeMachines: 10,
    offlineMachines: 2,
  });

  const [recentActivities] = useState<RecentActivity[]>([
    { id: '1', user: 'John Doe', action: 'Fingerprint registered', time: '2 minutes ago', status: 'success' },
    { id: '2', user: 'Jane Smith', action: 'Failed login attempt', time: '5 minutes ago', status: 'warning' },
    { id: '3', user: 'Mike Johnson', action: 'Machine offline', time: '10 minutes ago', status: 'error' },
    { id: '4', user: 'Sarah Wilson', action: 'New user added', time: '15 minutes ago', status: 'success' },
    { id: '5', user: 'David Brown', action: 'Fingerprint updated', time: '20 minutes ago', status: 'success' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle />;
      case 'warning':
        return <Warning />;
      case 'error':
        return <Cancel />;
      default:
        return null;
    }
  };

  const StatCard = ({ title, value, total, icon: Icon, color, trend, trendUp, index }: any) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;

    return (
      <Grow in timeout={300 + index * 100}>
        <Card
          sx={{
            height: '100%',
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,249,255,0.9) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  sx={{
                    backgroundColor: `${color}.main`,
                    width: 48,
                    height: 48,
                    mr: 2,
                  }}
                >
                  {Icon && <Icon />}
                </Avatar>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2" fontWeight={500}>
                    {title}
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="text.primary">
                    {value}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  {trendUp ? (
                    <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                  ) : (
                    <TrendingDown sx={{ fontSize: 16, color: 'error.main', mr: 0.5 }} />
                  )}
                  <Typography
                    variant="body2"
                    color={trendUp ? 'success.main' : 'error.main'}
                    fontWeight={600}
                  >
                    {trend}
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  vs last month
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Progress
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {percentage.toFixed(1)}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={percentage}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: `${color}.main`,
                    borderRadius: 3,
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grow>
    );
  };

  const statsData = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      total: stats.totalUsers,
      icon: People,
      color: 'primary',
      trend: '+12%',
      trendUp: true,
    },
    {
      title: 'Registered',
      value: stats.registeredUsers,
      total: stats.totalUsers,
      icon: CheckCircle,
      color: 'success',
      trend: '+8%',
      trendUp: true,
    },
    {
      title: 'Pending',
      value: stats.pendingUsers,
      total: stats.totalUsers,
      icon: Warning,
      color: 'warning',
      trend: '-3%',
      trendUp: false,
    },
    {
      title: 'Fingerprint Machines',
      value: stats.totalMachines,
      total: stats.totalMachines,
      icon: Fingerprint,
      color: 'info',
      trend: '+5%',
      trendUp: true,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome Section */}
      <Fade in timeout={500}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Dashboard Overview 📊
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Monitor sistem fingerprint dan aktivitas pengguna secara real-time
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            sx={{
              borderRadius: 2,
              background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 50%, #66bb6a 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #4caf50 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(46, 125, 50, 0.4)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Refresh Data
          </Button>
        </Box>
      </Fade>

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        {statsData.map((stat, index) => (
          <StatCard key={stat.title} stat={stat} index={index} />
        ))}
      </Box>

      {/* Machine Status & Recent Activity */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3 }}>
        {/* Machine Status */}
        <Grow in timeout={800}>
          <Paper
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,249,255,0.9) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            }}
          >
            <Box sx={{ p: 3, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
              <Typography variant="h6" fontWeight="bold">
                Status Mesin Fingerprint
              </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircle color="success" sx={{ mr: 1 }} />
                  <Typography variant="body2">Active Machines</Typography>
                </Box>
                <Typography variant="h6" fontWeight="bold" color="success.main">
                  {stats.activeMachines}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Cancel color="error" sx={{ mr: 1 }} />
                  <Typography variant="body2">Offline Machines</Typography>
                </Box>
                <Typography variant="h6" fontWeight="bold" color="error.main">
                  {stats.offlineMachines}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Fingerprint color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">Total Machines</Typography>
                </Box>
                <Typography variant="h6" fontWeight="bold" color="primary.main">
                  {stats.totalMachines}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grow>

        {/* Recent Activity */}
        <Grow in timeout={1000}>
          <Paper
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,249,255,0.9) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            }}
          >
            <Box sx={{ p: 3, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
              <Typography variant="h6" fontWeight="bold">
                Aktivitas Terbaru
              </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              {recentActivities.map((activity, index) => (
                <Box
                  key={activity.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    mb: 1,
                    borderRadius: 2,
                    backgroundColor: 'rgba(0,0,0,0.02)',
                    '&:hover': {
                      backgroundColor: 'rgba(46, 125, 50, 0.04)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      mr: 2,
                      backgroundColor: `${getStatusColor(activity.status)}.main`,
                    }}
                  >
                    {getStatusIcon(activity.status)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {activity.user}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.action}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTime sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grow>
      </Box>
    </Box>
  );
}
