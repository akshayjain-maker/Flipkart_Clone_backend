const express = require('express');
const router = express.Router();

const { categoryUpload } = require('../../middleware/upload');
const categoryController = require('../../controllers/admin/categoryController');

router.get('/categories', categoryController.getCategories);

router.post(
  '/categories',
  categoryUpload.single('image'),  
  categoryController.createCategory
);

router.put(
  '/categories/:id',
  categoryUpload.single('image'),   
  categoryController.updateCategory
);

router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;
