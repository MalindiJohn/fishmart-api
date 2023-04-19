import "reflect-metadata"
import { DataSource } from "typeorm"
import { Member } from "./entity/Member"
import { User } from "./entity/User"
import * as dotenv from "dotenv"
dotenv.config()

export const AppDataSource = new DataSource(

    // live railway database setting
    // {
    //     type: "postgres",
    //     host: "containers-us-west-174.railway.app",
    //     port: 5954,
    //     username: "postgres",
    //     password: "u7CW1zR9beNBDLbft6Uf",
    //     database: "railway",
    //     synchronize: true,
    //     logging: false,
    //     entities: [
    //         process.env.NODE_ENV == 'production' ? "build/entity/**/*.js" : "src/entity/**/*.ts"
    //     ],
    //     migrations: [
    //         process.env.NODE_ENV == 'production' ? "build/migration/**/*.js" : "src/migration/**/*.ts"
    //     ],
    //     subscribers: [
    //         process.env.NODE_ENV == 'production' ? "build/subscriber/**/*.js": "src/subscriber/**/*.js"
    //     ],
    // }

    //local database settings
    {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "Fa1c0n_|||",
        database: "fishmartdb",
        synchronize: true,
        logging: false,
        entities: [
            process.env.NODE_ENV == 'production' ? "build/entity/**/*.js" : "src/entity/**/*.ts"
        ],
        migrations: [
            process.env.NODE_ENV == 'production' ? "build/migration/**/*.js" : "src/migration/**/*.ts"
        ],
        subscribers: [
            process.env.NODE_ENV == 'production' ? "build/subscriber/**/*.js": "src/subscriber/**/*.js"
        ],
    },
)
