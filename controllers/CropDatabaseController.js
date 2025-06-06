const Crop = require('../models/crop');

async function getCrops() {
  const crops = await Crop.find({});
  return crops;
}

exports.renderCropPage = async (req, res) => {
  const CropPageContent = {
    title: "Crop Page",
    crops: await getCrops()
  };

  res.render("cropPage", CropPageContent);
}

exports.renderCropItemPage = async (req, res) => {
  const cropID = req.params.id;
  const crop = await Crop.findById(cropID)

  const cropItemContent = {
    title: "Crop Item Page",
    crop: crop
  }
  res.render("cropItem", cropItemContent)
}
