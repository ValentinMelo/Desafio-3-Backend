import ProductManager from './ProductManager.js';
import express from 'express'

const app = express();
const productManager = new ProductManager();

for (let i = 1; i <= 10; i++) {
  productManager.addProduct({
    title: `Producto ${i}`,
    description: `Descripción del producto ${i}`,
    price: 9.99 + i,
    thumbnail: `image${i}.png`,
    code: `PROD${i}`,
    stock: 10 + i,
  });
}

app.get("/productos", (req, res) => {
  const limit = parseInt(req.query.limit) || productManager.getProducts().length;
  const products = productManager.getProducts().slice(0, limit);
  res.send(products);
});

app.get("/productos/:id", (req, res) => {
  const idProducto = parseInt(req.params.id);
  const producto = productManager.getProductById(idProducto);
  if (!producto) return res.send({ error: "Producto no encontrado" });
  res.send(producto);
});

app.listen(8080, () => {
  console.log("Servidor arriba en el puerto 8080");
});
