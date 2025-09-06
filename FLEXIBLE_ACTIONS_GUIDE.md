# 🔧 CustomTable - Flexible Actions Configuration

## ✨ **Perubahan CustomTable Component**

CustomTable telah dimodifikasi untuk memberikan **fleksibilitas maksimal** dalam konfigurasi actions, menghilangkan hardcoded actions dan memungkinkan developer untuk mendefinisikan actions sesuai kebutuhan.

### 🎯 **Key Changes**

#### **1. Removed Hardcoded Actions**
- **Before**: Actions langsung di-set di dalam component dengan Edit, Delete, MoreVert
- **After**: Actions dapat dikonfigurasi sepenuhnya melalui `renderCell`

#### **2. Updated GridColumnDef Interface**
```typescript
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
  type?: 'string' | 'number' | 'date' | 'boolean' | 'custom'; // Removed 'actions'
  valueGetter?: (params: any) => any;
  valueFormatter?: (value: any) => string;
}
```

#### **3. Cleaned Default Renderers**
```typescript
const defaultCellRenderers = {
  string: (value: any) => <Typography variant="body2" noWrap>{value || '-'}</Typography>,
  number: (value: any) => <Typography variant="body2" noWrap>{value?.toLocaleString() || '0'}</Typography>,
  date: (value: any) => <Typography variant="body2" noWrap>{value ? new Date(value).toLocaleDateString() : '-'}</Typography>,
  boolean: (value: any) => <Chip label={value ? 'Yes' : 'No'} size="small" color={value ? 'success' : 'default'} variant="outlined" />,
  // Removed 'actions' renderer
};
```

### 🚀 **Flexible Actions Implementation**

#### **Basic Actions Example**
```typescript
{
  field: 'actions',
  headerName: 'Actions',
  flex: 1,
  minWidth: 120,
  align: 'right',
  renderCell: ({ row }) => (
    <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
      <IconButton
        size="small"
        onClick={() => handleEdit(row)}
        sx={{ color: 'primary.main' }}
      >
        <Edit />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => handleDelete(row.id)}
        sx={{ color: 'error.main' }}
      >
        <Delete />
      </IconButton>
    </Box>
  ),
}
```

#### **Advanced Actions Example**
```typescript
{
  field: 'actions',
  headerName: 'Actions',
  flex: 1.5,
  minWidth: 180,
  align: 'right',
  renderCell: ({ row }) => (
    <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
      <IconButton
        size="small"
        onClick={() => handleView(row)}
        sx={{ color: 'info.main' }}
        title="Lihat Detail"
      >
        <Visibility />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => handleEdit(row)}
        sx={{ color: 'primary.main' }}
        title="Edit"
      >
        <Edit />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => handleDownload(row)}
        sx={{ color: 'secondary.main' }}
        title="Download Data"
      >
        <Download />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => handleDelete(row.id)}
        sx={{ color: 'error.main' }}
        title="Hapus"
      >
        <Delete />
      </IconButton>
      <IconButton size="small" title="More Options">
        <MoreVert />
      </IconButton>
    </Box>
  ),
}
```

### 🎨 **Action Button Variations**

#### **1. Status-Based Actions**
```typescript
renderCell: ({ row }) => (
  <Box sx={{ display: 'flex', gap: 0.5 }}>
    {row.status === 'online' && (
      <IconButton size="small" onClick={() => handleSync(row)}>
        <Sync />
      </IconButton>
    )}
    {row.status === 'offline' && (
      <IconButton size="small" onClick={() => handleReconnect(row)}>
        <WifiOff />
      </IconButton>
    )}
    <IconButton size="small" onClick={() => handleEdit(row)}>
      <Edit />
    </IconButton>
  </Box>
)
```

#### **2. Permission-Based Actions**
```typescript
renderCell: ({ row }) => (
  <Box sx={{ display: 'flex', gap: 0.5 }}>
    <IconButton size="small" onClick={() => handleView(row)}>
      <Visibility />
    </IconButton>
    {userPermissions.canEdit && (
      <IconButton size="small" onClick={() => handleEdit(row)}>
        <Edit />
      </IconButton>
    )}
    {userPermissions.canDelete && (
      <IconButton size="small" onClick={() => handleDelete(row.id)}>
        <Delete />
      </IconButton>
    )}
  </Box>
)
```

