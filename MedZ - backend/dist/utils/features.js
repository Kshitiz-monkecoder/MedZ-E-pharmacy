import mongoose from "mongoose";
export const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017", {
        dbName: "MedZ_Pharmacy",
    }).then(c => console.log(`DB connected to ${c.connection.host}`))
        .catch((e) => console.log(e));
};
