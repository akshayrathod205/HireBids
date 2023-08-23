// Packages
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth");
const dashboardRouter = require("./routes/dashboard");
const searchJobsRouter = require("./routes/searchJobs");
const raiseTicketRouter = require("./routes/raiseTicket");
const bidTicketRouter = require("./routes/bidTicket");
const seeBidsRouter = require("./routes/seeBids");
const getProviderRouter = require("./routes/getProvider");
const getConsumerRouter = require("./routes/getConsumer");
const feedBackRouter = require("./routes/feedback")
const generateCodeRouter = require("./routes/genCode")
const acceptBidRouter = require("./routes/acceptBid")
const connectDB = require("./db/connect");

// CONFIGURATIONS

require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

// ENV IMPORTS
const port = process.env.PORT;
const connectionString = process.env.MONGO_DB_URI;

//ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/searchJobs", searchJobsRouter);
app.use("/api/v1/raiseTicket", raiseTicketRouter);
app.use("/api/v1/bidTicket", bidTicketRouter);
app.use("/api/v1/seeBids", seeBidsRouter);
app.use("/api/v1/consumer", getConsumerRouter);
app.use("/api/v1/provider", getProviderRouter);
app.use("/api/v1/feedback", feedBackRouter)
app.use("/api/v1/generateCode", generateCodeRouter)
app.use("/api/v1/acceptBid", acceptBidRouter)

//SERVER STARTUP
const startServer = async () => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
  await connectDB(connectionString);
  console.log("Database connected...");
};

startServer();
