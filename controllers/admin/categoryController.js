const { Category } = require('../../models');   // ✅ CORRECT
const fs = require('fs');
const path = require('path');

/**
 * ✅ GET categories (pagination)
 */
exports.getCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Category.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'ASC']]
    });

    res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * ✅ CREATE category
 */
exports.createCategory = async (req, res) => {
  try {
    const { name, description, slug } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Name and slug are required'
      });
    }

    const exists = await Category.findOne({ where: { slug } });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'Category already exists'
      });
    }

    const category = await Category.create({
      name,
      description,
      slug,
      image: req.file ? req.file.filename : null
    });

    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * ✅ UPDATE category
 */
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, slug } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    let imageName = category.image;

    if (req.file) {
      if (category.image) {
        const oldPath = path.join(
          __dirname,
          '../../uploads/categories',
          category.image
        );
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      imageName = req.file.filename;
    }

    await category.update({
      name: name ?? category.name,
      description: description ?? category.description,
      slug: slug ?? category.slug,
      image: imageName
    });

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * ✅ DELETE category
 */
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    if (category.image) {
      const imgPath = path.join(
        __dirname,
        '../../uploads/categories',
        category.image
      );
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await category.destroy();

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
