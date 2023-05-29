import * as dotenv from "dotenv";
dotenv.config();

export const DATABASE_URI = process.env.APP_DATABASE_URI;
export const JWT_SECRET = process.env.APP_JWT_SECRET;