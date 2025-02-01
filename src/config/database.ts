
import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config()

export async function NewPool(): Promise<Pool> {

  const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT) || 5432,
    ssl: Boolean(process.env.PG_SSL) || false
  });

 const client = await pool.connect()
  await client.query('SELECT NOW()')
  client.release() 
  console.log("connected to database")
  return pool
}

                