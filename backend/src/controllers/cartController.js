// src/controllers/cartController.js
import Cart from '../models/cart.js';
import CartItem from '../models/cartItem.js';

// Crear un nuevo carrito
export const createCart = async (req, res) => {
  try {
    const { total, tax, payment_method, status, user_id, discount_payment_method } = req.body;
    const newCart = await Cart.create({ total, tax, payment_method, status, user_id, discount_payment_method });
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los carritos
export const getCarts = async (req, res) => {
  try {
    const carts = await Cart.findAll();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un carrito por ID
export const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Carrito No encontrado' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un carrito
export const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findByPk(id);
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    await cart.update(req.body);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un carrito
export const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findByPk(id);
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    await cart.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
