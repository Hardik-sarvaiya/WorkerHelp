const Category = require("../models/Categories");

exports.createCategories = async (req,res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }
    const CategoriesDetails = await Categories.create({
      name: name,
      description: description,
    });
    console.log(CategoriesDetails);
    return res.status(200).json({
      success: true,
      message: "Categories Created Successfully",
    });
  }
  catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
}



exports.showAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find(
      {},
      { name: true, description: true }
    );
    res.status(200).json({
      success: true,
      data: allCategories,
    }); 
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
