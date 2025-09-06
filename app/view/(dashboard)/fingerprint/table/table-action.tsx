import { Delete, Edit, MoreVert } from "@mui/icons-material"
import { Box, IconButton } from "@mui/material"

interface Props {
    // handleOpenDialog: (row: any) => void;
    // handleDelete: (id: string) => void;
    row: any;
} 

export const TableAction = ({  row }: Props) => { 
return (
    <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
    <IconButton
      size="small"
    //   onClick={() => handleOpenDialog(row)}
      sx={{ color: 'primary.main' }}
    >
      <Edit />
    </IconButton>
    <IconButton
      size="small"
    //   onClick={() => handleDelete(row.id)}
      sx={{ color: 'error.main' }}
    >
      <Delete />
    </IconButton>
    <IconButton size="small">
      <MoreVert />
    </IconButton>
  </Box>
)
}