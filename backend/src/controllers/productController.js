import Product from '../models/product.js';
import { Op } from 'sequelize';

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.update(req.body);
      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.json({ message: 'Producto eliminado' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Prodcutos
export const getProductsInRange = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
      if (!startDate || !endDate) {
          return res.status(400).json({ message: 'Se deben especificar las fechas de inicio y fin' });
      }

      // Convertir las fechas
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Asegúrate de que el endDate incluye todo el día

      console.log("Fechas para la consulta:", start, end); // Imprimir fechas para depuración

      const products = await Product.findAll({
          where: {
              created_at: {
                  [Op.between]: [start, end],
              },
              available_quantity: {
                  [Op.gt]: 0,
              },
          },
      });

      if (products.length === 0) {
          return res.status(404).json({ message: 'No se encontraron productos en el rango de fechas' });
      }

      res.json(products);
  } catch (error) {
      console.error("Error en la consulta:", error); // Imprimir error para depuración
      res.status(500).json({ message: error.message });
  }
};
