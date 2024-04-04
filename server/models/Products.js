const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Product name is required"],
    },
    description : {
        type: String,
        required: [true, "Product description is required"],
    },
    price : {
        type: Number,
        required : [true, "Price is required"],
    },
    category : {
        type: String,
        required : [true, "Category is required"],
    },

    image : {
        type: Array,
        required : [true, "Product images are required"],
    },
    stock : {
        type: Number,
        required : [true, "Stock is required"],
    },
    sold : {
        type: Number,
        default : 0,
    },

})

module.exports = mongoose.models.Products || mongoose.model('Products', productSchema);



