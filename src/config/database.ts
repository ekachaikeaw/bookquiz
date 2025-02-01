
import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config()

export async function NewPool(): Promise<Pool> {

  const pool = new Pool({
    user: process.env.PG_USER || "postgres",
    host: process.env.PG_HOST || "localhost",
    database: process.env.PG_DATABASE || "postgres",
    password: process.env.PG_PASSWORD || "postgres",
    port: Number(process.env.PG_PORT) || 5432,
    ssl: Boolean(process.env.PG_SSL) || false
  });

 const client = await pool.connect()
  await client.query('SELECT NOW()')
  client.release() 
  console.log("connected to database")
  return pool
}

                