"use client";

import { Box, MenuItem, Pagination, Select, Stack, Typography } from "@mui/material";
import React from "react";

export interface PaginationSectionTableCustomProps {
	page: number; // 0-based page index
	pageSize: number;
	recordsFiltered: number; // total rows available after filters
	handleLimitChange: (limit: number) => void; // page size change
	handlePageChange: (page: number) => void; // 0-based page change
}

export const PaginationSectionTableCustom: React.FC<PaginationSectionTableCustomProps> = ({
	page,
	pageSize,
	recordsFiltered,
	handleLimitChange,
	handlePageChange,
}) => {
	const totalRows = Math.max(0, recordsFiltered || 0);
	const safePageSize = Math.max(1, pageSize || 1);
	const totalPages = Math.max(1, Math.ceil(totalRows / safePageSize));

	const from = totalRows === 0 ? 0 : page * safePageSize + 1;
	const to = Math.min((page + 1) * safePageSize, totalRows);

	const onMuiPageChange = (_event: React.ChangeEvent<unknown>, newPageOneBased: number) => {
		// Convert MUI Pagination (1-based) to 0-based
		handlePageChange(newPageOneBased - 1);
	};

	const onLimitChange = (event: any) => {
		const newLimit = Number(event.target.value) || safePageSize;
		handleLimitChange(newLimit);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Stack direction="row" justifyContent="space-between" alignItems="center">
				<Typography variant="body2" color="text.secondary">
					Menampilkan {from} - {to} dari {totalRows} data
				</Typography>
				<Stack direction="row" alignItems="center" spacing={2}>
					<Typography variant="body2" color="text.secondary">
						Rows per page:
					</Typography>
					<Select
						value={safePageSize}
						onChange={onLimitChange}
						size="small"
						sx={{
							minWidth: 60,
							width: 60,
							height: 32,
							"& .MuiOutlinedInput-notchedOutline": { borderColor: "#0170B9" },
							"&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#01579B" },
							"&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#0170B9", borderWidth: 2 },
							"& .MuiSelect-select": { padding: "4px 8px", fontSize: "0.875rem" },
						}}
					>
						<MenuItem value={5}>5</MenuItem>
						<MenuItem value={10}>10</MenuItem>
						<MenuItem value={25}>25</MenuItem>
						<MenuItem value={50}>50</MenuItem>
					</Select>
					<Pagination
						count={totalPages}
						page={Math.min(totalPages, Math.max(1, page + 1))}
						onChange={onMuiPageChange}
						color="primary"
						size="small"
						showFirstButton
						showLastButton
						sx={{
							"& .MuiPaginationItem-root": {
								borderRadius: 2,
								"&.Mui-selected": {
									backgroundColor: "#0170B9",
									color: "white",
									"&:hover": { backgroundColor: "#01579B" },
								},
								"&:hover": { backgroundColor: "rgba(1, 112, 185, 0.1)" },
							},
						}}
					/>
				</Stack>
			</Stack>
		</Box>
	);
};

export default PaginationSectionTableCustom;
