import fs from 'fs';
import Product from '../models/Product';

export const initializeProducts = async (): Promise<void> => {
  try {
    // Leer el archivo productos.json
    const rawData = fs.readFileSync('src/utils/data/products.json', 'utf-8');
    const products = JSON.parse(rawData);

    // Count Documents
    const count: number = await Product.estimatedDocumentCount();

    // Comprueba si ya existen productos y elimínalos si es necesario
    if (count > 0) {
      await Product.deleteMany();
    }

    // Crea los productos desde el archivo JSON
    
  } catch (error) {
    // Manejar cualquier error aquí
    console.error('Error al inicializar productos:', error);
  }
};
