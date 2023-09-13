import app from "./app";
import env from "./utils/validate-env";
import mongoose from "mongoose";

const port = env.PORT;

// database connection
mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose connection is succesful");
  })
  .catch(console.error);

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
