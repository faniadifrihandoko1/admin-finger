import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { fingerprintMachineSchema, FingerprintMachineFormData } from "../../schema/fingerprint-machine";
import { FingerprintMachine } from "../../utils/type";
import { zodResolver } from "@hookform/resolvers/zod";


interface AddDialogProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  editingMachine: FingerprintMachine | null;
  handleSave: (data: FingerprintMachineFormData) => void;
}


export const AddDialog = ({ openDialog, handleCloseDialog, editingMachine, handleSave }: AddDialogProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FingerprintMachineFormData>({
    resolver: zodResolver(fingerprintMachineSchema),
    defaultValues: {
      cloudId: editingMachine?.cloud_id || '',
      serialNumber: editingMachine?.sn || '',
      machineName: editingMachine?.device_name || '',
      webhookUrl: editingMachine?.webhook_url || '',
    },
  });

  const onSubmit = (data: FingerprintMachineFormData) => {
    handleSave(data);
    reset();
  };

  const handleClose = () => {
    reset();
    handleCloseDialog();
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="cloudId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  margin="dense"
                  label="Cloud ID"
                  fullWidth
                  required
                  variant="outlined"
                  placeholder="Isikan Cloud ID Mesin Absensi"
                  error={!!errors.cloudId}
                  helperText={errors.cloudId?.message}
                  sx={{ mb: 2, borderRadius: 2 }}
                />
              )}
            />
            <Controller
              name="serialNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label="Nomor Seri"
                  fullWidth
                  required
                  variant="outlined"
                  placeholder="Isikan Nomor Seri Mesin Absensi"
                  error={!!errors.serialNumber}
                  helperText={errors.serialNumber?.message}
                  sx={{ mb: 2, borderRadius: 2 }}
                />
              )}
            />
            <Controller
              name="machineName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label="Nama Mesin Absensi"
                  fullWidth
                  required
                  variant="outlined"
                  placeholder="Isi nama mesin absensi"
                  error={!!errors.machineName}
                  helperText={errors.machineName?.message}
                  sx={{ mb: 2, borderRadius: 2 }}
                />
              )}
            />
            {editingMachine && (
              <Controller
                name="webhookUrl"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="dense"
                    label="Webhook URL"
                    fullWidth
                    variant="outlined"
                    placeholder="https://example.com/webhook (opsional)"
                    error={!!errors.webhookUrl}
                    helperText={errors.webhookUrl?.message || 'URL untuk menerima notifikasi dari mesin (opsional)'}
                    sx={{ mb: 2, borderRadius: 2 }}
                  />
                )}
              />
            )}
          </form>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={handleClose} sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            sx={{
              borderRadius: 2,
              background: 'linear-gradient(135deg, #0170B9 0%, #0288D1 50%, #03A9F4 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #01579B 0%, #0170B9 50%, #0288D1 100%)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(1, 112, 185, 0.4)',
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
