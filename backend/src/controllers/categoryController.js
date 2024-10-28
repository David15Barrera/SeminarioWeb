import Category from '../models/category.js';
import Product from '../models/product.js';
// Crear una nueva categoría
export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todas las categorías
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una categoría por ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Categoría no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una categoría
export const updateCategory = async (req, res) => {
  try {
    const [updated] = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedCategory = await Category.findByPk(req.params.id);
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Categoría no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una categoría
export const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Categoría no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategoriesByProductId = async (req, res) => {
  const productId = req.params.id;

  try {
    // Obtener el producto junto con sus categorías
    const product = await Product.findByPk(productId, {
      include: {
        model: Category,
        through: {
          attributes: [] // Ocultar atributos de la tabla intermedia
        }
      }
    });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Extraer los nombres de las categorías
    const categories = product.categories.map(category => category.name);

    res.status(200).json({ productId, categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
