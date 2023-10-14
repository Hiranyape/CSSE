const express = require('express');
const cors = require('cors');
const { mongoose } = require('mongoose');

const userRoutes = require("./routes/UserRoute");
const productRoute = require("./routes/ProductRoute")

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/user',userRoutes);
app.use('/api/product',productRoute)

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