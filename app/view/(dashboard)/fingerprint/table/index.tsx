import CustomTable from "@/app/components/comon/table/CustomTable";
import { useTableColumns } from "./table-columns";
import { useState } from "react";
import { FingerprintMachine } from "../utils/type";
import { AddDialog } from "../modal/add-dialog";
import { dataMachine } from "../utils/data";
import { Alert, Box, Button, Grow, InputAdornment, Snackbar, Stack, TextField } from "@mui/material";
import { FilterList, Refresh, Search, Add } from "@mui/icons-material";



export const FingerprintTable = () => {
    const [machines, setMachines] = useState<FingerprintMachine[]>(dataMachine);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [openAdd, setOpenAdd] = useState(false);
    const [pageSize, setPageSize] = useState(5);
    const [editingMachine, setEditingMachine] = useState<FingerprintMachine | null>(null);
    const [formData, setFormData] = useState<Partial<FingerprintMachine>>({
      name: '',
      location: '',
      ipAddress: '',
      status: 'online',
      model: '',
      serialNumber: '',
    });
    const [snackbar, setSnackbar] = useState({ 
      open: false, 
      message: '', 
      severity: 'success' as 'success' | 'error' 
    });

    const columns = useTableColumns({
      onEdit: handleOpenDialog,
      onDelete: handleDelete,
    });

    const filteredMachines = machines.filter(machine =>
      machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleOpenDialog(machine?: FingerprintMachine) {
      if (machine) {
        setEditingMachine(machine);
        setFormData({
          name: machine.name,
          location: machine.location,
          ipAddress: machine.ipAddress,
          status: machine.status,
          model: machine.model,
          serialNumber: machine.serialNumber,
          id: machine.id,
          lastSync: machine.lastSync,
          totalUsers: machine.totalUsers,
          registeredUsers: machine.registeredUsers,
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
          id: '',
          lastSync: '',
          totalUsers: 0,
          registeredUsers: 0,
        });
      }
      setOpenAdd(true);
    }

    function handleCloseDialog() {
      setOpenAdd(false);
      setEditingMachine(null);
      setFormData({
        name: '',
        location: '',
        ipAddress: '',
        status: 'online',
        model: '',
        serialNumber: '',
        id: '',
        lastSync: '',
        totalUsers: 0,
        registeredUsers: 0,
      });
    }

    function handleSave() {
      if (editingMachine) {
        setMachines(prev => prev.map(machine =>
          machine.id === editingMachine.id
            ? { ...machine, ...formData, lastSync: new Date().toLocaleString() }
            : machine
        ));
        setSnackbar({ open: true, message: 'Mesin berhasil diperbarui!', severity: 'success' });
      } else {
        const newMachine: FingerprintMachine = {
          ...formData as FingerprintMachine,
          id: (machines.length + 1).toString(),
          lastSync: new Date().toLocaleString(),
          totalUsers: 0,
          registeredUsers: 0,
        };
        setMachines(prev => [...prev, newMachine]);
        setSnackbar({ open: true, message: 'Mesin berhasil ditambahkan!', severity: 'success' });
      }
      handleCloseDialog();
    }

    function handleDelete(id: string) {
      setMachines(prev => prev.filter(machine => machine.id !== id));
      setSnackbar({ open: true, message: 'Mesin berhasil dihapus!', severity: 'success' });
    }

    function handleRefresh() {
      // In a real app, this would fetch fresh data from API
      setMachines([...dataMachine]);
      setSnackbar({ open: true, message: 'Data berhasil diperbarui!', severity: 'success' });
    }


    return (
      <>
        <Grow in timeout={900}>
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                size="small"
                placeholder="Cari mesin..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  minWidth: 300,
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
                onClick={handleRefresh}
              >
                Refresh
              </Button>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenDialog()}
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
                Tambah Mesin
              </Button>
            </Stack>
          </Box>
        </Grow>

        <CustomTable
          columns={columns}
          rows={filteredMachines}
          pagination={true}
          page={page}
          pageSize={pageSize}
          totalRows={filteredMachines.length}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onRowClick={(row) => console.log('Row clicked:', row)}
          getRowId={(row) => row.id}
          rowHeight={60}
          headerHeight={56}
        />
        
        {openAdd && (
          <AddDialog 
            openDialog={openAdd} 
            handleCloseDialog={handleCloseDialog} 
            editingMachine={editingMachine} 
            formData={formData} 
            setFormData={setFormData} 
            handleSave={handleSave} 
          />
        )}
        
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
      </>
    );
  };