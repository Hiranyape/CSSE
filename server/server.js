const express = require('express');
const cors = require('cors');
const { mongoose } = require('mongoose');

const userRoutes = require("./routes/UserRoute");
const productRoute = require("./routes/ProductRoute")
const purchaseOrder = require("./routes/purchaseOrderRoutes")
const OrderRoutes = require("./controllers/OrderController")
const ConstructionsRoutes = require("./controllers/ConstructionsController")

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/user',userRoutes);
app.use('/api/product',productRoute)
app.use("/Order", OrderRoutes)
app.use("/purchaseOrder", purchaseOrder)
app.use("/Constructions", ConstructionsRoutes)

const uri = process.env.URI;
mongoose.set('strictQuery', false);
mongoose.connect(uri,{});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Mongo DB is connected")
})
app.listen(port,()=>{
    console.log(`Server is runnng on port ${port} `)
})