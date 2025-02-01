
import { Router } from "express";
import { CartController } from "../controllers/cart.controller";

export class CartRouter{
    private cartController: CartController;

    constructor(cartController: CartController) {
        this.cartController = cartController;
    }

    public mount(): Router {
        const router = Router();
        router.post("/add", (req, res) => this.cartController.addProduct(req, res));

        return router
    }
}
                