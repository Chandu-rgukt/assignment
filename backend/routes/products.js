const express = require('express');
const router = express.Router();


const {
    getAllProducts,
    searchProducts,
    updateProduct,
    importProducts,
    exportProducts,
    getProductHistory,
    addProduct
} = require('../controllers/productsController');


router.get('/', getAllProducts);
router.post("/", addProduct);
router.get('/search', searchProducts);
router.put('/:id', updateProduct);
router.post('/import', importProducts);
router.get('/export', exportProducts);
router.get('/:id/history', getProductHistory);

module.exports = router;
