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
