const path = require('path');

// View rendering content
const cropShopContent = {
  title: "Crop Shop"
};

// Render the crop shop page (if you later want to use templating)
exports.renderCropShopPage = (req, res) => {
  res.render("cropShop", cropShopContent); // if you ever change HTML to a view engine
};

// In-memory database
let database = ['Carrots', 'Tomatoes', 'Lettuce'];
let lastUpdated = new Date();
const ADMIN_KEY = 'adminkey123';

// Helper: calculate hours since last update
const formatTimeDiff = (lastTime) => {
  const diffMs = Date.now() - new Date(lastTime);
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  return `${hours} Hours ago`;
};

// API controller: get all shop data
exports.getShopData = (req, res) => {
  const isAdmin = req.query.key === ADMIN_KEY;

  res.json({
    items: database,
    lastUpdated: formatTimeDiff(lastUpdated),
    admin: isAdmin
  });
};

// API controller: add item (admin only)
exports.addItem = (req, res) => {
  const key = req.query.key;
  const { item } = req.body;

  if (key !== ADMIN_KEY) {
    return res.status(403).json({ error: "Forbidden" });
  }

  if (!item || typeof item !== 'string') {
    return res.status(400).json({ error: "Invalid item" });
  }

  database.push(item);
  lastUpdated = new Date();

  res.sendStatus(200);
};

// API controller: remove item by index (admin only)
exports.removeItem = (req, res) => {
  const key = req.query.key;
  const { index } = req.body;

  if (key !== ADMIN_KEY) {
    return res.status(403).json({ error: "Forbidden" });
  }

  if (typeof index !== 'number' || index < 0 || index >= database.length) {
    return res.status(400).json({ error: "Invalid index" });
  }

  database.splice(index, 1);
  lastUpdated = new Date();

  res.sendStatus(200);
};
