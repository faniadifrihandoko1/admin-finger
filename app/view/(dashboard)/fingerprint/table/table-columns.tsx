import { GridColumnDef } from "@/app/components/comon/table/CustomTable";
import { Cancel, CheckCircle, Computer, Edit, LocationOn, Warning, Cloud, Link, Memory } from "@mui/icons-material";
import { Avatar, Box, Chip, IconButton, LinearProgress, Typography } from "@mui/material";
import { TableAction } from "./table-action";
import { useMemo } from "react";
import { FingerprintMachine } from "../utils/type";

interface UseTableColumnsProps {
  onEdit?: (machine: FingerprintMachine) => void;
  onDelete?: (id: string) => void;
}

const getStatusIcon = (lastActivity: string) => {
  const lastActivityDate = new Date(lastActivity);
  const now = new Date();
  const diffInHours = (now.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 1) {
    return <CheckCircle />;
  } else if (diffInHours < 24) {
    return <Warning />;
  } else {
    return <Cancel />;
  }
};

const getStatusColor = (lastActivity: string) => {
  const lastActivityDate = new Date(lastActivity);
  const now = new Date();
  const diffInHours = (now.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 1) {
    return 'success';
  } else if (diffInHours < 24) {
    return 'warning';
  } else {
    return 'error';
  }
};

const getStatusLabel = (lastActivity: string) => {
  const lastActivityDate = new Date(lastActivity);
  const now = new Date();
  const diffInHours = (now.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 1) {
    return 'ACTIVE';
  } else if (diffInHours < 24) {
    return 'IDLE';
  } else {
    return 'OFFLINE';
  }
};

export function useTableColumns({ onEdit, onDelete }: UseTableColumnsProps = {}) {
  return useMemo(() => {
    const columns: GridColumnDef[] = [
      {
        field: 'device_name',
        headerName: 'Device',
        flex: 2,
        minWidth: 200,
        renderCell: ({ row }: { row: FingerprintMachine }) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                mr: 2,
                background: 'linear-gradient(135deg, #0170B9 0%, #0288D1 50%, #03A9F4 100%)',
                boxShadow: '0 2px 8px rgba(1, 112, 185, 0.3)',
              }}
            >
              <Computer />
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight={500}>
                {row.device_name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {row.device_type_name}
              </Typography>
            </Box>
          </Box>
        ),
      },
      {
        field: 'cloud_id',
        headerName: 'Cloud ID',
        flex: 1.5,
        minWidth: 150,
        renderCell: ({ row }: { row: FingerprintMachine }) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Cloud sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" fontFamily="monospace">
              {row.cloud_id}
            </Typography>
          </Box>
        ),
      },
      {
        field: 'sn',
        headerName: 'Serial Number',
        flex: 1.5,
        minWidth: 150,
        renderCell: ({ row }: { row: FingerprintMachine }) => (
          <Typography variant="body2" fontFamily="monospace">
            {row.sn}
          </Typography>
        ),
      },
      // {
      //   field: 'status',
      //   headerName: 'Status',
      //   flex: 1,
      //   minWidth: 120,
      //   renderCell: ({ row }: { row: FingerprintMachine }) => (
      //     <Chip
      //       icon={getStatusIcon(row.last_activity) || undefined}
      //       label={getStatusLabel(row.last_activity)}
      //       color={getStatusColor(row.last_activity) as any}
      //       size="small"
      //       sx={{ borderRadius: 2 }}
      //     />
      //   ),
      // },
      {
        field: 'user_id',
        headerName: 'User ID',
        flex: 1,
        minWidth: 100,
        renderCell: ({ row }: { row: FingerprintMachine }) => (
          <Typography variant="body2" fontWeight={500}>
            {row.user_id}
          </Typography>
        ),
      },
      {
        field: 'last_activity',
        headerName: 'Last Activity',
        flex: 1.5,
        minWidth: 150,
        type: 'date',
      },
      {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        minWidth: 120,
        align: 'center',
        
        renderCell: ({ row }: { row: FingerprintMachine }) => (
          <TableAction 
            row={row} 
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ),
      },
    ];

    return columns;
  }, [onEdit, onDelete]);
}