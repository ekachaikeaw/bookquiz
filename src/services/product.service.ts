
import { ProductRepository } from "../repositories/product.repository";
import { Product } from '../models/product.model';

export class ProductService {
  
  private productRepo:ProductRepository;
  constructor(productRepo: ProductRepository) {
    this.productRepo = productRepo;
  }
  public async getProducts(page: number, limit: number): Promise<Product[]> {
    return this.productRepo.getAll(page, limit);
  }

  public async createProduct(product: Product): Promise<Product> {
    return this.productRepo.create(product);
  }

  public async updateProduct(id: number, product: Product): Promise<Product> {
    return this.productRepo.update(id, product);
  }

  public async deleteProduct(id: number): Promise<void> {
    return this.productRepo.delete(id);
  }
}
                