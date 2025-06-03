const farmingPageData = {
    title: "farming",
};

exports.renderFarmingPage = async (req,res)=>{
    res.render("farming", farmingPageData);
}