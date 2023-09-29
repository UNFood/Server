import app from "./config/app";
import "./config/database";
import { initializeProducts } from "./utils/product.initializer";
import { initializeUsers } from "./utils/userInitializer";
import { initializeChazas } from "./utils/chaza.initializer";
const PORT = process.env.SERVER_PORT ?? 3000;
app.listen(PORT);   

console.log("sever listen on port", PORT);

//No descomentar estas lineas si no se quiere que se inicialicen los datos
//si descomenta las lineas, se inicializaran los datos cada vez que se inicie el servidor
//por tanto las id que estan en los data json cambiaran

//call initializeUsers
//initializeUsers();
//initializeChazas();
//call initializeProducts
//initializeProducts();
//call initializeChazas