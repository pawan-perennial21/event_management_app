import mongoose, { ConnectOptions } from "mongoose";

// const options: ConnectOptions = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // Add other options as needed
// };
export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "");

        console.log("Connected to MongoDB");
    } catch (error: any) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};
