import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middleware/error.js";
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from 'morgan'

//importing routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payment.js";
import dashboardRoute from "./routes/stats.js";


config({
  path: "./.env",
});

//console.log(process.env.PORT);

const port = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "";

connectDB(MONGO_URI);

export const myCache = new NodeCache();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("API is working /api/v1");
});

//using Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/dashboard", dashboardRoute);

app.use("/upload", express.static("Uploads"));
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`server is working on http://localhost:${port}`);
});
