"use client";

import { DeleteOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";
import React from "react";

interface ConfirmDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  itemName?: string;
  itemType?: string;
  loading?: boolean;
}

export const ModalConfirmDelete: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Delete",
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
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          padding: 0,
        },
      }}
    >
      <DialogContent sx={{ textAlign: "center", p: 4 }}>
        {/* Icon */}
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: "#ffebee",
            border: "2px solid #f44336",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <DeleteOutline sx={{ fontSize: 30, color: "#f44336" }} />
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: "1.25rem",
          }}
        >
          {title}
        </Typography>

        {/* Content */}
        <Typography variant="body1" sx={{ mb: 3, color: "#666" }}>
          {itemName ? (
            <>
              Apakah Anda yakin ingin menghapus {itemType} <strong>"{itemName}"</strong>?
            </>
          ) : (
            "Apakah Anda yakin ingin melakukan tindakan ini?"
          )}
        </Typography>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            onClick={onClose}
            variant="outlined"
            disabled={loading}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              borderColor: "#ccc",
              color: "#333",
              "&:hover": {
                borderColor: "#999",
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            disabled={loading}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              backgroundColor: "#f44336",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
          >
            {loading ? "Deleting..." : "Confirm"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
