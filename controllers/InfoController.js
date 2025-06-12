const infoPageData = {
    title: "About Us",
};

exports.renderInfoPage = async (req,res)=>{
    res.render("infoPage", infoPageData);
}

