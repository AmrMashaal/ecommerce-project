import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { name, slug, parentCategory, description } = req.body;

    const doesExist = await Category.findOne({ $or: [{ name }, { slug }] });

    if (doesExist) {
      return res
        .status(400)
        .json({ message: "Category with this name or slug already exists" });
    }

    const newCategory = new Category({
      name,
      slug,
      parentCategory,
      description,
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
