import express from "express";
import cors from "cors";

// import routes...

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/", (_, res) => {
  res.send("api version 1 en desarrollo ...");
});

// routes

export default app;
