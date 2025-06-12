const path = require('path');
const ShopCrop = require('../models/ShopCropModel')

// View rendering content
const cropShopContent = {
  title: "Crop Shop"
};

// Render the crop shop page (if you later want to use templating)
exports.renderCropShopPage = (req, res) => {
  res.render("cropShop", cropShopContent); // if you ever change HTML to a view engine
};

// In-memory database
//let database = ['Carrots', 'Tomatoes', 'Lettuce'];
let lastUpdated = new Date();
const ADMIN_KEY = 'adminkey123';

// Helper: calculate hours since last update
const formatTimeDiff = (lastTime) => {
  const diffMs = Date.now() - new Date(lastTime);
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  return `${hours} Hours ago`;
};

// API controller: get all shop data
exports.getShopData = async (req, res) => {
  const isAdmin = req.query.key === ADMIN_KEY;
  const crops = await ShopCrop.find().lean()
  res.json({
    //items: database,
    items: crops.map(c => ({ _id: c._id, name: c.name, quantity: c.quantity })),
    lastUpdated: formatTimeDiff(lastUpdated),
    admin: isAdmin
  });

};

// API controller: add item (admin only)
exports.addItem = async (req, res) => {
  
  const key = req.query.key;
  const { item } = req.body;

  if (key !== ADMIN_KEY) {
    return res.status(403).json({ error: "Forbidden" });
  }

  

  if (!item || typeof item !== 'string') {
    return res.status(400).json({ error: "Invalid item" });
  }

  //database.push(item);
  await ShopCrop.create({name: item, quantity: 1});
  lastUpdated = new Date();

  res.sendStatus(200);
};

exports.updateQuantity = async (req, res) => {
  const key = req.query.key;
  let { id, quantity } = req.body;

  if (key !== ADMIN_KEY) {
    return res.status(403).json({ error: "Forbidden" });
  }

  quantity = Number(quantity);

  if (!id || typeof id !== 'string' || isNaN(quantity) || quantity < 0) {
    return res.status(400).json({ error: "Invalid data" });
  }

  await ShopCrop.updateOne({ _id: id }, { $set: { quantity } });
  lastUpdated = new Date();

  res.sendStatus(200);
};

// API controller: remove item by index (admin only)
exports.removeItem = async (req, res) => {
  const key = req.query.key;
  const { id } = req.body;

  if (key !== ADMIN_KEY) {
    return res.status(403).json({ error: "Forbidden" });
  }

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: "Invalid id" });
  }

  await ShopCrop.deleteOne({ _id: id });
  lastUpdated = new Date();

  res.sendStatus(200);
};
