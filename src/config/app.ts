import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Router } from "express";
import router_manager from "../routes/manager.routes";

// import routes...

const app = express();
const router = Router();

//app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("api version 1 en desarrollo ...");
});

// routes

app.use("/api", router_manager);

export default app;
