
import { Request, Response } from "express";
import { ProductService } from '../services/product.service';

export class ProductController {
  private productService: ProductService;
  constructor(productService: ProductService) {
    this.productService = productService;
  }

  public async getProducts(req: Request, res: Response): Promise<void> {
    const { page = 1, limit = 10 } = req.query;
    const products = await this.productService.getProducts(Number(page), Number(limit));
    if (products === undefined) {
      console.log(products);
    }
    res.json(products);
  }

  public async createProduct(req: Request, res: Response): Promise<void> {
    const product = req.body;
    const createdProduct = await this.productService.createProduct(product);
    res.status(201).json(createdProduct);
  }

  public async updateProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const product = req.body;
    const updatedProduct = await this.productService.updateProduct(Number(id), product);
    res.json(updatedProduct);
  }

  public async deleteProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this.productService.deleteProduct(Number(id));
    res.status(204).send();
  }
}
                