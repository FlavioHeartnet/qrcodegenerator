import * as dotenv from 'dotenv'
dotenv.config();
export const config = {
    apiKey: process.env.BBAPIKey,
}