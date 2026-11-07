Crisanthera-Store — Feature Specification & Development Task

Project Planning
 User Side / Customer Application

Dokumen ini akan menjadi Product Requirement Document (PRD) sekaligus Development Task List untuk membangun Crisanthera-Store menggunakan Next.js.

Kita akan membagi pekerjaan menjadi beberapa Epic, Feature, Task, Acceptance Criteria, dan Prioritas agar setiap pekerjaan bisa dikerjakan secara bertahap.
1. Informasi proyek
Item	Spesifikasi
Project Name	Crisanthera-Store
Project Type	E-Commerce & Digital Marketplace
Frontend	Next.js + TypeScript
Styling	CSS Modules / Global CSS
Design System	Crisanthera Duality
Theme 1	Nihilux — Purple
Theme 2	Aha — Crimson
Database	PostgreSQL
Authentication	Auth.js atau solusi setara
Payment	Midtrans / Xendit
Storage	S3-compatible object storage
Deployment	Vercel + layanan backend pendukung

Tujuan utama: Membangun marketplace yang menjual dua jenis produk:
1. Anime Stickers — produk stiker fisik maupun digital.
2. Next.js Templates — template website berbasis Next.js yang dapat dibeli dan diunduh.
2. Struktur prioritas
Kita menggunakan tiga tingkatan prioritas:
Prioritas	Arti
P0	Wajib untuk peluncuran MVP
P1	Penting, dikerjakan setelah MVP
P2	Pengembangan lanjutan


3. Feature Specification
EPIC 01 — Design System & Character Theme
P0
Tujuan: Menciptakan identitas visual Crisanthera dengan dua karakter yang dapat mengubah keseluruhan atmosfer website.









Nihilux
Purple / Monochrome









Aha
Crimson / Pink

Feature specification
Feature	Deskripsi
Theme Selector	Mengganti karakter aktif
Dynamic Color	Seluruh warna mengikuti karakter
Dynamic Ornament	Dekorasi berubah sesuai karakter
Character Artwork	Menampilkan ilustrasi karakter
Theme Animation	Transisi pergantian tema
Theme Persistence	Menyimpan pilihan pengguna
Responsive Theme UI	Theme selector di desktop dan mobile

Development Tasks
- [ ] DS-001 — Membuat CSS Design Tokens.
- [ ] DS-002 — Membuat Nihilux Theme.
- [ ] DS-003 — Membuat Aha Theme.
- [ ] DS-004 — Membuat Global CSS.
- [ ] DS-005 — Membuat Typography System.
- [ ] DS-006 — Membuat Button System.
- [ ] DS-007 — Membuat Card System.
- [ ] DS-008 — Membuat Ornament Components Styling.
- [ ] DS-009 — Membuat Theme Transition.
- [ ] DS-010 — Membuat Responsive Theme Selector.
- [ ] DS-011 — Menguji konsistensi seluruh komponen pada kedua tema.
Acceptance Criteria
- Seluruh komponen menggunakan CSS variables.
- Pengguna dapat mengganti tema tanpa reload halaman.
- Tema tetap tersimpan setelah halaman dibuka kembali.
- Kedua tema memiliki warna dan dekorasi yang konsisten.
EPIC 02 — Homepage & Storefront
P0
Tujuan: Menampilkan identitas toko, kategori, promosi, dan produk unggulan.

Feature specification
Feature	Deskripsi
Hero Section	Banner utama dengan karakter
Navigation Bar	Navigasi halaman
Search Bar	Pencarian produk
Featured Products	Produk unggulan
New Arrivals	Produk terbaru
Best Sellers	Produk populer
Category Section	Dua kategori utama
Promotional Banner	Informasi promosi
Newsletter	Berlangganan informasi
Footer	Informasi toko dan tautan

