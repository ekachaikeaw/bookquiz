import { Product } from "../models/product.model";

export class CartService {
  public async addProduct(books: Product[]): Promise<number> {
    return this.calculateTotal(books)
  }

  private async calculateTotal(books: Product[]): Promise<number> {
    if (!Array.isArray(books)) {
      throw new Error("Invalid books data, expected an array");
    }

    let preDiscount:number = 0;
    for (let book of books ) {
      preDiscount += book.price 
    };

    let discountPercen:number = 0;
    let bookSet = new Set(books);
    discountPercen = (bookSet.size - 1) * 10;

    let discount:number = (preDiscount * discountPercen) / 100;

    const totalPrice:number = preDiscount - discount;
    return totalPrice;
  }

}
                