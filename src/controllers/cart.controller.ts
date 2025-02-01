
import { Request, Response } from "express";
import { CartService } from "../services/cart.service";

export class CartController {
  private cartService: CartService;

  constructor(cartService: CartService) {
    this.cartService = cartService;
  }

  public async addProduct(req: Request, res: Response): Promise<void> {
    const books = Array.isArray(req.body) ? req.body : req.body.books;
    if (!Array.isArray(books)) {
      res.status(400).json({ error: "Invalid request format. Expected an array of books." });
      return;
    }

    const totalPrice = await this.cartService.addProduct(books);
    res.json({ totalPrice });
  }
}
                