Development Tasks
- [ ] HM-001 — Membuat Navbar.
- [ ] HM-002 — Membuat Logo dan Brand Identity.
- [ ] HM-003 — Membuat Hero Section.
- [ ] HM-004 — Integrasi Character Artwork.
- [ ] HM-005 — Membuat Category Section.
- [ ] HM-006 — Membuat Featured Product Section.
- [ ] HM-007 — Membuat New Arrivals Section.
- [ ] HM-008 — Membuat Best Seller Section.
- [ ] HM-009 — Membuat Promotional Banner.
- [ ] HM-010 — Membuat Newsletter Section.
- [ ] HM-011 — Membuat Footer.
- [ ] HM-012 — Optimasi Homepage untuk mobile.
Acceptance Criteria
- Pengunjung dapat mengakses katalog dari homepage.
- Kategori stiker dan template terlihat jelas.
- Produk unggulan berasal dari data produk.
- Homepage responsif.
EPIC 03 — Product Catalog & Discovery
P0
Tujuan: Memungkinkan pengguna menemukan produk secara cepat.

Feature specification
Feature	Deskripsi
Product Listing	Daftar seluruh produk
Category Filter	Filter kategori
Price Filter	Filter rentang harga
Search	Pencarian berdasarkan nama
Sorting	Mengurutkan produk
Pagination	Navigasi halaman katalog
Product Badge	Label produk
Empty State	Tampilan saat tidak ada hasil

Development Tasks
- [ ] CAT-001 — Membuat halaman katalog stiker.
- [ ] CAT-002 — Membuat halaman katalog template.
- [ ] CAT-003 — Membuat Product Card.
- [ ] CAT-004 — Membuat Search Functionality.
- [ ] CAT-005 — Membuat Category Filter.
- [ ] CAT-006 — Membuat Price Filter.
- [ ] CAT-007 — Membuat Sorting.
- [ ] CAT-008 — Membuat Pagination.
- [ ] CAT-009 — Membuat Loading State.
- [ ] CAT-010 — Membuat Empty State.
- [ ] CAT-011 — Membuat Mobile Product Grid.
Acceptance Criteria
- Pengguna dapat mencari produk.
- Filter dapat digunakan bersamaan.
- Sorting menghasilkan urutan yang benar.
- Hasil pencarian dapat diakses melalui URL.
EPIC 04 — Product Detail
P0
Tujuan: Memberikan informasi lengkap sebelum pengguna membeli produk.

Feature specification
Feature	Stiker	Template
Product Gallery	Ya	Ya
Product Description	Ya	Ya
Price	Ya	Ya
Variants	Ukuran / bahan	Versi / paket
Stock	Jumlah stok	Ketersediaan
Demo Preview	Foto produk	Live preview
Add to Cart	Ya	Ya
Wishlist	Ya	Ya
License	Jika relevan	Ya

Development Tasks
- [ ] PD-001 — Membuat Dynamic Product Route.
- [ ] PD-002 — Membuat Product Gallery.
- [ ] PD-003 — Membuat Product Information.
- [ ] PD-004 — Membuat Product Variant Selector.
- [ ] PD-005 — Membuat Stock Indicator.
- [ ] PD-006 — Membuat Template Live Preview.
- [ ] PD-007 — Membuat Related Products.
- [ ] PD-008 — Membuat Add to Cart.
- [ ] PD-009 — Membuat Buy Now.
- [ ] PD-010 — Membuat Product Metadata dan SEO.
Acceptance Criteria
- Setiap produk memiliki halaman detail unik.
- Informasi yang tampil sesuai jenis produk.
- Produk yang stoknya habis tidak dapat dibeli.
- Template memiliki informasi versi dan lisensi.
EPIC 05 — Authentication & Authorization
P0
Tujuan: Mengelola identitas dan akses pengguna.

Feature specification
Feature	Deskripsi
Register	Membuat akun
Login	Masuk ke akun
Logout	Keluar dari akun
Forgot Password	Meminta reset password
Reset Password	Mengatur password baru
Email Verification	Verifikasi email
Session Management	Mengelola sesi
Protected Routes	Melindungi halaman akun

