// const Crop = require('../models/crops');

const CropPageContent = {
  title: "Crop Page"
};

exports.renderCropPage = async (req, res) => {
  res.render("cropPage", CropPageContent);
}
