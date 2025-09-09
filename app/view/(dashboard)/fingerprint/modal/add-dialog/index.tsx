import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import {
  FingerprintMachineFormData,
  fingerprintMachineSchema,
} from "../../schema/fingerprint-machine";

interface AddDialogProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleSave: (data: FingerprintMachineFormData) => void;
}

export const AddDialog = ({
  openDialog,
  handleCloseDialog,
  handleSave,
}: AddDialogProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FingerprintMachineFormData>({
    resolver: zodResolver(fingerprintMachineSchema),
    defaultValues: {
      SN:  "",
      device_name:  "",
      webHookLink:  "",
      ClientName:  "",
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
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        },
      }}
    >
      <DialogTitle sx={{ pb: 1, fontWeight: "bold", fontSize: "1.25rem" }}>
        Tambah Mesin Fingerprint
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Tambahkan mesin fingerprint baru ke sistem
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="ClientName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Nama Client"
                fullWidth
                required
                variant="outlined"
                placeholder="Isikan Nama Client Mesin Absensi"
                error={!!errors.ClientName}
                helperText={errors.ClientName?.message}
                sx={{ mb: 2, borderRadius: 2 }}
              />
            )}
          />
          <Controller
            name="SN"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Nomor Seri"
                fullWidth
                required
                variant="outlined"
                placeholder="Isikan Nomor S eri Mesin Absensi"
                error={!!errors.SN}
                helperText={errors.SN?.message}
                sx={{ mb: 2, borderRadius: 2 }}
              />
            )}
          />
          <Controller
            name="device_name"
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
                error={!!errors.device_name}
                helperText={errors.device_name?.message}
                sx={{ mb: 2, borderRadius: 2 }}
              />
            )}
          />
            <Controller
              name="webHookLink"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label="Webhook URL"
                  fullWidth
                  variant="outlined"
                  placeholder="https://example.com/webhook (opsional)"
                  error={!!errors.webHookLink}
                  helperText={
                    errors.webHookLink?.message ||
                    "URL untuk menerima notifikasi dari mesin (opsional)"
                  }
                  sx={{ mb: 2, borderRadius: 2 }}
                />
              )}
            />
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
          Tambah
        </Button>
      </DialogActions>
    </Dialog>
  );
};
