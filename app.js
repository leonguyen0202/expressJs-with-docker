import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import db from "./src/models/index.js";
import db_const from "./src/config/db.config.js";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import developmentRouter from "./routes/development.routes.js";

var app = express();

// Enable cors.
app.use(
  cors({
    origin: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/static", express.static("public")); //to access the files in public folder

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/dev", developmentRouter);

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
  return;
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

db.mongoose
  .connect(db_const.LOCAL_DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// PORT define
const PORT = process.env.APP_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
