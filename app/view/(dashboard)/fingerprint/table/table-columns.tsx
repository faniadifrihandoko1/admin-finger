import { GridColumnDef } from "@/app/components/comon/table/CustomTable";
import {
  Cloud,
  Computer,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { FingerprintMachine } from "../utils/type";
import { TableAction } from "./table-action";

interface UseTableColumnsProps {
  onEdit?: (machine: FingerprintMachine) => void;
  onDelete?: (id: string) => void;
}






export function useTableColumns({
  onEdit,
  onDelete,
}: UseTableColumnsProps = {}) {
  return useMemo(() => {
    const columns: GridColumnDef[] = [
      {
        field: "device_name",
        headerName: "Device",
        flex: 2,
        minWidth: 200,
        renderCell: ({ row }: { row: FingerprintMachine }) => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                mr: 2,
                background:
                  "linear-gradient(135deg, #0170B9 0%, #0288D1 50%, #03A9F4 100%)",
                boxShadow: "0 2px 8px rgba(1, 112, 185, 0.3)",
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
        field: "cloud_id",
        headerName: "Cloud ID",
        flex: 1.5,
        minWidth: 150,
        renderCell: ({ row }: { row: FingerprintMachine }) => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Cloud sx={{ fontSize: 16, mr: 1, color: "text.secondary" }} />
            <Typography variant="body2" fontFamily="monospace">
              {row.cloud_id}
            </Typography>
          </Box>
        ),
      },
      {
        field: "sn",
        headerName: "Serial Number",
        flex: 1.5,
        minWidth: 150,
        renderCell: ({ row }: { row: FingerprintMachine }) => (
          <Typography variant="body2" fontFamily="monospace">
            {row.sn}
          </Typography>
        ),
      },

      {
        field: "user_id",
        headerName: "User ID",
        flex: 1,
        minWidth: 100,
        renderCell: ({ row }: { row: FingerprintMachine }) => (
          <Typography variant="body2" fontWeight={500}>
            {row.user_id}
          </Typography>
        ),
      },
      {
        field: "last_activity",
        headerName: "Last Activity",
        flex: 1.5,
        minWidth: 150,
        type: "date",
      },
      {
        field: "actions",
        headerName: "Actions",
        flex: 1,
        minWidth: 120,
        align: "center",

        renderCell: ({ row }: { row: FingerprintMachine }) => (
          <TableAction row={row} onEdit={onEdit} onDelete={onDelete} />
        ),
      },
    ];

    return columns;
  }, [onEdit, onDelete]);
}
