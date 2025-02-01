
import { Product } from "../models/product.model";
import { Pool } from "pg";

export class ProductRepository {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  public async getAll(page: number, limit: number): Promise<Product[]> {
    const offset = (page - 1) * limit;
    const result = await this.pool.query(
      "SELECT * FROM books LIMIT $1 OFFSET $2",
      [limit, offset]
    );
    
    return result.rows;
  }

  public async create(product: Product): Promise<Product> {
    const result = await this.pool.query(
      "INSERT INTO books (title, price) VALUES ($1, $2) RETURNING *",
      [product.title, product.price]
    );
    return result.rows[0];
  }

  public async update(id: number, product: Product): Promise<Product> {
    const result = await this.pool.query(
      "UPDATE books SET title = $1, price = $2 WHERE id = $3 RETURNING *",
      [product.title, product.price, id]
    );
    return result.rows[0];
  }

  public async delete(id: number): Promise<void> {
    await this.pool.query("DELETE FROM books WHERE id = $1", [id]);
  }
}
                