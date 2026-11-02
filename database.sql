CREATE DATABASE IF NOT EXISTS kafe_db;
USE kafe_db;

DROP TABLE IF EXISTS menu;
DROP TABLE IF EXISTS kategori;

CREATE TABLE kategori (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(50) NOT NULL
);

CREATE TABLE menu (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  kategori_id INT NOT NULL,
  harga INT NOT NULL,
  deskripsi VARCHAR(255),
  foto VARCHAR(255),
  FOREIGN KEY (kategori_id) REFERENCES kategori(id)
);

INSERT INTO kategori (nama) VALUES ('kopi'), ('non-kopi'), ('makanan'), ('dessert');

INSERT INTO menu (nama, kategori_id, harga, deskripsi, foto) VALUES
('Kopi Susu Gula Aren', 1, 22000, 'Espresso dengan susu segar dan manisnya gula aren.', '/img/kopi-susu.jpg'),
('Caramel Latte', 1, 26000, 'Latte lembut dengan sirup karamel dan sedikit foam.', '/img/caramel-latte.jpg'),
('Es Americano', 1, 20000, 'Espresso dingin dengan air dan es, segar dan tegas.', '/img/Es%20Americano.jpg'),
('Cappuccino', 1, 24000, 'Espresso dengan susu steam dan foam tebal yang lembut.', '/img/Cappuccino.jpg'),
('Matcha Latte', 2, 25000, 'Matcha creamy dengan susu, pas untuk yang tidak minum kopi.', '/img/matcha.jpg'),
('Strawberry Milk', 2, 20000, 'Susu dingin dengan saus stroberi asli.', '/img/strawberry-milk.jpg'),
('Matcha Strawberry', 2, 28000, 'Perpaduan matcha dan saus stroberi, manis dan segar.', '/img/matcha-strawberry.jpg'),
('Strawberry Smoothie', 2, 23000, 'Stroberi blender dengan es, ringan dan menyegarkan.', '/img/strawberry-smoothie.jpg'),
('Croissant Butter', 3, 18000, 'Croissant renyah dengan aroma butter, dipanggang segar.', '/img/croissant.jpg'),
('Nasi Ayam Sambal Matah', 3, 32000, 'Ayam suwir dengan sambal matah khas Bali dan nasi hangat.', '/img/nasi-ayam.jpg'),
('Croissant Keju', 3, 22000, 'Croissant dengan potongan keju gurih yang meleleh.', '/img/croissant-keju.jpg'),
('Nasi Ayam Goreng Mentega', 3, 30000, 'Ayam goreng gurih dengan nasi hangat dan taburan bawang.', '/img/ayam-mentega.jpg'),
('Cheesecake Blueberry', 4, 28000, 'Cheesecake lembut dengan topping saus blueberry.', '/img/cheesecake.jpg'),
('Pudding Coklat', 4, 15000, 'Pudding coklat halus dengan vla vanila.', '/img/pudding.jpg'),
('Cheesecake Original', 4, 26000, 'Cheesecake klasik yang creamy di atas dasar biskuit renyah.', '/img/cheesecake-original.jpg'),
('Pudding Coklat Jeruk', 4, 18000, 'Pudding coklat dengan saus coklat dan irisan jeruk segar.', '/img/pudding-jeruk.jpg');