const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 

const userRoutes = require("./routes/UserRoute");
const productRoute = require("./routes/ProductRoute");
const purchaseOrder = require("./routes/purchaseOrderRoutes");
const OrderRoutes = require("./controllers/OrderController");
const ConstructionsRoutes = require("./controllers/ConstructionsController");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/product', productRoute);
app.use("/Order", OrderRoutes);
app.use("/purchaseOrder", purchaseOrder);
app.use("/Constructions", ConstructionsRoutes);

// Singleton Database Connection
class Database {
    constructor() {
      if (!Database.instance) {
        Database.instance = this;
      }
      return Database.instance;
    }
  
    async _connect() {
      const uri = process.env.URI;
      try {
        await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("Mongo DB is connected");
      } catch (error) {
        console.error('Database connection error:', error);
      }
    }
  
    connect() {
      return this._connect();
    }
  }
  
  // Create a singleton instance of the Database class
  const database = new Database();
  
  // Call the connect method to establish the database connection
  database.connect().then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
  
  
  
