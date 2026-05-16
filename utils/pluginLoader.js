const fs = require("fs");
const path = require("path");

/**
 * Auto-load semua plugin dari folder /plugin
 * Struktur: /plugin/{kategori}/{fitur}.js
 * Route: /plug/{kategori}  (fitur jadi default route di dalam plugin)
 */
function loadPlugins(app, apiPrefix) {
  const pluginDir = path.join(__dirname, "../plugin");

  if (!fs.existsSync(pluginDir)) return;

  const categories = fs.readdirSync(pluginDir).filter((f) =>
    fs.statSync(path.join(pluginDir, f)).isDirectory()
  );

  categories.forEach((category) => {
    const categoryPath = path.join(pluginDir, category);
    const files = fs.readdirSync(categoryPath).filter((f) => f.endsWith(".js"));

    files.forEach((file) => {
      const pluginPath = path.join(categoryPath, file);
      const featureName = path.basename(file, ".js");

      // Kalau nama file sama dengan kategori → /plug/{kategori}
      // Kalau beda → /plug/{kategori}/{fitur}
      const routePrefix = featureName === category
        ? `${apiPrefix}/${category}`
        : `${apiPrefix}/${category}/${featureName}`;

      try {
        const plugin = require(pluginPath);
        app.use(routePrefix, plugin);
        console.log(`  ✓ [${category}/${featureName}] → ${routePrefix}`);
      } catch (err) {
        console.error(`  ✗ Failed [${category}/${featureName}]:`, err.message);
      }
    });
  });
}

module.exports = { loadPlugins };
