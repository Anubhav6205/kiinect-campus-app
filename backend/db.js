const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.log("MONGO_URI is not set");
}

mongoose
  .connect(MONGO_URI, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));
