const app = require('express');
const router = app.Router();
const {upload} = require("../multer");
const { authenticate, localVairables } = require('../middlewares/authenticate');
const { addProduct, deleteProduct, updateProduct, getProducts, getSpecificProduct } = require('../controllers/productController');


router.post('/addProduct',authenticate,  upload.single("profile"), addProduct);
router.delete('/deleteProduct/:id', authenticate,  deleteProduct);
router.put('/updateProduct/:id', authenticate, upload.single("profile"), updateProduct);
router.get('/getProducts', getProducts);
router.get('/getSpecificProduct/:id', authenticate, getSpecificProduct);    




module.exports = router;

