import mongoose from "mongoose";

export async function connectMongoDB() {
    try {
        mongoose.connect(process.env.MONGODB_URI || "");
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Database connected successfully");
        });

        connection.on("error", (err) => {
            console.log(
                `Database connection error, Please make sure the database is running, ${err}`
            );
            process.exit();
        });
    } catch (error) {
        console.log(`Error while connecting with database, ${error}`);
    }
}
