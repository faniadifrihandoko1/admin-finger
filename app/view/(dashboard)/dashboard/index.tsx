"use client";

import {
  Block,
  CheckCircle,
  Error,
  Refresh,
  Schedule,
  Warning,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Fade,
  Grow,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface DashboardStats {
  totalMachines: number;
  activeMachines: number;
  nonActiveMachines: number;
  expiredMachines: number;
}

interface ExpiredDetail {
  id: string;
  machineName: string;
  location: string;
  expiredDate: string;
  daysExpired: number;
  status: "critical" | "warning" | "info";
}



export const DashboardView = () => {
  const [stats, _] = useState<DashboardStats>({
    totalMachines: 25,
    activeMachines: 18,
    nonActiveMachines: 4,
    expiredMachines: 3,
  });

  const [expiredDetails] = useState<ExpiredDetail[]>([
    {
      id: "1",
      machineName: "Fingerprint Machine A1",
      location: "Lobby Utama",
      expiredDate: "2024-01-15",
      daysExpired: 15,
      status: "critical",
    },
    {
      id: "2",
      machineName: "Fingerprint Machine B2",
      location: "Gedung Administrasi",
      expiredDate: "2024-01-20",
      daysExpired: 10,
      status: "warning",
    },
    {
      id: "3",
      machineName: "Fingerprint Machine C3",
      location: "Laboratorium",
      expiredDate: "2024-01-25",
      daysExpired: 5,
      status: "info",
    },
    {
      id: "4",
      machineName: "Fingerprint Machine D4",
      location: "Perpustakaan",
      expiredDate: "2024-01-10",
      daysExpired: 20,
      status: "critical",
    },
    {
      id: "5",
      machineName: "Fingerprint Machine E5",
      location: "Kantin",
      expiredDate: "2024-01-28",
      daysExpired: 2,
      status: "info",
    },
  ]);






  const getExpiredStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "error";
      case "warning":
        return "warning";
      case "info":
        return "info";
      default:
        return "default";
    }
  };

  const getExpiredStatusIcon = (status: string) => {
    switch (status) {
      case "critical":
        return <Error />;
      case "warning":
        return <Warning />;
      case "info":
        return <Schedule />;
      default:
        return null;
    }
  };

  const StatCard = ({
    title,
    value,
    total,
    icon: Icon,
    color,
    index,
  }: {
    title: string;
    value: number;
    total: number;
    icon: React.ComponentType;
    color: string;
    index: number;
  }) => {
    return (
      <Grow in timeout={300 + index * 100}>
        <Card
          sx={{
            height: "100%",
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            border: `2px solid ${color === 'success' ? 'rgba(76, 175, 80, 0.3)' : color === 'warning' ? 'rgba(255, 152, 0, 0.3)' : 'rgba(244, 67, 54, 0.3)'}`,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: color === 'success' 
                ? "0 12px 40px rgba(76, 175, 80, 0.15)"
                : color === 'warning'
                ? "0 12px 40px rgba(255, 152, 0, 0.15)"
                : "0 12px 40px rgba(244, 67, 54, 0.15)",
              border: `2px solid ${color === 'success' ? 'rgba(76, 175, 80, 0.5)' : color === 'warning' ? 'rgba(255, 152, 0, 0.5)' : 'rgba(244, 67, 54, 0.5)'}`,
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
            {/* Icon and Title */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 2,
                  background: color === 'success' 
                    ? 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)'
                    : color === 'warning'
                    ? 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)'
                    : 'linear-gradient(135deg, #F44336 0%, #EF5350 100%)',
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                  boxShadow: color === 'success' 
                    ? '0 4px 12px rgba(76, 175, 80, 0.3)'
                    : color === 'warning'
                    ? '0 4px 12px rgba(255, 152, 0, 0.3)'
                    : '0 4px 12px rgba(244, 67, 54, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: color === 'success' 
                      ? '0 6px 16px rgba(76, 175, 80, 0.4)'
                      : color === 'warning'
                      ? '0 6px 16px rgba(255, 152, 0, 0.4)'
                      : '0 6px 16px rgba(244, 67, 54, 0.4)',
                  }
                }}
              >
                {Icon && (
                  <Box sx={{ color: 'white', fontSize: 24 }}>
                    <Icon />
                  </Box>
                )}
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="text.primary"
                >
                  {title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  dari {total} mesin
                </Typography>
              </Box>
            </Box>

            {/* Value */}
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography
                variant="h2"
                fontWeight="bold"
                color={`${color}.main`}
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1,
                }}
              >
                {value}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                fontWeight={500}
              >
                mesin
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grow>
    );
  };

  const statsData = [
    {
      title: "Active Machines",
      value: stats.activeMachines,
      total: stats.totalMachines,
      icon: CheckCircle,
      color: "success",
    },
    {
      title: "Non Active Machines",
      value: stats.nonActiveMachines,
      total: stats.totalMachines,
      icon: Block,
      color: "warning",
    },
    {
      title: "Expired Machines",
      value: stats.expiredMachines,
      total: stats.totalMachines,
      icon: Error,
      color: "error",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome Section */}
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
              Dashboard Overview 📊
            </Typography>
            <Typography fontSize={18} color="text.secondary">
              Monitor sistem fingerprint dan aktivitas pengguna secara real-time
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            sx={{
              borderRadius: 2,
              background:
                "linear-gradient(135deg, #0170B9 0%, #0288D1 50%, #03A9F4 100%)",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #01579B 0%, #0170B9 50%, #0288D1 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(1, 112, 185, 0.4)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Refresh Data
          </Button>
        </Box>
      </Fade>

      {/* Stats Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        {statsData.map((stat, index) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            total={stat.total}
            icon={stat.icon}
            color={stat.color}
            index={index}
          />
        ))}
      </Box>

      {/* Detailed Expired Section */}
      <Grow in timeout={600}>
        <Paper
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,249,255,0.9) 100%)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            mb: 4,
          }}
        >
          <Box sx={{ p: 3, borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
            <Typography variant="h6" fontWeight="bold" color="error.main">
              Detail Mesin Fingerprint Expired
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Daftar lengkap mesin fingerprint yang telah expired beserta detailnya
            </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            {expiredDetails.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  mb: 1,
                  borderRadius: 2,
                  backgroundColor: "rgba(0,0,0,0.02)",
                  border: `1px solid ${getExpiredStatusColor(item.status)}.main`,
                  borderOpacity: 0.2,
                  "&:hover": {
                    backgroundColor: `${getExpiredStatusColor(item.status)}.light`,
                    backgroundColorOpacity: 0.04,
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    mr: 2,
                    background: item.status === 'critical'
                      ? 'linear-gradient(135deg, #F44336 0%, #EF5350 100%)'
                      : item.status === 'warning'
                      ? 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)'
                      : 'linear-gradient(135deg, #2196F3 0%, #42A5F5 100%)',
                    boxShadow: item.status === 'critical'
                      ? '0 3px 8px rgba(244, 67, 54, 0.3)'
                      : item.status === 'warning'
                      ? '0 3px 8px rgba(255, 152, 0, 0.3)'
                      : '0 3px 8px rgba(33, 150, 243, 0.3)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                >
                  {getExpiredStatusIcon(item.status) && (
                    <Box sx={{ color: 'white', fontSize: 20 }}>
                      {getExpiredStatusIcon(item.status)}
                    </Box>
                  )}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" fontWeight={600}>
                    {item.machineName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.location}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right", mr: 2 }}>
                  <Typography variant="body2" fontWeight={500}>
                    {item.expiredDate}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Expired Date
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color={`${getExpiredStatusColor(item.status)}.main`}
                  >
                    {item.daysExpired} days
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Expired
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </Grow>

      {/* Recent Activity */}
      {/* <Grow in timeout={1000}>
        <Paper
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,249,255,0.9) 100%)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          }}
        >
            <Box sx={{ p: 3, borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
              <Typography variant="h6" fontWeight="bold">
                Aktivitas Terbaru
              </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              {recentActivities.map((activity) => (
                <Box
                  key={activity.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    mb: 1,
                    borderRadius: 2,
                    backgroundColor: "rgba(0,0,0,0.02)",
                    "&:hover": {
                      backgroundColor: "rgba(1, 112, 185, 0.04)",
                    },
                    transition: "all 0.2s ease",
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
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AccessTime
                      sx={{ fontSize: 14, mr: 0.5, color: "text.secondary" }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grow> */}
    </Box>
  );
};
