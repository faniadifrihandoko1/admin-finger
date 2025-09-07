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
        sx={{ color: 'primary.main' }}
      >
        <Edit />
      </IconButton>
    </Box>
  );
};