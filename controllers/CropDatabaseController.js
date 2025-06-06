const Crop = require('../models/crop');

async function getCrops() {
  const crops = await Crop.find({});
  return crops;
}

async function generateCropPageContent() {
  const crops = await getCrops();

  const CropPageContent = {
    title: "Crop Page",
    sortOptions: ["Name", "Cycle", "Drought Tolerance", "Watering", "Soil", "Growth Rate", "Fruits In"],
    filterOptions: ["Annual", "Summer", "Spring", "Autumn", "Winter"],
    crops
  };

  return CropPageContent;
}



exports.sortBy = async (req, res) => {
  const sortParam = req.body.sort;

  const sortedCrops = Crop.find({}).sort({ [sortParam.toLowerCase()]: 1 });

  const content = await generateCropPageContent();
  content.crops = sortedCrops;

  res.render("cropPage", content);
}

exports.renderCropPage = async (req, res) => {
  const cropPageContent = await generateCropPageContent();

  res.render("cropPage", cropPageContent);
}
