import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import chazaRoutes from './chazaRoutes'; 
import userRoutes from './userRoutes';

import { config } from '../config/config';
import exp from 'constants';
import router_manager from './manager.routes';


const router = express();

//Connect to mongo
mongoose
    .connect(config.mongo.url, {retryWrites: true, w: 'majority'})
    .then(() => {
        console.log('connected to mongoDB.');
        StartServer();
    })
    .catch((error) => {
        console.log('Unable to connect');
    });

//the server starts only if mongo connect
const StartServer = () => {
    router.use((req, res, next) => {
        //log the request
        console.log(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            //log the response
            console.log(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${req.statusCode}]`);
        })
        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    //Rules for API
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*'); //Guess that in prod its only going to have the ips from the team and the frontend
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    })
    //Body parser
    router.use(express.json());

    router.use('/users',userRoutes); // Obtener todos los usuarios
    router.use('/chazas', chazaRoutes); // Usar las rutas de chazas
    router.use('/', router_manager);
    
    //Healthcheck
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong'}));

    //Error handling
    router.use((req, res, next) => {
        const error = new Error('Not found');
        console.log(error);

        return res.status(404).json({ message: error.message});
    });

    http.createServer(router).listen(config.server.port, () => console.log(`Server is running on port: ${config.server.port}.`));
};