
import express from "express";
import { ProductRouter } from "./routes/product.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger";
import { ProductController } from "./controllers/product.controller";
import { ProductService } from "./services/product.service";
import { ProductRepository } from './repositories/product.repository';
import { NewPool } from "./config/database";
import { CartRouter } from "./routes/cart.routes";
import { CartController } from "./controllers/cart.controller";
import { CartService } from "./services/cart.service";

async function startServer() {
  // init Database
  const pool = await NewPool(); 

  // for Product
  const productRepo = new ProductRepository(pool);
  const productService = new ProductService(productRepo);
  const productController = new ProductController(productService);
  const productRouter = new ProductRouter(productController);

  // for Cart
  const cartService = new CartService();
  const cartController = new CartController(cartService)
  const cartRouter = new CartRouter(cartController);

  // mount Routes
  const cartRoutes = cartRouter.mount();
  const productRoutes = productRouter.mount();

  // express
  const app = express();
  app.use(express.json());

  // define Routes
  app.use("/products", productRoutes);
  app.use("/cart", cartRoutes);

  // Swagger documentation not implement yet
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
}

startServer().catch((error) => {
  console.error("Failed to start the server:", error);
});