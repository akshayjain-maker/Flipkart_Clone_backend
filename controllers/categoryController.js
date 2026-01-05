const { Category } = require('../../models');
console.log('Category type:', typeof Category);
console.log('Category methods:', Object.getOwnPropertyNames(Category));

exports.getCategories = async (req, res) => {
    console.log('Inside getCategories');
  try {
    // query params
    console.log('Query params:', req.query);
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
