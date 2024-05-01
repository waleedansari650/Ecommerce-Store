const express = require('express');
const app = express();
const cors = require('cors');
const connect = require('./config/connection');
const PORT =  4000 || process.env.PORT;
const userRoutes  = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');


require('dotenv').config();
app.use(express.json());
app.use(express.static('./public'));
app.use(cors());
app.use('/', userRoutes);
app.use('/api/products/', productRoutes);
app.use('/api/order/', orderRoutes);

connect();
app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})



