import mongoose from "mongoose";

const connectDB = async():Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
    }
    catch(err) {
        console.log('Error while connecting to DB', err);
        process.exit(1);
    }
}

export default connectDB;