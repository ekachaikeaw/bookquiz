
import { Router } from "express";
import { ProductController } from "../controllers/product.controller";


export class ProductRouter{
    private productController: ProductController;
    constructor(productController: ProductController) {
        this.productController = productController;
    }

    public mount(): Router {
        const router = Router();

        router.get("/", (req, res) => this.productController.getProducts(req, res));
        router.post("/", (req, res) => this.productController.createProduct(req, res));
        router.put("/:id", (req, res) => this.productController.updateProduct(req, res));
        router.delete("/:id", (req, res) => this.productController.deleteProduct(req, res));

        return router
    }
}

                