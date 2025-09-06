# Admin Fingerprint System

Sistem manajemen fingerprint untuk admin yang dibangun dengan Next.js dan Material UI.

## Fitur

### 🔐 Halaman Login
- Desain modern dengan Material UI
- Form login dengan validasi
- Animasi loading saat proses login
- Demo credentials: `admin` / `admin123`

### 📊 Dashboard Admin
- **Statistik Overview**: Menampilkan jumlah user yang terdaftar, pending, dan belum terdaftar
- **User Management**: Tabel lengkap dengan data user
- **Search & Filter**: Pencarian dan filter user berdasarkan nama, email, atau departemen
- **Add User**: Dialog untuk menambah user baru
- **Responsive Design**: Mendukung mobile dan desktop
- **Sidebar Navigation**: Menu navigasi yang mudah digunakan

### 🛡️ Authentication & Security
- Protected routes dengan komponen `ProtectedRoute`
- Session management menggunakan localStorage
- Auto-redirect berdasarkan status authentication

## Teknologi yang Digunakan

- **Next.js 15** - React framework
- **Material UI v7** - UI component library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework

## Struktur Proyek

```
finger-app/
├── app/
│   ├── components/
│   │   └── ProtectedRoute.tsx    # Komponen untuk melindungi route
│   ├── dashboard/
│   │   └── page.tsx              # Halaman dashboard admin
│   ├── login/
│   │   └── page.tsx              # Halaman login
│   ├── layout.tsx                # Root layout dengan Material UI theme
│   └── page.tsx                  # Halaman utama (redirect)
```

## Cara Menjalankan

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Jalankan development server**:
   ```bash
   npm run dev
   ```

3. **Buka browser**:
   ```
   http://localhost:3000
   ```

## Cara Menggunakan

1. **Login**: Akses aplikasi akan langsung redirect ke halaman login
2. **Masukkan credentials**: Gunakan `admin` / `admin123` untuk demo
3. **Dashboard**: Setelah login berhasil, Anda akan diarahkan ke dashboard
4. **Keluar**: Klik avatar di pojok kanan atas dan pilih "Logout"

## Fitur Dashboard

### Statistik Cards
- **Registered**: Jumlah user dengan fingerprint terdaftar
- **Pending**: Jumlah user dengan status pending
- **Not Registered**: Jumlah user yang belum terdaftar
- **Total Users**: Total semua user

### User Management Table
- **Nama**: Nama lengkap user dengan avatar
- **Email**: Alamat email user
- **Department**: Departemen user
- **Fingerprint Status**: Status dengan chip berwarna
- **Last Access**: Waktu akses terakhir
- **Actions**: Menu untuk aksi tambahan

### Search & Filter
- **Search**: Pencarian berdasarkan nama, email, atau departemen
- **Filter**: Filter data (dapat dikembangkan lebih lanjut)
- **Add User**: Tombol untuk menambah user baru

## Customization

### Theme
Theme Material UI dapat disesuaikan di `app/layout.tsx`:

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',  // Warna primary
    },
    secondary: {
      main: '#764ba2',  // Warna secondary
    },
  },
});
```

### Data Sample
Data user sample dapat diubah di `app/dashboard/page.tsx` dalam fungsi `useEffect`.

## Development

### Menambah Fitur Baru
1. Buat komponen baru di folder `app/components/`
2. Tambahkan route baru di folder `app/`
3. Update navigation di sidebar dashboard jika diperlukan

### Authentication
Saat ini menggunakan localStorage untuk demo. Untuk production, ganti dengan:
- JWT tokens
- Session management
- API authentication
- Database integration

## License

MIT License - bebas digunakan untuk keperluan komersial maupun non-komersial.