const app = require('express');
const router = app.Router();
const { authenticate } = require('../middlewares/authenticate');
const { addToCart } = require('../controllers/cartController');


router.post('/addToCart',authenticate,  addToCart);


module.exports = router;


