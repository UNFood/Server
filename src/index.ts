import app from "./config/app";
import "./config/database";
import { initializeProducts } from "./utils/product.initializer";
import { initializeUsers } from "./utils/userInitializer";
import { initializeChazas } from "./utils/chaza.initializer";
import "dotenv/config";

const PORT = process.env.SERVER_PORT ?? 3000;

// Uncomment the following lines to initialize data
// Note: Be cautious about data initialization in a production environment.
// It's typically used for development or testing.
// initializeUsers();
// initializeChazas();
// initializeProducts();

app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
