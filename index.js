const express = require("express");
const config = require("./config.json");
const { loadPlugins } = require("./utils/pluginLoader");

const app = express();
const { port, host } = config.server;
const apiPrefix = config.api.prefix; // /plug

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Response Helper ──────────────────────────────────────────────────────────
app.use((req, res, next) => {
  res.success = (data = {}, message = "OK", statusCode = 200) => {
    return res.status(statusCode).json({ status: true, message, data });
  };
  res.error = (message = "Error", statusCode = 500, data = null) => {
    return res.status(statusCode).json({ status: false, message, data });
  };
  next();
});

// ─── Homepage ─────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    status: true,
    app: config.app.name,
    version: config.app.version,
    description: config.app.description,
    example: `https://yourdomain.com/plug/demo`,
  });
});

// ─── Load Plugins ─────────────────────────────────────────────────────────────
console.log("\n📦 Loading plugins...");
loadPlugins(app, apiPrefix);
console.log("📦 Done.\n");

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    data: null,
  });
});

// ─── Error Handler ────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: false, message: "Something went wrong.", error: err.message });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(port, host, () => {
  console.log(`🚀 ${config.app.name} running at http://${host}:${port}`);
  console.log(`📡 Plugin prefix: ${apiPrefix}\n`);
});
