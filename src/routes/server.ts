import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from '../config/config';
import Logging from '../library/logging';

const router = express();

//Connect to mongo
mongoose
    .connect(config.mongo.url, {retryWrites: true, w: 'majority'})
    .then(() => {
        console.log('connected to mongoDB.');
    })
    .catch((error) => {
        console.log('Unable to connect');
    });