const Crop = require('../models/crop');

async function getCrops() {
  const crops = await Crop.find({});
  return crops;
}

async function generateCropPageContent() {
  const CropPageContent = {
    title: "Crop Page",
    sortOptions: ["Name", "Cycle", "Drought Tolerance", "Watering", "Soil", "Growth Rate", "Fruits In"],
    filterOptions: ["Annual", "Summer", "Spring", "Autumn", "Winter"],
    crops: await getCrops()
  };

  return CropPageContent;
}

exports.clearSortAndFilter = async (req, res) => {
  res.redirect("cropPage");
}


exports.filterBy = async (req, res) => {
  const filterParam = req.body.filter;

  const filteredCrops = await Crop.find({"cycle": [filterParam]});

  const content = await generateCropPageContent();
  content.crops = filteredCrops;

  res.render("cropPage", content);
}


exports.sortBy = async (req, res) => {
  const sortParam = req.body.sort;
  console.log(sortParam);

  const sortedCrops = await Crop.find({}).sort({ [sortParam.toLowerCase().replace("/\s+/g", "")]: 1 });

  console.log(sortedCrops[0]);

  const content = await generateCropPageContent();
  content.crops = sortedCrops;

  res.render("cropPage", content);
}

exports.renderCropPage = async (req, res) => {
  const cropPageContent = await generateCropPageContent();

  res.render("cropPage", cropPageContent);
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