Development Tasks
- [ ] AUTH-001 — Membuat halaman Register.
- [ ] AUTH-002 — Membuat halaman Login.
- [ ] AUTH-003 — Membuat Logout.
- [ ] AUTH-004 — Membuat Password Hashing.
- [ ] AUTH-005 — Membuat Email Verification.
- [ ] AUTH-006 — Membuat Forgot Password.
- [ ] AUTH-007 — Membuat Reset Password.
- [ ] AUTH-008 — Membuat Session Management.
- [ ] AUTH-009 — Membuat Protected Routes.
- [ ] AUTH-010 — Menguji autentikasi dan otorisasi.
Acceptance Criteria
- Pengguna dapat membuat akun dan login.
- Password tidak disimpan dalam bentuk plaintext.
- Pengguna hanya dapat mengakses data miliknya.
- Halaman yang membutuhkan autentikasi terlindungi.
EPIC 06 — Shopping Cart
P0
Tujuan: Mengelola produk yang ingin dibeli pengguna.

Feature specification
Feature	Deskripsi
Add to Cart	Menambahkan produk
Remove Item	Menghapus produk
Update Quantity	Mengubah jumlah
Cart Summary	Ringkasan belanja
Subtotal	Menghitung subtotal
Stock Validation	Memvalidasi stok
Mixed Cart	Menggabungkan produk fisik dan digital
Cart Persistence	Menyimpan keranjang

Development Tasks
- [ ] CART-001 — Membuat Cart Page.
- [ ] CART-002 — Membuat Cart Item Component.
- [ ] CART-003 — Membuat Add to Cart Function.
- [ ] CART-004 — Membuat Remove Item Function.
- [ ] CART-005 — Membuat Quantity Controller.
- [ ] CART-006 — Membuat Subtotal Calculation.
- [ ] CART-007 — Membuat Stock Validation.
- [ ] CART-008 — Membuat Cart Persistence.
- [ ] CART-009 — Membuat Empty Cart State.
- [ ] CART-010 — Menangani produk fisik dan digital.
Acceptance Criteria
- Keranjang dapat menampung kedua jenis produk.
- Kuantitas tidak boleh melebihi stok.
- Harga dihitung ulang berdasarkan data server.
- Perubahan keranjang tersimpan sesuai identitas pengguna.
EPIC 07 — Checkout & Payment
P0
Tujuan: Memproses pembelian hingga pembayaran berhasil.

Feature specification
Feature	Deskripsi
Checkout Form	Informasi pembeli
Address Selection	Alamat pengiriman
Shipping Method	Metode pengiriman
Shipping Cost	Biaya pengiriman
Voucher	Kode diskon
Order Summary	Ringkasan transaksi
Payment Gateway	Pembayaran online
Payment Status	Status pembayaran
Invoice	Bukti transaksi

Development Tasks
- [ ] CHK-001 — Membuat Checkout Page.
- [ ] CHK-002 — Membuat Customer Information Form.
- [ ] CHK-003 — Membuat Address Form.
- [ ] CHK-004 — Membuat Shipping Selection.
- [ ] CHK-005 — Membuat Shipping Cost Calculation.
- [ ] CHK-006 — Membuat Order Summary.
- [ ] CHK-007 — Membuat Voucher Validation.
- [ ] CHK-008 — Membuat Order Creation API.
- [ ] CHK-009 — Integrasi Payment Gateway.
- [ ] CHK-010 — Membuat Payment Callback / Webhook.
- [ ] CHK-011 — Membuat Payment Status Verification.
- [ ] CHK-012 — Membuat Invoice.
- [ ] CHK-013 — Membuat Payment Success Page.
- [ ] CHK-014 — Membuat Payment Failed Page.
Acceptance Criteria
- Checkout menghasilkan order dengan ID unik.
- Harga dan diskon divalidasi oleh server.
- Status pembayaran diperbarui berdasarkan verifikasi backend.
- Webhook aman dari pemrosesan transaksi ganda.
- Produk digital tidak diberikan sebelum pembayaran terverifikasi.
EPIC 08 — Order Management & Tracking
P0
Tujuan: Memungkinkan pengguna memantau transaksi.

