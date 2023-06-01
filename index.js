const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("./src/db/conn");
const userRouter = require("./src/router/userRoutes");
const articleRouter = require("./src/router/articleRoutes");
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", articleRouter);

// app.get("/", (req, res) => {
//   res.send("Hello from express");
// });

app.listen(port, () => {
  console.log(`The server is up and running at port no: ${port}`);
});
