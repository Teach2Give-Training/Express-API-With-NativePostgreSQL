import "dotenv/config"
import { Client } from "pg"

const client = new Client({
    connectionString: process.env.DATABASE_URL as string
});



export default client;