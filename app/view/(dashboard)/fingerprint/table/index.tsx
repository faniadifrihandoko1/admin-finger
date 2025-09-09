import CustomTable from "@/app/components/comon/table/CustomTable";
import { ConfirmDeleteDialog } from "@/app/components/comon/modal/modal-confirm-delete";
import { useTableColumns } from "./table-columns";
import React, { useState } from "react";
import { FingerprintMachine } from "../utils/type";
import { AddDialog } from "../modal/add-dialog";
import { dataMachine } from "../utils/data";
import { FingerprintMachineFormData } from "../schema/fingerprint-machine";
import {
  Alert,
  Box,
  Button,
  Grow,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { FilterList, Refresh, Search, Add } from "@mui/icons-material";

export const FingerprintTable = () => {
  const [machines, setMachines] = useState<FingerprintMachine[]>(dataMachine);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [openAdd, setOpenAdd] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [editingMachine, setEditingMachine] =
    useState<FingerprintMachine | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    machine: null as FingerprintMachine | null,
  });

  const columns = useTableColumns({
    onEdit: handleOpenDialog,
    onDelete: handleDelete,
  });

  const filteredMachines = machines.filter(
    machine =>
      machine.device_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.device_type_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      machine.cloud_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.sn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalRows = filteredMachines.length;
  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedMachines = filteredMachines.slice(startIndex, endIndex);

  function handleOpenDialog(machine?: FingerprintMachine) {
    setEditingMachine(machine || null);
    setOpenAdd(true);
  }

  function handleCloseDialog() {
    setOpenAdd(false);
    setEditingMachine(null);
  }

  function handleSave(data: FingerprintMachineFormData) {
    if (editingMachine) {
      setMachines(prev =>
        prev.map(machine =>
          machine.cloud_id === editingMachine.cloud_id
            ? {
                ...machine,
                device_name: data.machineName,
                cloud_id: data.cloudId,
                sn: data.serialNumber,
                webhook_url: data.webhookUrl || "",
                last_activity: new Date().toLocaleString(),
              }
            : machine
        )
      );
      setSnackbar({
        open: true,
        message: "Mesin berhasil diperbarui!",
        severity: "success",
      });
    } else {
      const newMachine: FingerprintMachine = {
        cloud_id: data.cloudId,
        sn: data.serialNumber,
        device_name: data.machineName,
        device_type_name: "Fingerprint Device",
        user_id: Math.floor(Math.random() * 1000),
        webhook_url: "", // Default empty for new machines
        server_id: 1,
        device_type_id: 1,
        img: "",
        url_: "",
        created_at: new Date().toLocaleString(),
        last_activity: new Date().toLocaleString(),
      };
      setMachines(prev => [...prev, newMachine]);
      setSnackbar({
        open: true,
        message: "Mesin berhasil ditambahkan!",
        severity: "success",
      });
    }
    handleCloseDialog();
  }

  function handleDelete(cloudId: string) {
    const machine = machines.find(m => m.cloud_id === cloudId);
    if (machine) {
      setDeleteDialog({ open: true, machine });
    }
  }

  function confirmDelete() {
    if (deleteDialog.machine) {
      setMachines(prev =>
        prev.filter(
          machine => machine.cloud_id !== deleteDialog.machine!.cloud_id
        )
      );
      setSnackbar({
        open: true,
        message: "Mesin berhasil dihapus!",
        severity: "success",
      });
      setDeleteDialog({ open: false, machine: null });
    }
  }

  function cancelDelete() {
    setDeleteDialog({ open: false, machine: null });
  }

  function handleRefresh() {
    // In a real app, this would fetch fresh data from API
    setMachines([...dataMachine]);
    setSnackbar({
      open: true,
      message: "Data berhasil diperbarui!",
      severity: "success",
    });
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
              onClick={() => handleOpenDialog()}
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
              <Button
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
              </Button>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
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
                onClick={handleRefresh}
              >
                Refresh
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Grow>

      <CustomTable
        columns={columns}
        rows={paginatedMachines}
        pagination={true}
        page={page}
        pageSize={pageSize}
        totalRows={totalRows}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onRowClick={row => console.log("Row clicked:", row)}
        getRowId={row => row.user_id}
        rowHeight={60}
        headerHeight={56}
      />

      {openAdd && (
        <AddDialog
          openDialog={openAdd}
          handleCloseDialog={handleCloseDialog}
          editingMachine={editingMachine}
          handleSave={handleSave}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        open={deleteDialog.open}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Hapus Mesin?"
        itemName={deleteDialog.machine?.device_name}
        itemType="mesin"
      />

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
