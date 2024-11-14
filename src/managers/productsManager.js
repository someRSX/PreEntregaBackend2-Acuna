let products = [];

export const getAllProducts = () => {
  return products;
};

export const addProduct = (product) => {
  product.id = products.length + 1;
  products.push(product);
};

export const removeProduct = (productId) => {
  products = products.filter(product => product.id !== productId);
};