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
      device_name: '',
      device_type_name: '',
      cloud_id: '',
      sn: '',
      user_id: 0,
      webhook_url: '',
      server_id: 0,
      device_type_id: 0,
      img: '',
      url_: '',
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
      machine.device_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.device_type_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.cloud_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.sn.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleOpenDialog(machine?: FingerprintMachine) {
      if (machine) {
        setEditingMachine(machine);
        setFormData({
          device_name: machine.device_name,
          device_type_name: machine.device_type_name,
          cloud_id: machine.cloud_id,
          sn: machine.sn,
          user_id: machine.user_id,
          webhook_url: machine.webhook_url,
          server_id: machine.server_id,
          device_type_id: machine.device_type_id,
          img: machine.img,
          url_: machine.url_,
          created_at: machine.created_at,
          last_activity: machine.last_activity,
        });
      } else {
        setEditingMachine(null);
        setFormData({
          device_name: '',
          device_type_name: '',
          cloud_id: '',
          sn: '',
          user_id: 0,
          webhook_url: '',
          server_id: 0,
          device_type_id: 0,
          img: '',
          url_: '',
        });
      }
      setOpenAdd(true);
    }

    function handleCloseDialog() {
      setOpenAdd(false);
      setEditingMachine(null);
      setFormData({
        device_name: '',
        device_type_name: '',
        cloud_id: '',
        sn: '',
        user_id: 0,
        webhook_url: '',
        server_id: 0,
        device_type_id: 0,
        img: '',
        url_: '',
      });
    }

    function handleSave() {
      if (editingMachine) {
        setMachines(prev => prev.map(machine =>
          machine.cloud_id === editingMachine.cloud_id
            ? { ...machine, ...formData, last_activity: new Date().toLocaleString() }
            : machine
        ));
        setSnackbar({ open: true, message: 'Mesin berhasil diperbarui!', severity: 'success' });
      } else {
        const newMachine: FingerprintMachine = {
          ...formData as FingerprintMachine,
          cloud_id: `C${Date.now().toString(16).toUpperCase()}`,
          created_at: new Date().toLocaleString(),
          last_activity: new Date().toLocaleString(),
        };
        setMachines(prev => [...prev, newMachine]);
        setSnackbar({ open: true, message: 'Mesin berhasil ditambahkan!', severity: 'success' });
      }
      handleCloseDialog();
    }

    function handleDelete(cloudId: string) {
      setMachines(prev => prev.filter(machine => machine.cloud_id !== cloudId));
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
                size="medium"
                sx={{ borderRadius: 2 }}
              >
                Filter
              </Button>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                size="medium"
                sx={{ borderRadius: 2 }}
                onClick={handleRefresh}
              >
                Refresh
              </Button>
              {/* <Button
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
              </Button> */}
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
          getRowId={(row) => row.user_id}
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