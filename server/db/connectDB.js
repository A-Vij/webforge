import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to DB");
    } catch (error) {
        console.log("error connecting to DB", error.message);
        process.exit(1);
    }
}

export default connectDB;