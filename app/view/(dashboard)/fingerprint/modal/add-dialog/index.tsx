import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { FingerprintMachine } from "../../utils/type";

interface AddDialogProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  editingMachine: FingerprintMachine | null;
  formData: Partial<FingerprintMachine>;
  setFormData: (data: Partial<FingerprintMachine>) => void;
  handleSave: () => void;
}


export const AddDialog = ({ openDialog, handleCloseDialog, editingMachine, formData, setFormData, handleSave }: AddDialogProps) => {
  
  return (
    <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          },
        }}
      >
        <DialogTitle sx={{ pb: 1, fontWeight: 'bold', fontSize: '1.25rem' }}>
          {editingMachine ? 'Edit Mesin Fingerprint' : 'Tambah Mesin Fingerprint'}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {editingMachine ? 'Perbarui informasi mesin' : 'Tambahkan mesin fingerprint baru ke sistem'}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Device Name"
            fullWidth
            variant="outlined"
            value={formData.device_name}
            onChange={(e) => setFormData({ ...formData, device_name: e.target.value })}
            sx={{ mb: 2, borderRadius: 2 }}
          />
          <TextField
            margin="dense"
            label="Device Type Name"
            fullWidth
            variant="outlined"
            value={formData.device_type_name}
            onChange={(e) => setFormData({ ...formData, device_type_name: e.target.value })}
            sx={{ mb: 2, borderRadius: 2 }}
          />
          <TextField
            margin="dense"
            label="Cloud ID"
            fullWidth
            variant="outlined"
            value={formData.cloud_id}
            onChange={(e) => setFormData({ ...formData, cloud_id: e.target.value })}
            sx={{ mb: 2, borderRadius: 2 }}
          />
          <TextField
            margin="dense"
            label="Serial Number"
            fullWidth
            variant="outlined"
            value={formData.sn}
            onChange={(e) => setFormData({ ...formData, sn: e.target.value })}
            sx={{ mb: 2, borderRadius: 2 }}
          />
          <TextField
            margin="dense"
            label="User ID"
            fullWidth
            variant="outlined"
            type="number"
            value={formData.user_id}
            onChange={(e) => setFormData({ ...formData, user_id: parseInt(e.target.value) || 0 })}
            sx={{ mb: 2, borderRadius: 2 }}
          />
          <TextField
            margin="dense"
            label="Webhook URL"
            fullWidth
            variant="outlined"
            value={formData.webhook_url}
            onChange={(e) => setFormData({ ...formData, webhook_url: e.target.value })}
            sx={{ mb: 2, borderRadius: 2 }}
          />
          <TextField
            margin="dense"
            label="Server ID"
            fullWidth
            variant="outlined"
            type="number"
            value={formData.server_id}
            onChange={(e) => setFormData({ ...formData, server_id: parseInt(e.target.value) || 0 })}
            sx={{ mb: 2, borderRadius: 2 }}
          />
          <TextField
            margin="dense"
            label="Device Type ID"
            fullWidth
            variant="outlined"
            type="number"
            value={formData.device_type_id}
            onChange={(e) => setFormData({ ...formData, device_type_id: parseInt(e.target.value) || 0 })}
            sx={{ borderRadius: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={handleCloseDialog} sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
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
            {editingMachine ? 'Update' : 'Tambah'}
          </Button>
        </DialogActions>
      </Dialog>
  );
};