Feature specification
- Order History.
- Order Detail.
- Order Status.
- Payment Status.
- Shipping Status.
- Tracking Number.
- Cancel Order sesuai aturan.
- Order Invoice.
Development Tasks
- [ ] ORD-001 — Membuat My Orders.
- [ ] ORD-002 — Membuat Order Detail Page.
- [ ] ORD-003 — Membuat Order Status Component.
- [ ] ORD-004 — Membuat Payment Status Indicator.
- [ ] ORD-005 — Membuat Shipping Tracking.
- [ ] ORD-006 — Membuat Order Cancellation Request.
- [ ] ORD-007 — Membuat Invoice Download.
- [ ] ORD-008 — Menguji akses dan kepemilikan pesanan.
Acceptance Criteria
- Pengguna hanya melihat pesanannya sendiri.
- Status pesanan selalu berasal dari backend.
- Pengiriman fisik dan produk digital memiliki alur status berbeda.
EPIC 09 — Digital Download Center
P0
Tujuan: Menyediakan tempat bagi pembeli untuk mengakses template Next.js yang sudah dibeli.







uiuxassets.com


Feature specification
Feature	Deskripsi
My Library	Daftar template milik pengguna
Download ZIP	Download source code
Documentation	Dokumentasi template
Version History	Riwayat versi
Changelog	Catatan pembaruan
License Information	Informasi lisensi
Download History	Riwayat unduhan
GitHub Access	Akses repository jika tersedia

Development Tasks
- [ ] DL-001 — Membuat My Digital Library.
- [ ] DL-002 — Membuat Purchased Template Listing.
- [ ] DL-003 — Membuat Download Authorization.
- [ ] DL-004 — Membuat Secure File Storage.
- [ ] DL-005 — Membuat Download Endpoint.
- [ ] DL-006 — Membuat Download History.
- [ ] DL-007 — Membuat Documentation Page.
- [ ] DL-008 — Membuat Version Information.
- [ ] DL-009 — Membuat Changelog.
- [ ] DL-010 — Membuat License Information.
- [ ] DL-011 — Membuat Product Update Notification.
Acceptance Criteria
- Download hanya tersedia untuk pembeli yang memiliki hak akses.
- File tidak disimpan di direktori publik.
- URL download memiliki masa berlaku terbatas.
- Pembelian tetap dapat diakses setelah pengguna login kembali.
- Pembaruan template tidak menghilangkan versi atau hak akses pembeli sebelumnya.
EPIC 10 — User Dashboard
P0
Tujuan: Menjadi pusat pengelolaan akun dan pembelian.

Feature specification
Feature	Deskripsi
Overview	Ringkasan aktivitas
Profile	Informasi pengguna
Orders	Riwayat pesanan
Downloads	Produk digital
Wishlist	Produk favorit
Addresses	Alamat
Notifications	Notifikasi
Settings	Pengaturan akun
Security	Pengaturan keamanan