#### **3. Contextual Actions**
```typescript
renderCell: ({ row }) => {
  const actions = [];
  
  if (row.type === 'machine') {
    actions.push(
      <IconButton key="config" size="small" onClick={() => handleConfigure(row)}>
        <Settings />
      </IconButton>
    );
  }
  
  if (row.status === 'maintenance') {
    actions.push(
      <IconButton key="complete" size="small" onClick={() => handleCompleteMaintenance(row)}>
        <CheckCircle />
      </IconButton>
    );
  }
  
  actions.push(
    <IconButton key="edit" size="small" onClick={() => handleEdit(row)}>
      <Edit />
    </IconButton>
  );
  
  return <Box sx={{ display: 'flex', gap: 0.5 }}>{actions}</Box>;
}
```

### 🎯 **Benefits of Flexible Actions**

#### **1. Complete Control**
- **Custom Actions**: Define any actions you need
- **Custom Styling**: Style buttons according to your design
- **Custom Logic**: Implement complex action logic
- **Custom Icons**: Use any Material-UI icons

#### **2. Better UX**
- **Tooltips**: Add helpful tooltips to buttons
- **Conditional Actions**: Show/hide actions based on data
- **Status Indicators**: Different actions for different states
- **Permission Control**: Actions based on user permissions

#### **3. Maintainability**
- **No Hardcoded Logic**: All actions defined in parent component
- **Easy Testing**: Test action handlers independently
- **Reusable**: Same table component for different use cases
- **Scalable**: Easy to add new actions without modifying table

### 📊 **Usage Examples**

#### **1. Simple CRUD Actions**
```typescript
const columns: GridColumnDef[] = [
  // ... other columns
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    align: 'right',
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <IconButton size="small" onClick={() => onEdit(row)}>
          <Edit />
        </IconButton>
        <IconButton size="small" onClick={() => onDelete(row.id)}>
          <Delete />
        </IconButton>
      </Box>
    ),
  },
];
```

#### **2. Multi-Action Menu**
```typescript
{
  field: 'actions',
  headerName: 'Actions',
  flex: 1,
  align: 'right',
  renderCell: ({ row }) => (
    <Menu>
      <IconButton size="small">
        <MoreVert />
      </IconButton>
      <MenuList>
        <MenuItem onClick={() => handleView(row)}>
          <ListItemIcon><Visibility /></ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleEdit(row)}>
          <ListItemIcon><Edit /></ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleDelete(row.id)}>
          <ListItemIcon><Delete /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  ),
}
```

#### **3. Action with Confirmation**
```typescript
{
  field: 'actions',
  headerName: 'Actions',
  flex: 1,
  align: 'right',
  renderCell: ({ row }) => (
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      <IconButton
        size="small"
        onClick={() => {
          if (confirm(`Delete ${row.name}?`)) {
            handleDelete(row.id);
          }
        }}
        sx={{ color: 'error.main' }}
      >
        <Delete />
      </IconButton>
    </Box>
  ),
}
```

### 🔧 **Migration Guide**

#### **From Old CustomTable**
```typescript
// Old way (hardcoded actions)
{
  field: 'actions',
  headerName: 'Actions',
  type: 'actions', // This was hardcoded
}

// New way (flexible actions)
{
  field: 'actions',
  headerName: 'Actions',
  renderCell: ({ row }) => (
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      <IconButton onClick={() => handleEdit(row)}>
        <Edit />
      </IconButton>
      <IconButton onClick={() => handleDelete(row.id)}>
        <Delete />
      </IconButton>
    </Box>
  ),
}
```

### 🎯 **Best Practices**

#### **1. Action Button Design**
- **Consistent Sizing**: Use `size="small"` for all action buttons
- **Color Coding**: Use semantic colors (primary, error, warning, info)
- **Tooltips**: Add helpful tooltips for better UX
- **Spacing**: Use consistent gap between buttons

#### **2. Action Logic**
- **Handler Functions**: Define clear handler functions
- **Error Handling**: Implement proper error handling
- **Loading States**: Show loading states for async actions
- **Confirmation**: Add confirmation for destructive actions

#### **3. Performance**
- **Memoization**: Use useCallback for action handlers
- **Conditional Rendering**: Only render necessary actions
- **Event Delegation**: Use proper event handling

---

**CustomTable sekarang memberikan kontrol penuh atas actions, memungkinkan developer untuk membuat tabel yang sesuai dengan kebutuhan spesifik aplikasi!** 🔧✨
