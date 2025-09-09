import { MesinFingerData } from "@/hooks/query/use-finger";


import {
  Box,
  Tooltip,
  Typography,
} from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useMemo } from "react";
import { TableAction } from "./table-action";







export function useTableColumns() {
  return useMemo(() => {
    const columns: GridColDef[] = [
      {
        field: "ClientName",
        headerName: "Client Name",
        flex: 1.5,
        minWidth: 150,
        headerAlign: "center",
        align: "center",
        display: "flex",
        renderCell: (params: GridRenderCellParams<MesinFingerData>) => (
            <Tooltip title={params.row.ClientName} placement="top" arrow>
              <Typography variant="body2" fontFamily="monospace" noWrap>
                {params.row.ClientName}
              </Typography>
            </Tooltip>
        ),
      },
      {
        field: "device_name",
        headerName: "Nama Mesin",
        flex: 2,
        minWidth: 200,
        headerAlign: "center",
        align: "center",
        display: "flex",
        renderCell: (params: GridRenderCellParams<MesinFingerData>) => (
          <Box sx={{ display: "flex", alignItems: "center", marginLeft: 2 }}>

            <Box>
              <Tooltip title={params.row.device_name} placement="top" arrow>
                <Typography variant="body2" fontWeight={500} noWrap>
                  {params.row.device_name}
                </Typography>
              </Tooltip>

            </Box>
          </Box>
        ),
      },
      {
        field: "SN",
        headerName: "Nomor Seri",
        flex: 1.5,
        minWidth: 150,
        align: "center",
        headerAlign: "center",
        display: "flex",
        renderCell: (params: GridRenderCellParams<MesinFingerData>) => (
            <Tooltip title={params.row.SN} placement="top" arrow>
              <Typography variant="body2" fontFamily="monospace" noWrap>
                {params.row.SN}
              </Typography>
            </Tooltip>
        ),
      },
      {
        field: "ip_address",
        headerName: "IP Address",
        align: "center",
        headerAlign: "center",
        display: "flex",
        flex: 1,
        minWidth: 100,
        renderCell: (params: GridRenderCellParams<MesinFingerData>) => (
          <Typography variant="body2" textAlign={"center"} fontWeight={500} noWrap>
            {params.row.ip_address || "-"}
          </Typography>
        ),
      },
      {
        field: "lastUpdate_at",
        headerName: "Last Activity",
        flex: 1.5,
        minWidth: 150,
        align: "center",
        headerAlign: "center",
        display: "flex",
        type: "date",
        valueGetter: (params: any) => {
          const value = params.value as string | undefined;
          return value ? new Date(value) : null;
        },
        renderCell: (params: GridRenderCellParams<MesinFingerData>) => (
          <Typography variant="body2" fontWeight={500}>
            {params.row.lastUpdate_at ? dayjs(params.row.lastUpdate_at as unknown as Date).format("DD MMMM YYYY") : "-"}
          </Typography>
        ),
      },
      {
        field: "actions",
        headerName: "Actions",
        flex: 1,
        minWidth: 120,
        align: "center",
        headerAlign: "center",
        display: "flex",
        sortable: false,

        renderCell: (params: GridRenderCellParams<MesinFingerData>) => (
          <TableAction row={params.row as unknown as MesinFingerData}  />
        ),
      },
    ];

    return columns;
  }, []);
}
