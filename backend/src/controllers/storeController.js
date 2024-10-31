import Store from '../models/store.js';

// Crea una nueva tienda
export const createStore = async (req, res) => {
  try {
    const { name, description, code, address, phone } = req.body;
    const newStore = await Store.create({ name, description, code, address, phone });
    res.status(201).json(newStore);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtiene todas las tiendas
export const getStores = async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtiene una tienda por ID
export const getStoreById = async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }
    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualiza una tienda
export const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findByPk(id);
    if (!store) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }
    await store.update(req.body);
    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Elimina una tienda
export const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findByPk(id);
    if (!store) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }
    await store.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
