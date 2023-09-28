import app from "./config/app";
import "./config/database";
import { initializeProducts } from "./utils/product.initializer";
import { initializeUsers } from "./utils/userInitializer";

const PORT = process.env.SERVER_PORT ?? 3000;
app.listen(PORT);   

console.log("sever listen on port", PORT);

//call initializeProducts
initializeProducts();
//call initializeUsers
initializeUsers();