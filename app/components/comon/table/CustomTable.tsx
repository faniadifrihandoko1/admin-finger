'use client';

import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
  Stack,
  Pagination,
  Select,
  MenuItem,
} from '@mui/material';

export interface GridColumnDef {
  field: string;
  headerName: string;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  flex?: number;
  sortable?: boolean;
  filterable?: boolean;
  renderCell?: (params: any) => React.ReactNode;
  renderHeader?: (params: any) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  headerAlign?: 'left' | 'center' | 'right';
  type?: 'string' | 'number' | 'date' | 'boolean' | 'custom';
  valueGetter?: (params: any) => any;
  valueFormatter?: (value: any) => string;
}

export interface CustomTableProps {
  columns: GridColumnDef[];
  rows: any[];
  loading?: boolean;
  pagination?: boolean;
  page?: number;
  pageSize?: number;
  totalRows?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onRowClick?: (row: any) => void;
  onRowDoubleClick?: (row: any) => void;
  getRowId?: (row: any) => string | number;
  rowHeight?: number;
  headerHeight?: number;
  showCheckbox?: boolean;
  selectedRows?: any[];
  onSelectionChange?: (selectedRows: any[]) => void;
  sx?: any;
  className?: string;
}

// Default cell renderers
const defaultCellRenderers = {
  string: (value: any) => (
    <Typography variant="body2" noWrap>
      {value || '-'}
    </Typography>
  ),
  number: (value: any) => (
    <Typography variant="body2" noWrap>
      {value?.toLocaleString() || '0'}
    </Typography>
  ),
  date: (value: any) => (
    <Typography variant="body2" noWrap>
      {value ? new Date(value).toLocaleDateString() : '-'}
    </Typography>
  ),
  boolean: (value: any) => (
    <Chip
      label={value ? 'Yes' : 'No'}
      size="small"
      color={value ? 'success' : 'default'}
      variant="outlined"
    />
  ),
};

// Default header renderer
const defaultHeaderRenderer = (column: GridColumnDef) => (
  <Typography variant="subtitle2" fontWeight={600}>
    {column.headerName}
  </Typography>
);

export default function CustomTable({
  columns,
  rows,
  loading = false,
  pagination = true,
  page = 0,
  pageSize = 10,
  totalRows,
  onPageChange,
  onPageSizeChange,
  onRowClick,
  onRowDoubleClick,
  getRowId = (row) => row.id,
  rowHeight = 52,
  headerHeight = 56,
  showCheckbox = false,
  selectedRows = [],
  onSelectionChange,
  sx = {},
  className = '',
}: CustomTableProps) {
  const totalPages = totalRows ? Math.ceil(totalRows / pageSize) : Math.ceil(rows.length / pageSize);
  const actualTotalRows = totalRows || rows.length;

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage - 1); // Convert to 0-based
    }
  };

  const handlePageSizeChange = (event: any) => {
    if (onPageSizeChange) {
      onPageSizeChange(event.target.value);
    }
  };

  const renderCell = (column: GridColumnDef, row: any, rowIndex: number) => {
    const value = column.valueGetter ? column.valueGetter({ row, value: row[column.field] }) : row[column.field];
    const formattedValue = column.valueFormatter ? column.valueFormatter(value) : value;

    if (column.renderCell) {
      return column.renderCell({ row, value, formattedValue, rowIndex });
    }

    if (column.type && defaultCellRenderers[column.type as keyof typeof defaultCellRenderers]) {
      return defaultCellRenderers[column.type as keyof typeof defaultCellRenderers](formattedValue);
    }

    return defaultCellRenderers.string(formattedValue);
  };

  const renderHeader = (column: GridColumnDef) => {
    if (column.renderHeader) {
      return column.renderHeader({ column });
    }
    return defaultHeaderRenderer(column);
  };

  const getColumnWidth = (column: GridColumnDef) => {
    if (column.width) return column.width;
    if (column.flex) return `${column.flex}fr`;
    return 'auto';
  };

  const getColumnStyle = (column: GridColumnDef) => {
    const style: any = {
      minWidth: column.minWidth || 100,
      maxWidth: column.maxWidth,
      width: getColumnWidth(column),
      textAlign: column.align || 'left',
    };

    if (column.flex) {
      style.flex = column.flex;
    }

    return style;
  };

  return (
    <Paper
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,249,255,0.9) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        ...sx,
      }}
      className={className}
    >
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  sx={{
                    height: headerHeight,
                    fontWeight: 600,
                    textAlign: column.headerAlign || column.align || 'left',
                    ...getColumnStyle(column),
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                  }}
                >
                  {renderHeader(column)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Loading...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No data available
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, rowIndex) => (
                <TableRow
                  key={getRowId(row)}
                  hover
                  onClick={() => onRowClick?.(row)}
                  onDoubleClick={() => onRowDoubleClick?.(row)}
                  sx={{
                    height: rowHeight,
                    cursor: onRowClick ? 'pointer' : 'default',
                    '&:hover': {
                      backgroundColor: 'rgba(46, 125, 50, 0.04)',
                    },
                    '&:last-child td': {
                      borderBottom: 0,
                    },
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
                      sx={{
                        height: rowHeight,
                        textAlign: column.align || 'left',
                        ...getColumnStyle(column),
                        borderBottom: '1px solid rgba(0,0,0,0.05)',
                      }}
                    >
                      {renderCell(column, row, rowIndex)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination && rows.length > 0 && (
        <Box sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Menampilkan {page * pageSize + 1} - {Math.min((page + 1) * pageSize, actualTotalRows)} dari {actualTotalRows} data
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="body2" color="text.secondary">
                Rows per page:
              </Typography>
              <Select
                value={pageSize}
                onChange={handlePageSizeChange}
                size="small"
                sx={{ minWidth: 60 }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
              <Pagination
                count={totalPages}
                page={page + 1}
                onChange={handlePageChange}
                color="primary"
                size="small"
                showFirstButton
                showLastButton
                sx={{
                  '& .MuiPaginationItem-root': {
                    borderRadius: 2,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(46, 125, 50, 0.1)',
                    },
                  },
                }}
              />
            </Stack>
          </Stack>
        </Box>
      )}
    </Paper>
  );
}
