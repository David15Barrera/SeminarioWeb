import ProductCategory from '../models/productCategory.js';

// Crear una nueva relación entre producto y categoría
export const createProductCategory = async (req, res) => {
  try {
    const productCategory = await ProductCategory.create(req.body);
    res.status(201).json(productCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todas las relaciones entre productos y categorías
export const getAllProductCategories = async (req, res) => {
  try {
    const productCategories = await ProductCategory.findAll();
    res.status(200).json(productCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una relación entre producto y categoría por ID
export const getProductCategoryById = async (req, res) => {
  try {
    const productCategory = await ProductCategory.findByPk(req.params.id);
    if (productCategory) {
      res.status(200).json(productCategory);
    } else {
      res.status(404).json({ message: 'Relación producto-categoría no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una relación entre producto y categoría
export const updateProductCategory = async (req, res) => {
  try {
    const [updated] = await ProductCategory.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedProductCategory = await ProductCategory.findByPk(req.params.id);
      res.status(200).json(updatedProductCategory);
    } else {
      res.status(404).json({ message: 'Relación producto-categoría no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una relación entre producto y categoría
export const deleteProductCategory = async (req, res) => {
  try {
    const deleted = await ProductCategory.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Relación producto-categoría no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
