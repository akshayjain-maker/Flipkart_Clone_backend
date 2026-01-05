const { Product, ProductImage, Category } = require('../../models');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');

/* ================= GET PRODUCTS ================= */

exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const search = req.query.search || '';
    const sortBy = req.query.sortBy || 'id';
    const sortOrder = req.query.sortOrder === 'asc' ? 'ASC' : 'DESC';

    // 🔍 Search condition
    const whereCondition = search
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { price: { [Op.like]: `%${search}%` } }
          ]
        }
      : {};

    // 🔃 Sorting
    let orderCondition = [['id', 'DESC']];

    if (sortBy === 'category') {
      orderCondition = [[{ model: Category }, 'name', sortOrder]];
    } else {
      orderCondition = [[sortBy, sortOrder]];
    }

    const { rows, count } = await Product.findAndCountAll({
      where: whereCondition,
      limit,
      offset,
      order: orderCondition,
      include: [
        {
          model: Category,
          attributes: ['id', 'name']
        },
        {
          model: ProductImage,
          attributes: ['id', 'url']
        }
      ]
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


/* ================= CREATE PRODUCT ================= */
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body;
     console.log('Request body:', req.body);
    const product = await Product.create({
      name,
      description,
      price,
      categoryid :categoryId
    });

    if (req.files && req.files.length > 0) {
      const images = req.files.map(file => ({
        url: file.filename,
        productId: product.id
      }));

      await ProductImage.bulkCreate(images);
    }

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE PRODUCT ================= */
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, categoryId, existingImageIds } = req.body;

    const product = await Product.findByPk(id, {
      include: [{ model: ProductImage }]
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // ✅ Update product fields
    await product.update({
      name,
      description,
      price,
      categoryid: categoryId   // ⚠️ DB column name
    });

    // ✅ Parse existing image ids
    const keepImageIds = existingImageIds
      ? JSON.parse(existingImageIds)
      : [];

    // ✅ Delete removed images (DB + file system)
    const imagesToDelete = product.ProductImages.filter(
      img => !keepImageIds.includes(img.id)
    );

    for (const img of imagesToDelete) {
      const filePath = path.join(
        __dirname,
        '../../uploads/products',
        img.url
      );
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await ProductImage.destroy({
      where: {
        productId: id,              // 🔥 FIX HERE
        id: { [Op.notIn]: keepImageIds }
      }
    });

    // ✅ Save new uploaded images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({
        url: file.filename,
        productId: id               // 🔥 FIX HERE
      }));

      await ProductImage.bulkCreate(newImages);
    }

    res.json({
      success: true,
      message: 'Product updated successfully'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


/* ================= DELETE PRODUCT ================= */
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id, {
      include: [ProductImage]
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    for (const img of product.ProductImages) {
      const filePath = path.join(__dirname, '../../uploads/products', img.url);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await ProductImage.destroy({ where: { productId: id } });
    await product.destroy();

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
