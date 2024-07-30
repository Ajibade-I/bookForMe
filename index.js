require("dotenv").config();
require("express-async-errors");
require("colors");
const express = require("express");
const { connectDB } = require("./config/db");
const accesslogs = require("./lib/midlleware/accesslogs");
const { notFound, errorHandler } = require("./lib/midlleware/error-middleware");
const app = express();
const port = 4050;
const cors = require('cors');
const cookieParser = require("cookie-parser");
const { guestRoutes, hotelRoutes, reservationRoutes, adminRoutes } = require("./routes/routeIndex");

app.use(cors()); // Enable CORS
app.use(express.json());
app.use(cookieParser(process.env.JWT_PRIVATE_KEY));


app.use("/api/auth", accesslogs, guestRoutes);
app.use("/api/hotel", accesslogs, hotelRoutes);
app.use("/api/reservation", accesslogs, reservationRoutes);
app.use("/api/admin", accesslogs, adminRoutes);


app.use(notFound)
app.use(errorHandler)

connectDB();

app.listen(port, () => console.log(`...Listening on ${port}...`));
