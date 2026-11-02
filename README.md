# Tugas 3 Pemrograman Web - CRUD Menu Kafe (MySQL)

Nama: Sendhy Nabila Pramesty
NIM: 42530011
Tema: A (Daftar Menu Kafe)

Video penjelasan: [https://www.youtube.com/watch?v=vYWL2i1Lvk4]

## Cara Menjalankan

1. `npm install`
2. Impor `database.sql` ke MySQL (lewat MySQL Workbench: File → Open SQL Script, lalu jalankan)
3. Salin `.env.example` menjadi `.env`, lalu isi password MySQL
4. `node app.js`, lalu buka http://localhost:3000

## Fitur

- CRUD menu kafe: Create, Read, Update, Delete
- Relasi tabel `menu` ke tabel `kategori` (foreign key)
- Filter menu berdasarkan kategori
- MySQL Connection Pool (`mysql2/promise`)
- Semua query memakai prepared statements (`?`)
- Konfigurasi database lewat file `.env`
- Pola Post-Redirect-Get pada tambah, ubah, dan hapus