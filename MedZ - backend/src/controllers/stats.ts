import { myCache } from "../app.js";
import { TryCatch } from "../middleware/error.js";
import { Order } from "../models/order.js";
import { Product } from "../models/product.js";
import { User } from "../models/user.js";
import { calculatePercentage } from "../utils/features.js";

export const getDashboardStats = TryCatch(async (req, res, next) => {
  let stats = {};

  if (myCache.has("admin-stats"))
    stats = JSON.parse(myCache.get("admin-stats") as string);
  else {
    const today = new Date();

    const sixMonthAgo = new Date();

    sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);


    const thisMonth = {
      start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
      end: today,
    };

    const lastMonth = {
      start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
      end: new Date(today.getFullYear(), today.getMonth() - 1, 0),
    };

    const thisMonthProductsPromise = Product.find({
      createdAt: {
        $gte: thisMonth.start,
        $lte: thisMonth.end,
      },
    });

    const lastMonthProductsPromise = Product.find({
      createdAt: {
        $gte: lastMonth.start,
        $lte: lastMonth.end,
      },
    });

    const thisMonthUsersPromise = User.find({
      createdAt: {
        $gte: thisMonth.start,
        $lte: thisMonth.end,
      },
    });

    const lastMonthUsersPromise = User.find({
      createdAt: {
        $gte: lastMonth.start,
        $lte: lastMonth.end,
      },
    });

    const thisMonthOrdersPromise = Order.find({
      createdAt: {
        $gte: thisMonth.start,
        $lte: thisMonth.end,
      },
    });

    const lastMonthOrdersPromise = Order.find({
      createdAt: {
        $gte: lastMonth.start,
        $lte: lastMonth.end,
      },
    });

    const lastSixMonthOrdersPromise = Order.find({
      createdAt: {
        $gte: sixMonthAgo,
        $lte: today,
      },
    });

    const [
      thisMonthOrders,
      thisMonthProducts,
      thisMonthUsers,
      lastMonthOrders,
      lastMonthProducts,
      lastMonthUsers,
      ProductsCount,
      UsersCount,
      allOrders,lastSixMonthOrders,
    ] = await Promise.all([
      thisMonthOrdersPromise,
      thisMonthProductsPromise,
      thisMonthUsersPromise,
      lastMonthOrdersPromise,
      lastMonthProductsPromise,
      lastMonthUsersPromise,
      Product.countDocuments(),
      Product.countDocuments(),
      Order.find({}).select("total"),
      lastSixMonthOrdersPromise,
    ]);

    const thisMonthRevenue = thisMonthOrders.reduce(
      (total, order) => total + (order.total || 0),
      0
    );

    const lastMonthRevenue = lastMonthOrders.reduce(
      (total, order) => total + (order.total || 0),
      0
    );

    const changePercent = {
      revenue: calculatePercentage(thisMonthRevenue, lastMonthRevenue),
      order: calculatePercentage(
        thisMonthOrders.length,
        lastMonthOrders.length
      ),
      user: calculatePercentage(thisMonthUsers.length, lastMonthUsers.length),
      product: calculatePercentage(
        thisMonthProducts.length,
        lastMonthProducts.length
      ),
    };

    // const orderChangePercent =

    // const productChangePercent =

    // const userChangePercent =

    const revenue = allOrders.reduce(
      (total, order) => total + (order.total || 0),
      0
    );

    const count = {
      revenue,
      user: UsersCount,
      product: ProductsCount,
      order: allOrders.length,
    };

    stats = {
      changePercent,
      count,
    };
  }

  return res.status(200).json({
    success: true,
    stats,
  });
});

export const getPieChart = TryCatch(async () => {});

export const getBarCharts = TryCatch(async () => {});

export const getLineCharts = TryCatch(async () => {});
