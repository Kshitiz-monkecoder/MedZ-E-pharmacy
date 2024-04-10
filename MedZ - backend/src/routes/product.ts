import express from "express";
import { adminOnly } from "../middleware/Auth.js";
import {
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getAllProducts,
  getLatestProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
} from "../controllers/product.js";
import { singleUpload } from "../middleware/multer.js";

const app = express.Router();

//Create new Product -/api/v1/product/new
app.post("/new", adminOnly, singleUpload, newProduct);

//To Get All products With Filter -/api/v1/product/all
app.get("/all", getAllProducts);

//To Get last 10 products -/api/v1/product/new
app.get("/latest", getLatestProducts);

//To get all unique categories -/api/v1/product/new
app.get("/categories", getAllCategories);

//To get all products -/api/v1/product/new
app.get("/admin-products", adminOnly, getAdminProducts);

app
  .route("/:id")
  .get(getSingleProduct)
  .put(adminOnly, singleUpload, updateProduct)
  .delete(adminOnly, deleteProduct);

export default app;
