import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    console.log("Mongo Connected");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default connectDatabase;
