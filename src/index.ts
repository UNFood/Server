
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import chazaRoutes from './routes/chazaRoutes';
import app from "./config/app";

const app = express();
//import "./config/database";

const PORT = process.env.SERVER_PORT ?? 9090;
app.listen(PORT);

console.log("sever listen on port", PORT);
