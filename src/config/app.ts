import express from "express";
import cors from "cors";
import { Router } from "express";
import router_manager from "../routes/manager.routes";
import fileUpload from "express-fileupload";

// import routes...

const app = express();
const router = Router();

app.use(express.static("public"));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(
  fileUpload({
    useTempFiles: true,
    safeFileNames: true,
    preserveExtension: true,
    tempFileDir: "/tmp/",
  })
);

app.get("/", (req, res) => {
  res.send("api version 1 en desarrollo ...");
});

// routes

app.use("/api", router_manager);

export default app;
