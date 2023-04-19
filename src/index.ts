import "reflect-metadata";
import { AppDataSource } from "./data-source"
import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { Routes } from "./routes"
import { User } from "./entity/User"
import * as cors from "cors";

AppDataSource.initialize().then(async () => {
    console.log('node process', process.env.NODE_ENV);
    
    // create express app
    const app = express()
    app.use(bodyParser.json())

    let allowedHosts = ['http://localhost:4200', 'http://bitvextech.com']
    let corsOptionsDelegate = function(req, callback) {
        let corsOptions;
        if(allowedHosts.indexOf(req.header('Origin')) !== -1) {
            corsOptions = { origin: true }
        } else {
            corsOptions = { origin: false }
        }

        callback(null, corsOptions);
    }

    app.use(cors(corsOptionsDelegate));

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    // setup express app here
    // ...

    // start express server
    app.listen(3000)

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
