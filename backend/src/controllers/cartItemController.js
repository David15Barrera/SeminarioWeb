import CartItem from '../models/cartItem.js';

// Crea un nuevo item en el carrito
export const createCartItem = async (req, res) => {
  try {
    const { quantity, sub_total, cart_id, product_id } = req.body;
    const newCartItem = await CartItem.create({ quantity, sub_total, cart_id, product_id });
    res.status(201).json(newCartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtiene todos los items del carrito
export const getCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.findAll();
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtiene un item del carrito por ID
export const getCartItemById = async (req, res) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart Item not found' });
    }
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualiza un item en el carrito
export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart Item not found' });
    }
    await cartItem.update(req.body);
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Elimina un item del carrito
export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart Item not found' });
    }
    await cartItem.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualiza la cantidad y subtotal de un item en el carrito
export const updateCartItemDetails = async (req, res) => {
  const { id } = req.params; // ID del CartItem a actualizar
  const { quantity, sub_total } = req.body; // Nuevos valores

  try {
    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart Item no encontrado' });
    }

    // Actualiza la cantidad y subtotal
    cartItem.quantity = quantity;
    cartItem.sub_total = sub_total;
    await cartItem.save();

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTotalSalesReport = async (req, res) => {
  try {
    // 1. Obtener todos los ítems del carrito
    const cartItems = await CartItem.findAll();

    // 2. Calcular el total de ventas
    const totalSales = cartItems.reduce((acc, item) => acc + item.sub_total, 0);

    // 3. Retornar el saldo total de ventas
    res.status(200).json({ totalSales });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};