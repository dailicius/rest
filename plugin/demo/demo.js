const express = require("express");
const router = express.Router();
const config = require("../../config.json");
const os = require("os");

/**
 * GET /plug/demo
 * Cek status REST API
 */
router.get("/", (req, res) => {
  const uptime = process.uptime();
  const h = Math.floor(uptime / 3600);
  const m = Math.floor((uptime % 3600) / 60);
  const s = Math.floor(uptime % 60);

  res.json({
    status: true,
    message: "API is running!",
    data: {
      app: config.app.name,
      version: config.app.version,
      uptime: `${h}h ${m}m ${s}s`,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      system: {
        platform: os.platform(),
        node_version: process.version,
        memory: {
          total: `${Math.round(os.totalmem() / 1024 / 1024)} MB`,
          free: `${Math.round(os.freemem() / 1024 / 1024)} MB`,
        },
      },
    },
  });
});

/**
 * GET /plug/demo/ping
 */
router.get("/ping", (req, res) => {
  res.json({
    status: true,
    message: "pong",
    data: { timestamp: new Date().toISOString() },
  });
});

module.exports = router;
