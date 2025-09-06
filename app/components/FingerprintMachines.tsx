'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Fade,
  Grow,
  Alert,
  Snackbar,
  Pagination,
  TablePagination,
  Stack,
} from '@mui/material';
import {
  Search,
  FilterList,
  Add,
  MoreVert,
  Edit,
  Delete,
  Fingerprint,
  CheckCircle,
  Cancel,
  Warning,
  Refresh,
  LocationOn,
  Computer,
} from '@mui/icons-material';

interface FingerprintMachine {
  id: string;
  name: string;
  location: string;
  ipAddress: string;
  status: 'online' | 'offline' | 'maintenance';
  lastSync: string;
  totalUsers: number;
  registeredUsers: number;
  model: string;
  serialNumber: string;
}

export default function FingerprintMachines() {
  const [machines, setMachines] = useState<FingerprintMachine[]>([
    {
      id: '1',
      name: 'Mesin Absensi Lobby',
      location: 'Lobby Utama',
      ipAddress: '192.168.1.100',
      status: 'online',
      lastSync: '2024-01-15 14:30:00',
      totalUsers: 50,
      registeredUsers: 48,
      model: 'FingerSpot FS-1',
      serialNumber: 'FS001234567',
    },
    {
      id: '2',
      name: 'Mesin Absensi IT',
      location: 'Departemen IT',
      ipAddress: '192.168.1.101',
      status: 'offline',
      lastSync: '2024-01-14 09:15:00',
      totalUsers: 25,
      registeredUsers: 23,
      model: 'FingerSpot FS-2',
      serialNumber: 'FS001234568',
    },
    {
      id: '3',
      name: 'Mesin Absensi HR',
      location: 'Departemen HR',
      ipAddress: '192.168.1.102',
      status: 'maintenance',
      lastSync: '2024-01-15 10:45:00',
      totalUsers: 30,
      registeredUsers: 28,
      model: 'FingerSpot FS-1',
      serialNumber: 'FS001234569',
    },
    {
      id: '4',
      name: 'Mesin Absensi Finance',
      location: 'Departemen Finance',
      ipAddress: '192.168.1.103',
      status: 'online',
      lastSync: '2024-01-15 15:20:00',
      totalUsers: 20,
      registeredUsers: 20,
      model: 'FingerSpot FS-3',
      serialNumber: 'FS001234570',
    },
    {
      id: '5',
      name: 'Mesin Absensi IT',
      location: 'Departemen IT',
      ipAddress: '192.168.1.101',
      status: 'offline',
      lastSync: '2024-01-14 09:15:00',
      totalUsers: 25,
      registeredUsers: 23,
      model: 'FingerSpot FS-2',
      serialNumber: 'FS001234568',
    },
    {
      id: '6',
      name: 'Mesin Absensi HR',
      location: 'Departemen HR',
      ipAddress: '192.168.1.102',
      status: 'maintenance',
      lastSync: '2024-01-15 10:45:00',
      totalUsers: 30,
      registeredUsers: 28,
      model: 'FingerSpot FS-1',
      serialNumber: 'FS001234569',
    },
    {
      id: '7',
      name: 'Mesin Absensi Finance',
      location: 'Departemen Finance',
      ipAddress: '192.168.1.103',
      status: 'online',
      lastSync: '2024-01-15 15:20:00',
      totalUsers: 20,
      registeredUsers: 20,
      model: 'FingerSpot FS-3',
      serialNumber: 'FS001234570',
    },
    {
      id: '8',
      name: 'Mesin Absensi IT',
      location: 'Departemen IT',
      ipAddress: '192.168.1.101',
      status: 'offline',
      lastSync: '2024-01-14 09:15:00',
      totalUsers: 25,
      registeredUsers: 23,
      model: 'FingerSpot FS-2',
      serialNumber: 'FS001234568',
    },
    {
      id: '9',
      name: 'Mesin Absensi HR',
      location: 'Departemen HR',
      ipAddress: '192.168.1.102',
      status: 'maintenance',
      lastSync: '2024-01-15 10:45:00',
      totalUsers: 30,
      registeredUsers: 28,
      model: 'FingerSpot FS-1',
      serialNumber: 'FS001234569',
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingMachine, setEditingMachine] = useState<FingerprintMachine | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    ipAddress: '',
    status: 'online' as 'online' | 'offline' | 'maintenance',
    model: '',
    serialNumber: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  
  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'success';
      case 'offline':
        return 'error';
      case 'maintenance':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle />;
      case 'offline':
        return <Cancel />;
      case 'maintenance':
        return <Warning />;
      default:
        return null;
    }
  };

  const filteredMachines = machines.filter(machine =>
    machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination functions
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  // Get paginated data
  const paginatedMachines = filteredMachines.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleOpenDialog = (machine?: FingerprintMachine) => {
    if (machine) {
      setEditingMachine(machine);
      setFormData({
        name: machine.name,
        location: machine.location,
        ipAddress: machine.ipAddress,
        status: machine.status,
        model: machine.model,
        serialNumber: machine.serialNumber,
      });
    } else {
      setEditingMachine(null);
      setFormData({
        name: '',
        location: '',
        ipAddress: '',
        status: 'online',
        model: '',
        serialNumber: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingMachine(null);
    setFormData({
      name: '',
      location: '',
      ipAddress: '',
      status: 'online',
      model: '',
      serialNumber: '',
    });
  };

  const handleSave = () => {
    if (editingMachine) {
      // Update existing machine
      setMachines(prev => prev.map(machine =>
        machine.id === editingMachine.id
          ? { ...machine, ...formData, lastSync: new Date().toLocaleString() }
          : machine
      ));
      setSnackbar({ open: true, message: 'Mesin berhasil diperbarui!', severity: 'success' });
    } else {
      // Add new machine
      const newMachine: FingerprintMachine = {
        id: (machines.length + 1).toString(),
        ...formData,
        lastSync: new Date().toLocaleString(),
        totalUsers: 0,
        registeredUsers: 0,
      };
      setMachines(prev => [...prev, newMachine]);
      setSnackbar({ open: true, message: 'Mesin berhasil ditambahkan!', severity: 'success' });
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    setMachines(prev => prev.filter(machine => machine.id !== id));
    setSnackbar({ open: true, message: 'Mesin berhasil dihapus!', severity: 'success' });
  };

  const onlineMachines = machines.filter(m => m.status === 'online').length;
  const offlineMachines = machines.filter(m => m.status === 'offline').length;
  const maintenanceMachines = machines.filter(m => m.status === 'maintenance').length;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Fade in timeout={500}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Mesin Fingerprint 🖥️
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Kelola dan monitor semua mesin fingerprint dalam sistem
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
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
            Tambah Mesin
          </Button>
        </Box>
      </Fade>

      {/* Stats Cards */}
      {/* <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
        <Grow in timeout={600}>
          <Card sx={{ borderRadius: 3, background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)', border: '1px solid rgba(76, 175, 80, 0.2)' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <CheckCircle sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" color="success.main">
                {onlineMachines}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Online
              </Typography>
            </CardContent>
          </Card>
        </Grow>
        <Grow in timeout={700}>
          <Card sx={{ borderRadius: 3, background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(244, 67, 54, 0.05) 100%)', border: '1px solid rgba(244, 67, 54, 0.2)' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Cancel sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" color="error.main">
                {offlineMachines}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Offline
              </Typography>
            </CardContent>
          </Card>
        </Grow>
        <Grow in timeout={800}>
          <Card sx={{ borderRadius: 3, background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 152, 0, 0.05) 100%)', border: '1px solid rgba(255, 152, 0, 0.2)' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Warning sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" color="warning.main">
                {maintenanceMachines}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Maintenance
              </Typography>
            </CardContent>
          </Card>
        </Grow>
      </Box> */}

      {/* Machines Table */}
      <Grow in timeout={900}>
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                Daftar Mesin Fingerprint
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  placeholder="Cari mesin..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{
                    minWidth: 250,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  size="small"
                  sx={{ borderRadius: 2 }}
                >
                  Filter
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  size="small"
                  sx={{ borderRadius: 2 }}
                >
                  Refresh
                </Button>
              </Box>
            </Box>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Mesin</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Lokasi</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>IP Address</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Users</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Last Sync</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedMachines.map((machine) => (
                  <TableRow
                    key={machine.id}
                    hover
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(46, 125, 50, 0.04)',
                      },
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            mr: 2,
                            background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 50%, #66bb6a 100%)',
                            boxShadow: '0 2px 8px rgba(46, 125, 50, 0.3)',
                          }}
                        >
                          <Computer />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {machine.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {machine.model}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOn sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">
                          {machine.location}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace">
                        {machine.ipAddress}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(machine.status) || undefined}
                        label={machine.status.toUpperCase()}
                        color={getStatusColor(machine.status) as any}
                        size="small"
                        sx={{ borderRadius: 2 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {machine.registeredUsers}/{machine.totalUsers}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={(machine.registeredUsers / machine.totalUsers) * 100}
                          sx={{
                            height: 4,
                            borderRadius: 2,
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: 'success.main',
                              borderRadius: 2,
                            },
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {machine.lastSync}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(machine)}
                          sx={{ color: 'primary.main' }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(machine.id)}
                          sx={{ color: 'error.main' }}
                        >
                          <Delete />
                        </IconButton>
                        <IconButton size="small">
                          <MoreVert />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          {/* Pagination */}
          <Box sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Menampilkan {page * rowsPerPage + 1} - {Math.min((page + 1) * rowsPerPage, filteredMachines.length)} dari {filteredMachines.length} mesin
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="body2" color="text.secondary">
                  Rows per page:
                </Typography>
                <Select
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}
                  size="small"
                  sx={{ minWidth: 60 }}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
                <Pagination
                  count={Math.ceil(filteredMachines.length / rowsPerPage)}
                  page={page + 1}
                  onChange={(event, value) => handleChangePage(event, value - 1)}
                  color="primary"
                  size="small"
                  showFirstButton
                  showLastButton
                  sx={{
                    '& .MuiPaginationItem-root': {
                      borderRadius: 2,
                      '&.Mui-selected': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                        },
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(46, 125, 50, 0.1)',
                      },
                    },
                  }}
                />
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Grow>

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            {editingMachine ? 'Edit Mesin Fingerprint' : 'Tambah Mesin Fingerprint'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {editingMachine ? 'Perbarui informasi mesin' : 'Tambahkan mesin fingerprint baru ke sistem'}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Nama Mesin"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ mb: 2, borderRadius: 2 }}
          />
          <TextField
            margin="dense"
            label="Lokasi"
            fullWidth
            variant="outlined"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            sx={{ mb: 2, borderRadius: 2 }}
          />
          <TextField
            margin="dense"
            label="IP Address"
            fullWidth
            variant="outlined"
            value={formData.ipAddress}
            onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
            sx={{ mb: 2, borderRadius: 2 }}
          />
          <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label="Status"
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            >
              <MenuItem value="online">Online</MenuItem>
              <MenuItem value="offline">Offline</MenuItem>
              <MenuItem value="maintenance">Maintenance</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Model"
            fullWidth
            variant="outlined"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            sx={{ mb: 2, borderRadius: 2 }}
          />
          <TextField
            margin="dense"
            label="Serial Number"
            fullWidth
            variant="outlined"
            value={formData.serialNumber}
            onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
            sx={{ borderRadius: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={handleCloseDialog} sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              borderRadius: 2,
              background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 50%, #66bb6a 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #4caf50 100%)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(46, 125, 50, 0.4)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {editingMachine ? 'Update' : 'Tambah'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
