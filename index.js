require("dotenv").config();
const express = require("express");
const dbConnect = require("./helper/dbConnect");
const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");
const newsRouter = require("./routes/newRoute");
const profileRouter = require("./routes/profileRoute");
const matrimonialRouter = require("./routes/matrimonialRoute");
const jobRouter = require("./routes/jobRoute");
const galleryRouter = require("./routes/galleryRoute");
const eventRouter = require("./routes/eventRoute");
const directoryRouter = require("./routes/directoryRoute");
const blogRouter = require("./routes/blogRoute");
const advertisingRouter = require("./routes/advertisingRoute");
const userRoutes = require("./routes/userRoute");
const notificationRoutes = require("./routes/notificationRoutes");
const imageRouter = require("./routes/imageRouter");

const morgan = require("morgan");
dbConnect();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

app.use("/api", notificationRoutes);
app.use("/api/user", userRoutes);
app.use("/api", advertisingRouter);
app.use("/api", blogRouter);
app.use("/api", directoryRouter);
app.use("/api", newsRouter);
app.use("/api", profileRouter);
app.use("/api", matrimonialRouter);
app.use("/api", jobRouter);
app.use("/api", galleryRouter);
app.use("/api", eventRouter);
app.use("/api", imageRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV || "development"} mode`
  );
  console.log(`App is listening on port ${process.env.PORT || 3000}`);
});
