const express = require('express');
const router = express.Router();
const { productUpload } = require('../../middleware/upload'); // agar images upload karni hai
const productController = require('../../controllers/admin/productController');

// ✅ Routes
router.get('/products', productController.getProducts);
router.post('/products', productUpload.array('images', 5), productController.createProduct);
router.put('/products/:id', productUpload.array('images', 5), productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
