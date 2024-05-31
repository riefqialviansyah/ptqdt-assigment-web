# Assigment Web

- Link deploy FE :
- Link deploy BE :

# Instruksi

- Silahkan cloning repo ini dengan cara `https://github.com/riefqialviansyah/ptqdt-assigment-web.git`

# Backend

- Dirancang menggunakan (nodeJs, express, posgres, sequelize)
- Masuk ke folder `/be`
- Lakukan instalasi package `npm i`
- Setup database pada file `/config/config.json`
- Buat database `npx sequelize db:create`
- Lakukan migrasi `npx sequelize db:migrate`
- Lakukan seeding data awal `npx seqelize db:seel:all`
- Jalankan program `npx nodemon bin/www`

## List Endpoints

- `GET` /sales/getAll mendapatkan semua data penjualan
- `GET` /sales/getOne/:id mendapatkan data penjualan berdasarkan id
- `GET` /sales/lowAndHighData filter data max atau min penjualan
- `GET` /sales/goodsKind mendapatkan data top 5 nama barang dengan penjualan tertinggi
- `GET` /sales/statisticSellAmount mendapatkan statistik data penjualan berupa min, max, avg dan total
- `POST` /sales/add melakukan tambah data penjualan
- `PUT` /sales/update/:id melakukan update data penjualan berdasarkan id
- `DELETE` /sales/delete/:id melakukan delete data penjualan berdasarkan id

# Frontend

- Dirancang menggunakan (React, Redux, Sass, Router)
- Masuk ke dalam folder `/fe`
- Ubah file `.env-example` menjadi `.env`
- Instal package yang dibutuhkan `npm i`
- Jalankan aplikasi `npm run dev`
