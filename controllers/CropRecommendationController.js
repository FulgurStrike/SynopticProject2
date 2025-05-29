const cropRecommendtionContent = {
  title: "Crop Recommendation"
};

exports.renderCropRecommendationPage = (req, res) => {
  res.render("cropRecommendationPage", cropRecommendtionContent);
}
