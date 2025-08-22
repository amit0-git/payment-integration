// server/src/index.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./database/dbConfig.js";
import paymentRoutes from "./routes/payment.js";

const app = express();
app.use(cors());
app.use(express.json()); // <-- important
app.use(express.urlencoded({ extended: true })); // optional, for form data

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(helmet());
// NOTE: do NOT add express.json() before webhook raw parser on /webhook (we used route-level raw)

app.use("/api/payment", paymentRoutes);

const start = async () => {
  await connectDB();
  app.listen(process.env.PORT, () =>
    console.log(`🚀 Server on http://localhost:${process.env.PORT}`)
  );
};
start();
