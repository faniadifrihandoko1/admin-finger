'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

interface ConfirmDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  itemName?: string;
  itemType?: string;
  loading?: boolean;
}

export const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Hapus Item?",
  itemName,
  itemType = "item",
  loading = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        },
      }}
    >
      <DialogTitle sx={{ 
        textAlign: 'center', 
        pb: 2,
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#d32f2f'
      }}>
        {title}
      </DialogTitle>
      
      <DialogContent sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Apakah Anda yakin ingin menghapus {itemType}:
        </Typography>
        {itemName && (
          <Typography variant="h6" fontWeight="bold" color="#0170B9" sx={{ mb: 2 }}>
            {itemName}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          Tindakan ini tidak dapat dibatalkan
        </Typography>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          disabled={loading}
          sx={{ 
            borderRadius: 2,
            flex: 1,
            py: 1,
            borderColor: '#0170B9',
            color: '#0170B9',
            '&:hover': {
              borderColor: '#01579B',
              backgroundColor: 'rgba(1, 112, 185, 0.08)',
            },
          }}
        >
          Batal
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={loading}
          sx={{
            borderRadius: 2,
            flex: 1,
            py: 1,
            backgroundColor: '#d32f2f',
            '&:hover': {
              backgroundColor: '#b71c1c',
            },
          }}
        >
          {loading ? 'Menghapus...' : 'Hapus'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
