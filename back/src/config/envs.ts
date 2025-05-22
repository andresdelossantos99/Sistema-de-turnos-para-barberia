import "dotenv/config";
import { IConfig } from "../interfaces/IConfig";



export const config: IConfig = {
     PORT: process.env.PORT? parseInt(process.env.PORT,10): 3000,
     DB_PORT:process.env.DB_PORT ? parseInt(process.env.DB_PORT,10): 5432,                       
     DB_USERNAME:process.env.DB_USERNAME,
     DB_PASSWORD:process.env.DB_PASSWORD,
     DB_NAME:process.env.DB_NAME,
     DB_SYNCHRONIZE:process.env.DB_SYNCHRONIZE? process.env.DB_SYNCHRONIZE === 'true': true,
     DB_DROP_SCHEMA:process.env.DB_DROP_SCHEMA? process.env.DB_DROP_SCHEMA === 'true': true,
     DB_LOGGING:process.env.DB_LOGGING? process.env.DB_LOGGING === 'true': true,
     DB_ENTITIES:process.env.DB_ENTITIES,   
     DB_HOST:process.env.DB_HOST,
}