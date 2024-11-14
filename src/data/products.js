import fs from 'fs';
import path from 'path';

const productsPath = path.resolve('src/data/products.json');

export const readProducts = () => {
  try {
    const products = fs.readFileSync(productsPath, 'utf-8');
    return JSON.parse(products);
  } catch (error) {
    console.error('Error reading products:', error);
    return [];
  }
};

export const writeProducts = (products) => {
  try {
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
  } catch (error) {
    console.error('Error writing products:', error);
  }
};