const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const sequelize = require("./util/database");
const multer = require("multer");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getMilliseconds().toString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.locals.errors = null;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(bodyParser.json());

app.use(
  session({
    secret: "BIGSecrecT",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);
app.use(require("connect-flash")());
app.use((req, res, next) => {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// const userTypes = require('./model/user_type')
// const UserRouter = require('./model/user')
// const LocationsRouter = require('./model/location')
// const ClinksRouter = require('./model/clinkes')
// const ServicesRouter = require('./model/services')
// const DaysRouter = require('./model/days')
// const DatesRouter = require('./model/services_dates')
// const AppointmentsRouter = require('./model/appointements')

const AuthRouter = require("./routes/Auth");
const AdminRouter = require("./routes/admin");

app.use("/", AuthRouter);
app.use("/admin", AdminRouter);

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    app.listen(3030, () => {});
  })
  .catch((err) => console.log(err));
