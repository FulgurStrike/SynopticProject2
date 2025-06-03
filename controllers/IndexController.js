// controllers/IndexController.js

const indexPageData = {
  title: "Homepage",
};

exports.renderIndexPage = async (req,res)=>{
    res.render("index", indexPageData);
}



