import { GridColumnDef } from "@/app/components/comon/table/CustomTable";
import { Cancel, CheckCircle, Computer, Edit, LocationOn, Warning } from "@mui/icons-material";
import { Avatar, Box, Chip, IconButton, LinearProgress, Typography } from "@mui/material";
import { TableAction } from "./table-action";

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

export const columns: GridColumnDef[] = [
    {
      field: 'name',
      headerName: 'Mesin',
      flex: 2,
      minWidth: 200,
      renderCell: ({ row }: { row: FingerprintMachine }) => (
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
              {row.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {row.model}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'location',
      headerName: 'Lokasi',
      flex: 1.5,
      minWidth: 150,
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOn sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2">
            {row.location}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'ipAddress',
      headerName: 'IP Address',
      flex: 1,
      minWidth: 120,
      renderCell: ({ row }: { row: FingerprintMachine }) => (
        <Typography variant="body2" fontFamily="monospace">
          {row.ipAddress}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 120,
      renderCell: ({ row }: { row: FingerprintMachine }) => (
        <Chip
          icon={getStatusIcon(row.status) || undefined}
          label={row.status.toUpperCase()}
          color={getStatusColor(row.status) as any}
          size="small"
          sx={{ borderRadius: 2 }}
        />
      ),
    },
    {
      field: 'users',
      headerName: 'Users',
      flex: 1.5,
      minWidth: 150,
      renderCell: ({ row }: { row: FingerprintMachine }) => (
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {row.registeredUsers}/{row.totalUsers}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(row.registeredUsers / row.totalUsers) * 100}
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
      ),
    },
    {
      field: 'lastSync',
      headerName: 'Last Sync',
      flex: 1.5,
      minWidth: 150,
      type: 'date',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 120,
      align: 'right',
      renderCell: ({ row }: { row: FingerprintMachine }) => (
        <TableAction  row={row} />
      ),
    },
  ];