const express = require("express")
const router = express.Router();
const productController = require("../controllers/ProductController")
const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    }
})

const upload = multer({storage:storage});

router.post("/",upload.single("image"),productController.addProduct);
router.get('/',productController.getAllProducts);
router.get('/:id',productController.getProduct);
router.post('/url',productController.addProductWithImageUrl);

module.exports = router