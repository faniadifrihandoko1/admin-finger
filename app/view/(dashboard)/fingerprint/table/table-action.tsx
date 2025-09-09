import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { FingerprintMachine } from "../utils/type";

interface TableActionProps {
  row: FingerprintMachine;
  onEdit?: (machine: FingerprintMachine) => void;
  onDelete?: (id: string) => void;
}

export const TableAction = ({ row, onEdit, onDelete }: TableActionProps) => {
  return (
    <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center', width: '100%', }}>
      <IconButton
        size="small"
        onClick={() => onEdit?.(row)}
        sx={{ 
          color: '#0170B9',
          '&:hover': {
            backgroundColor: 'rgba(1, 112, 185, 0.08)',
            color: '#01579B',
          },
        }}
      >
        <Edit />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => onDelete?.(row.cloud_id)}
        sx={{ 
          color: '#d32f2f',
          '&:hover': {
            backgroundColor: 'rgba(211, 47, 47, 0.08)',
            color: '#b71c1c',
          },
        }}
      >
        <Delete />
      </IconButton>
    </Box>
  );
};