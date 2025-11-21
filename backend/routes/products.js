const express = require('express');
const router = express.Router();


const {
    getAllProducts,
    searchProducts,
    updateProduct,
    importProducts,
    exportProducts,
    getProductHistory
} = require('../controllers/productsController');


router.get('/', getAllProducts);
router.get('/search', searchProducts);
router.put('/:id', updateProduct);
router.post('/import', importProducts);
router.get('/export', exportProducts);
router.get('/:id/history', getProductHistory);

module.exports = router;
