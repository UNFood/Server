import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import bodyParser from "body-parser";
import { Router } from "express";
import router_manager from "../routes/manager.routes";

// import routes...

const app = express();
const router = Router();

app.use(express.static("public"));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.json({ limit: "50mb" }));

app.get("/home", (req, res) => {
  res.send("api version 1 en desarrollo ...");
});

// routes

app.use("/api", router_manager);

module.exports.handler = serverless(app);

export default app;

