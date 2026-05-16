# MyRestAPI

REST API berbasis plugin — tambah fitur cukup buat satu file, langsung jalan.

## Struktur

```
rest-api/
├── config.json          ← setting app & server
├── index.js             ← entry point
├── package.json
├── utils/
│   └── pluginLoader.js  ← auto-loader plugin
└── plugin/
    └── demo/
        └── demo.js      ← /plug/demo
```

## Install & Jalankan

```bash
npm install
npm start        # production
npm run dev      # development (nodemon)
```

## Endpoints

| Method | URL | Keterangan |
|--------|-----|------------|
| GET | `/` | Homepage |
| GET | `/plug/demo` | Status API |
| GET | `/plug/demo/ping` | Ping test |

## Tambah Plugin Baru

Buat `plugin/{kategori}/{kategori}.js` → otomatis jalan di `/plug/{kategori}`

```js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ status: true, message: "Plugin baru!" });
});

module.exports = router;
```

Contoh plugin lain:
- `plugin/downloader/downloader.js` → `/plug/downloader`
- `plugin/search/search.js` → `/plug/search`
- `plugin/sticker/sticker.js` → `/plug/sticker`

## Format Response

```json
{
  "status": true,
  "message": "OK",
  "data": {}
}
```
