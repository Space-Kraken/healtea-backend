// TODO: Chance mongo keys (cluster and mongo) for env variable

/*
 * This file establishes the
 * preparation of the database.
 */

//? Import mongoose methods as mongoose
import mongoose from "mongoose";

//! Constant with cluster key (Dont use in production)
const cluster =
  "mongodb+srv://dbUser:91982548@cluster0.xosdd.mongodb.net/TestApi?retryWrites=true&w=majority";

//! Constant with mongoDB driver (Dont use in production)
const mongo = "mongodb://localhost/healtea";

//? Mongoose useFindAndModify disabled (query configuration)
mongoose.set("useFindAndModify", false);

//* Mongoose var
mongoose
  //* Connect method
  .connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  //* Success debbug log
  .then((db) => {
    console.log("Data base is connected");
  })
  //* Error debbug log
  .catch((err) => {
    console.log(err);
  });