Development Tasks
- [ ] UD-001 — Membuat Dashboard Layout.
- [ ] UD-002 — Membuat Sidebar Navigation.
- [ ] UD-003 — Membuat Overview Page.
- [ ] UD-004 — Membuat Profile Page.
- [ ] UD-005 — Membuat Account Settings.
- [ ] UD-006 — Membuat Address Management.
- [ ] UD-007 — Membuat Security Settings.
- [ ] UD-008 — Membuat Dashboard Responsive Layout.
Acceptance Criteria
- Dashboard menampilkan data akun pengguna.
- Navigasi mudah digunakan.
- Seluruh halaman dashboard memerlukan autentikasi.
EPIC 11 — Wishlist & Reviews
P1
Development Tasks
- [ ] WIS-001 — Membuat Wishlist Button.
- [ ] WIS-002 — Membuat Wishlist Page.
- [ ] WIS-003 — Membuat Add to Wishlist API.
- [ ] WIS-004 — Membuat Remove from Wishlist API.
- [ ] REV-001 — Membuat Review Form.
- [ ] REV-002 — Membuat Star Rating.
- [ ] REV-003 — Membuat Review Listing.
- [ ] REV-004 — Membuat Verified Purchase Validation.
- [ ] REV-005 — Membuat Review Moderation State.
Acceptance Criteria
- Hanya pembeli yang memenuhi syarat yang dapat memberikan review.
- Pengguna tidak dapat membuat review ganda untuk pembelian yang sama.
- Wishlist tersimpan pada akun pengguna.
EPIC 12 — Notification Center
P1
Development Tasks
- [ ] NOTIF-001 — Membuat Notification Database Model.
- [ ] NOTIF-002 — Membuat Notification Center UI.
- [ ] NOTIF-003 — Membuat Order Notification.
- [ ] NOTIF-004 — Membuat Payment Notification.
- [ ] NOTIF-005 — Membuat Shipping Notification.
- [ ] NOTIF-006 — Membuat Download Notification.
- [ ] NOTIF-007 — Membuat Read / Unread Status.
- [ ] NOTIF-008 — Integrasi Email Notification.
Acceptance Criteria
- Pengguna hanya menerima notifikasi miliknya.
- Notifikasi transaksi tidak dikirim sebelum kejadian terverifikasi.
- Status dibaca dan belum dibaca tersimpan.
EPIC 13 — Customer Support
P1
Development Tasks
- [ ] SUP-001 — Membuat FAQ Page.
- [ ] SUP-002 — Membuat Contact Page.
- [ ] SUP-003 — Membuat Support Form.
- [ ] SUP-004 — Membuat Support Ticket.
- [ ] SUP-005 — Membuat Ticket Status.
- [ ] SUP-006 — Membuat Help Documentation.
- [ ] SUP-007 — Membuat Refund Policy Page.
Acceptance Criteria
- Pengguna dapat mengirim pertanyaan.
- Pengguna dapat memantau status laporan.
- Setiap tiket memiliki ID unik.
EPIC 14 — SEO, Accessibility & Performance
P0
Development Tasks
- [ ] SEO-001 — Membuat Metadata setiap halaman.
- [ ] SEO-002 — Membuat Dynamic Metadata Produk.
- [ ] SEO-003 — Membuat Sitemap XML.
- [ ] SEO-004 — Membuat Robots.txt.
- [ ] SEO-005 — Membuat Open Graph Metadata.
- [ ] SEO-006 — Optimasi Image menggunakan Next.js Image.
- [ ] PERF-001 — Optimasi Loading State.
- [ ] PERF-002 — Optimasi Rendering.
- [ ] PERF-003 — Menguji Core Web Vitals.
- [ ] A11Y-001 — Memastikan Keyboard Navigation.
- [ ] A11Y-002 — Menambahkan Accessible Labels.
- [ ] A11Y-003 — Menguji Kontras Warna.
- [ ] A11Y-004 — Menguji Reduced Motion.
Acceptance Criteria
- Halaman utama dan produk memiliki metadata yang tepat.
- Navigasi dapat digunakan tanpa mouse.
- Gambar dan aset dioptimalkan.
- Kedua tema memenuhi kebutuhan keterbacaan.

4. EPIC 15 — Testing & Quality Assurance
P0
Tujuan: Memastikan seluruh fitur berjalan dengan benar sebelum website dipublikasikan.

Development Tasks
- [ ] QA-001 — Membuat Unit Tests.
- [ ] QA-002 — Membuat Integration Tests.
- [ ] QA-003 — Membuat Authentication Tests.
- [ ] QA-004 — Membuat Cart Calculation Tests.
- [ ] QA-005 — Membuat Checkout Tests.
- [ ] QA-006 — Membuat Payment Webhook Tests.
- [ ] QA-007 — Membuat Download Authorization Tests.
- [ ] QA-008 — Menguji kedua Character Themes.
- [ ] QA-009 — Menguji Responsive Design.
- [ ] QA-010 — Melakukan Security Testing.
- [ ] QA-011 — Melakukan End-to-End Testing.
Acceptance Criteria
- Tidak ada akses tanpa izin ke data pengguna lain.
- Perhitungan harga dan transaksi akurat.
- Kedua tema bekerja di seluruh halaman.
- Fitur utama dapat digunakan pada desktop dan mobile.
5. Rekapitulasi seluruh Epic
Epic	Modul	Prioritas
01	Design System	P0
02	Homepage	P0
03	Product Catalog	P0
04	Product Detail	P0
05	Authentication	P0
06	Shopping Cart	P0
07	Checkout & Payment	P0
08	Order Management	P0
09	Digital Download Center	P0
10	User Dashboard	P0
11	Wishlist & Reviews	P1
12	Notifications	P1
13	Customer Support	P1
14	SEO & Performance	P0
15	Testing & QA	P0

