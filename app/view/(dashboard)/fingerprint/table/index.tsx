"use client";
import PaginationSectionTableCustom from "@/app/components/comon/table/PaginationSectionTableCustom";
import { useGetDataPeriod } from "@/hooks/query/use-finger";
import { Add, Refresh, Search } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grow,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { AddDialog } from "../modal/add-dialog";
import { useTableColumns } from "./table-columns";

export const FingerprintTable = () => {
  // const [machines, setMachines] = useState<FingerprintMachine[]>(dataMachine);
  const { data: mesinFinger, isLoading, isFetching, refetch } = useGetDataPeriod();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [openAdd, setOpenAdd] = useState(false);
  const [pageSize, setPageSize] = useState(5);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });


  const columns = useTableColumns();

  console.log("mesinFinger", mesinFinger);

  const filteredMachines = mesinFinger?.filter(
    machine =>
      machine.device_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.SN.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recordsFiltered = filteredMachines?.length ?? 0;

  const start = page * pageSize;
  const end = start + pageSize;
  const paginatedRows = (filteredMachines || []).slice(start, end);

  const handleLimitChange = (limit: number) => {
    setPageSize(limit);
    setPage(0);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Calculate pagination
  // const totalRows = mesinFinger?.length || 0;

 const handleAdd = () => setOpenAdd(!openAdd);


  async function handleRefresh() {
    try {
      await refetch();
      toast.info("Data berhasil diperbarui!");

    } catch (_error) {
      toast.error("Gagal memperbarui data");

    }
  }

  // Reset page when search term changes
  React.useEffect(() => {
    setPage(0);
  }, [searchTerm]);

  return (
    <>
      <Grow in timeout={900}>
        <Box sx={{ mb: 3 }}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleAdd()}
              sx={{
                borderRadius: 2,
                background:
                  "linear-gradient(135deg, #0170B9 0%, #0288D1 50%, #03A9F4 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #01579B 0%, #0170B9 50%, #0288D1 100%)",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 12px rgba(1, 112, 185, 0.4)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Tambah Mesin
            </Button>

            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                size="small"
                placeholder="Cari mesin..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                sx={{
                  minWidth: 300,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#0170B9",
                      },
                    },
                    "&.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#0170B9",
                        borderWidth: 2,
                      },
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "#0170B9",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "#0170B9" }} />
                    </InputAdornment>
                  ),
                }}
              />
              {/* <Button
                variant="outlined"
                startIcon={<FilterList />}
                size="medium"
                sx={{
                  borderRadius: 2,
                  borderColor: "#0170B9",
                  color: "#0170B9",
                  "&:hover": {
                    borderColor: "#01579B",
                    backgroundColor: "rgba(1, 112, 185, 0.08)",
                    color: "#01579B",
                  },
                }}
              >
                Filter
              </Button> */}
              <Button
                variant="outlined"
                startIcon={isFetching ? <CircularProgress size={18} color="inherit" /> : <Refresh />}
                size="medium"
                sx={{
                  borderRadius: 2,
                  borderColor: "#0170B9",
                  color: "#0170B9",
                  "&:hover": {
                    borderColor: "#01579B",
                    backgroundColor: "rgba(1, 112, 185, 0.08)",
                    color: "#01579B",
                  },
                }}
                disabled={isFetching}
                onClick={handleRefresh}
              >
                Refresh
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Grow>

      <Box sx={{  width: "100%" }}>
        <DataGrid
          rows={paginatedRows}
          columns={columns}
          loading={isLoading || isFetching}
          getRowId={(row) => row.SN}
          showColumnVerticalBorder
          showCellVerticalBorder
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
          rowHeight={60}
          columnHeaderHeight={60}
          slots={{
            pagination: () => (
              <Box
                width="100%"
                paddingX={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginTop="0.75rem"
                marginBottom="0.75rem"
              >
                <PaginationSectionTableCustom
                  page={page}
                  pageSize={pageSize}
                  recordsFiltered={recordsFiltered}
                  handleLimitChange={handleLimitChange}
                  handlePageChange={handlePageChange}
                />
              </Box>
            ),
          }}
          sx={{
            // borderRadius: 3,
            border: "2px solid rgba(0,0,0,0.10)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
            "& .MuiDataGrid-columnHeaders": {
              background:
                "linear-gradient(135deg, rgba(1,112,185,0.08) 0%, rgba(3,169,244,0.08) 100%)",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 700,
            },
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: "rgba(0,0,0,0.02)",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "rgba(1,112,185,0.06)",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid rgba(0,0,0,0.05)",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid rgba(0,0,0,0.08)",
            },
          }}
        />
      </Box>

      {openAdd && (
        <AddDialog
          openDialog={openAdd}
          handleCloseDialog={handleAdd}
          handleSave={(_data) => {}}
        />
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
