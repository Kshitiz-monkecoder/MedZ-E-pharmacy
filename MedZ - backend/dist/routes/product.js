import express from 'express';
import { adminOnly } from '../middleware/Auth.js';
import { getAdminProducts, getAllCategories, getLatestProducts, getSingleProduct, newProduct, updateProduct } from '../controllers/product.js';
import { singleUpload } from '../middleware/multer.js';
const app = express.Router();
//Create new Product -/api/v1/product/new
app.post("/new", adminOnly, singleUpload, newProduct);
//To Get last 10 products -/api/v1/product/new
app.get("/latest", getLatestProducts);
//To get all unique categories -/api/v1/product/new
app.get("/categories", getAllCategories);
//To get all products -/api/v1/product/new
app.get("/admin-products", getAdminProducts);
app.route("/:id").get(getSingleProduct).put(singleUpload, updateProduct);
export default app;
