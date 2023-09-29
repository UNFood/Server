import app from "./config/app";
import "./config/database";
import { initializeProducts } from "./utils/product.initializer";
import { initializeUsers } from "./utils/userInitializer";
import { initializeChazas } from "./utils/chaza.initializer";
const PORT = process.env.SERVER_PORT ?? 3000;
app.listen(PORT);   

console.log("sever listen on port", PORT);
//call initializeUsers
//initializeUsers();
//initializeChazas();
//call initializeProducts
initializeProducts();
//call initializeChazas