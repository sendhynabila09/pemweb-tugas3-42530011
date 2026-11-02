const express = require('express');
const path = require('path');
const pool = require('./db');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

// Halaman daftar + filter lewat Query Parameter (?kategori=kopi)
app.get('/', async (req, res) => {
  try {
    const kategoriAktif = (req.query.kategori || '').toLowerCase();

    let sql =
      'SELECT m.id, m.nama, k.nama AS kategori, m.harga, m.deskripsi, m.foto ' +
      'FROM menu m JOIN kategori k ON k.id = m.kategori_id';
    const params = [];

    if (kategoriAktif) {
      sql += ' WHERE k.nama = ?';
      params.push(kategoriAktif);
    }
    sql += ' ORDER BY m.id';

    const [hasil] = await pool.execute(sql, params);

    const [rowsKategori] = await pool.execute('SELECT nama FROM kategori ORDER BY id');
    const daftarKategori = rowsKategori.map((k) => k.nama);

    res.render('index', {
      judul: 'Menu Kafe',
      menu: hasil,
      daftarKategori: daftarKategori,
      kategoriAktif: kategoriAktif
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan pada server.');
  }
});

// CREATE: tampilkan form tambah menu
app.get('/menu/tambah', async (req, res) => {
  try {
    const [kategori] = await pool.execute('SELECT id, nama FROM kategori ORDER BY id');
    res.render('form', {
      judul: 'Tambah Menu',
      aksi: '/menu/tambah',
      item: { nama: '', kategori_id: '', harga: '', deskripsi: '', foto: '' },
      kategori: kategori
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan pada server.');
  }
});

// CREATE: terima data form, simpan ke database, lalu redirect
app.post('/menu/tambah', async (req, res) => {
  try {
    const { nama, kategori_id, harga, deskripsi, foto } = req.body;

    await pool.execute(
      'INSERT INTO menu (nama, kategori_id, harga, deskripsi, foto) VALUES (?, ?, ?, ?, ?)',
      [nama, kategori_id, harga, deskripsi, foto]
    );

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan pada server.');
  }
});

// UPDATE: tampilkan form edit, terisi data lama
app.get('/menu/:id/edit', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM menu WHERE id = ?', [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).render('not-found', {
        judul: 'Tidak Ditemukan',
        pesan: 'Menu dengan ID "' + req.params.id + '" tidak ditemukan.'
      });
    }

    const [kategori] = await pool.execute('SELECT id, nama FROM kategori ORDER BY id');
    res.render('form', {
      judul: 'Edit Menu',
      aksi: '/menu/' + rows[0].id + '/edit',
      item: rows[0],
      kategori: kategori
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan pada server.');
  }
});

// UPDATE: terima perubahan, simpan ke database, lalu redirect
app.post('/menu/:id/edit', async (req, res) => {
  try {
    const { nama, kategori_id, harga, deskripsi, foto } = req.body;

    await pool.execute(
      'UPDATE menu SET nama = ?, kategori_id = ?, harga = ?, deskripsi = ?, foto = ? WHERE id = ?',
      [nama, kategori_id, harga, deskripsi, foto, req.params.id]
    );

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan pada server.');
  }
});

// DELETE: hapus menu dari database, lalu redirect
app.post('/menu/:id/hapus', async (req, res) => {
  try {
    await pool.execute('DELETE FROM menu WHERE id = ?', [req.params.id]);

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan pada server.');
  }
});

// Halaman detail lewat Route Parameter (/menu/:id)
app.get('/menu/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT m.id, m.nama, k.nama AS kategori, m.harga, m.deskripsi, m.foto ' +
      'FROM menu m JOIN kategori k ON k.id = m.kategori_id WHERE m.id = ?',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).render('not-found', {
        judul: 'Tidak Ditemukan',
        pesan: 'Menu dengan ID "' + req.params.id + '" tidak ditemukan.'
      });
    }

    res.render('detail', { judul: rows[0].nama, item: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Terjadi kesalahan pada server.');
  }
});

// Rute lain yang tidak dikenal
app.use((req, res) => {
  res.status(404).render('not-found', {
    judul: 'Tidak Ditemukan',
    pesan: 'Halaman yang kamu cari tidak ada.'
  });
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});