6. Development Roadmap
Aku menyarankan pengembangan dilakukan dalam delapan fase.
Project Roadmap
1. Phase 1 — Foundation
   P0
   Setup Next.js, TypeScript, CSS, Design System, Character Theme.
2. Phase 2 — Storefront
   Homepage, Navbar, Hero, Category, Product Catalog.
3. Phase 3 — Product Experience
   Product Detail, Search, Filter, Sorting, Live Preview.
4. Phase 4 — User Account
   Register, Login, Authentication, User Dashboard.
5. Phase 5 — Shopping System
   Cart, Checkout, Shipping, Payment Gateway.
6. Phase 6 — Product Delivery
   Order Tracking, Digital Library, Secure Download.
7. Phase 7 — Enhancement
   Wishlist, Reviews, Notification, Customer Support.
8. Phase 8 — Launch
   Testing, Security, SEO, Performance, Deployment.

7. Definition of Done (DoD)
Setiap task dianggap selesai apabila:
- [ ] Implementasi sesuai spesifikasi.
- [ ] UI sesuai Design System.
- [ ] Mendukung Nihilux dan Aha.
- [ ] Responsive di desktop dan mobile.
- [ ] Tidak memiliki error TypeScript.
- [ ] Validasi berjalan dengan benar.
- [ ] Tidak terdapat masalah keamanan yang diketahui.
- [ ] Sudah diuji sesuai kebutuhan task.
- [ ] Kode sudah masuk Git repository.
8. Rekomendasi struktur pengelolaan proyek
Untuk memudahkan pengembangan, gunakan struktur seperti ini:
Crisanthera-Store/
│
├── docs/
│   ├── PRD.md
│   ├── FEATURE-SPECIFICATION.md
│   ├── DEVELOPMENT-TASKS.md
│   ├── DATABASE-SCHEMA.md
│   └── API-SPECIFICATION.md
│
├── src/
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── contexts/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── types/
│   └── styles/
│
├── public/
│   ├── characters/
│   ├── ornaments/
│   └── images/
│
└── package.json


features/ nantinya bisa dipisahkan menjadi catalog/, cart/, checkout/, orders/, downloads/, dan sebagainya.

9. Langkah pengerjaan selanjutnya
Menurutku, jangan langsung mengerjakan seluruh fitur. Kita mulai dari fondasi dan selesaikan satu Epic sebelum berpindah ke Epic berikutnya.
Sprint 01 — Design System
Starting Point
Target: Menyelesaikan identitas visual Crisanthera-Store.
Sprint checklist
0/10



[ ] Setup Next.js + TypeScript
[ ] Setup Global CSS
[ ] Implementasi CSS Variables
[ ] Implementasi Nihilux Theme
[ ] Implementasi Aha Theme
[ ] Typography System
[ ] Button & Card Components
[ ] Character Theme Selector
[ ] Theme Persistence
[ ] Responsive Testing

Saran: Jadikan dokumen spesifikasi dan task ini sebagai acuan utama pengembangan. Setelah User Side selesai, kita baru menyusun spesifikasi Admin Side, termasuk pengelolaan produk, stok, transaksi, pembayaran, dan digital assets.

Aku juga bisa membantu melakukan review progres task dan menyiapkan pekerjaan berikutnya setiap minggu.
📋Review task Crisanthera tiap mingguTap to set up