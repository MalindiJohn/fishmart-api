import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from "dotenv"
dotenv.config()

export const AppDataSource = new DataSource(

    // live railway database setting
    // {
    //     type: "postgres",
    //     host: process.env.DATABASE_HOST,
    //     port: parseInt(process.env.DATABASE_PORT),
    //     username: process.env.DATABASE_USERNAME,
    //     password: process.env.DATABASE_PASSWORD,
    //     database: process.env.DATABASE_NAME,
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
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
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
