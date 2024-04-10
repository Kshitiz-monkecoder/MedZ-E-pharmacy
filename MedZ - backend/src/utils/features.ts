import mongoose from "mongoose";
import { InvalidateCacheProps, OrderItemType } from "../types/types.js";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";
import { Order } from "../models/order.js";

export const connectDB = (uri: string) => {
  mongoose
    .connect(uri, {
      dbName: "MedZ_Pharmacy",
    })
    .then((c) => console.log(`DB connected to ${c.connection.host}`))
    .catch((e) => console.log(e));
};

export const invalidCache = async ({
  product,
  order,
  admin,
  userId,
  orderId,
  productId,
}: InvalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-products",
      "categories",
      "all-products",
    ];

    if (typeof productId === "string") productKeys.push(`product-${productId}`);
    //`product-${id}`

    if (typeof productId === "object") {
      productId.forEach((i) => {
        productKeys.push(`product-${productId}`);
      });
      //console.log("Lol");
    }

    const products = await Product.find({}).select("_id");

    myCache.del(productKeys);
  }
  if (order) {
    const orderKeys: string[] = [
      "all-orders",
      `my-orders-${userId}`,
      `order-${orderId}`,
    ];

    // const orders = await Order.find({}).select("_id");

    // orders.forEach((i) => {
    //     orderKeys.push(`order-${i._id}`);
    // });

    myCache.del(orderKeys);
  }
  if (admin) {
  }
};

export const reduceStock = async (orderItems: OrderItemType[]) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if (!product) throw new Error("Product Not Found");
    product.stock -= order.quantity;
    await product.save();
  }
};

export const calculatePercentage = (thisMonth: number, lastMonth: number) => {

    if(lastMonth === 0) return thisMonth * 100;
  const percent = ((thisMonth - lastMonth) / lastMonth) * 100;
    return Number(percent.toFixed(0));

};
