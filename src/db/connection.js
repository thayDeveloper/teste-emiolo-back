const mongoose = require("mongoose");

async function startDB() {
  mongoose.set("strictQuery", true);
  await mongoose
    .connect(process.env.MONGODB_URL, () => {
      console.log("conectou mongo db");
    })
    .catch((err) => console.error(err));
}

module.exports = startDB;
