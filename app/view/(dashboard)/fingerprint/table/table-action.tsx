import { ModalConfirmDelete } from "@/app/components/comon/modal/modal-confirm-delete";
import { MesinFingerData } from "@/hooks/query/use-finger";
import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import { EditDialog } from "../modal/edit-dialog";

interface TableActionProps {
  row: MesinFingerData;

}

export const TableAction = ({ row }: TableActionProps) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleEdit = () => setOpenEdit(!openEdit);
  const handleDelete = () => setOpenDelete(!openDelete);
  return (
    <Box
      sx={{
        display: "flex",
        gap: 0.5,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <IconButton
        size="small"
        onClick={handleEdit}
        // onClick={() => onEdit?.(row)}
        sx={{
          color: "#0170B9",
          "&:hover": {
            backgroundColor: "rgba(1, 112, 185, 0.08)",
            color: "#01579B",
          },
        }}
      >
        <Edit />
      </IconButton>
      <IconButton
        size="small"
        // onClick={() => onDelete?.(row.SN)}
        sx={{
          color: "#d32f2f",
          "&:hover": {
            backgroundColor: "rgba(211, 47, 47, 0.08)",
            color: "#b71c1c",
          },
        }}
      >
        <Delete />
      </IconButton>
      {openEdit && (
        <EditDialog
          openDialog={openEdit}
          handleCloseDialog={handleEdit}
          data={row}

        />
      )}
      {openDelete && (
        <ModalConfirmDelete
        onConfirm={() => {}}
        title="Hapus Mesin?"
        itemName={row.device_name}
        itemType="mesin"
        open={openDelete}
        onClose={handleDelete}
        />
      )}
    </Box>
  );
};
