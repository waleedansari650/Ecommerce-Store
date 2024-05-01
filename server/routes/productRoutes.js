const app = require('express');
const router = app.Router();
const {upload} = require("../multer");
const { authenticate } = require('../middlewares/authenticate');
const { addProduct, deleteProduct, updateProduct, getProducts, getSpecificProduct, braintreeTokenController, brainTreePaymentController } = require('../controllers/productController');


router.post('/addProduct',authenticate,  upload.single("profile"), addProduct);
router.delete('/deleteProduct/:id', authenticate,  deleteProduct);
router.put('/updateProduct/:id', authenticate, upload.single("profile"), updateProduct);
router.get('/getProducts', getProducts);
router.get('/getSpecificProduct/:id', authenticate, getSpecificProduct);    
// payment routes : 
//token
router.get('/braintree/token', braintreeTokenController);
//payment
router.post('/braintree/payment', authenticate, brainTreePaymentController);

module.exports = router;
                 
