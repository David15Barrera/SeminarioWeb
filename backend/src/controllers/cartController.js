// src/controllers/cartController.js
import sequelize from '../config/database.js';
import Cart from '../models/cart.js';
import CartItem from '../models/cartItem.js';
import Product from '../models/product.js';
import Supplier from '../models/supplier.js';
import { Op } from 'sequelize';
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


// Obtener el carrito con estado PENDING del usuario
export const getPendingCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const pendingCart = await Cart.findOne({
      where: { user_id: userId, status: 'PENDING' },
    });
    res.status(200).json(pendingCart || null);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo carrito con estado PENDING
export const createPendingCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const newCart = await Cart.create({
      total: 0,
      tax: 0,
      payment_method: 'PAYPAL',
      status: 'PENDING',
      user_id: userId,
      discount_payment_method: 0,
    });
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Agregar o actualizar un producto en el carrito PENDING
export const addProductToCart = async (req, res) => {
  const { userId } = req.params;
  const { product, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ where: { user_id: userId, status: 'PENDING' } });

    // Si no hay carrito PENDING, crear uno
    if (!cart) {
      cart = await Cart.create({
        total: 0,
        tax: 0,
        payment_method: 'PAYPAL',
        status: 'PENDING',
        user_id: userId,
        discount_payment_method: 0,
      });
    }

    // Obtener o crear el item del carrito
    let cartItem = await CartItem.findOne({
      where: { cart_id: cart.id, product_id: product.id },
    });

    const subTotal = product.price * quantity;

    if (cartItem) {
      // Actualizar cantidad y subtotal
      cartItem.quantity += quantity;
      cartItem.sub_total += subTotal;
      await cartItem.save();
    } else {
      // Crear nuevo item en el carrito
      cartItem = await CartItem.create({
        cart_id: cart.id,
        product_id: product.id,
        quantity: quantity,
        sub_total: subTotal,
      });
    }

    // Actualizar el total del carrito
    await updateCartTotal(cart.id);

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar el total del carrito
export const updateCartTotal = async (cartId) => {
  try {
    const cartItems = await CartItem.findAll({ where: { cart_id: cartId } });
    const total = cartItems.reduce((acc, item) => acc + item.sub_total, 0);

    const cart = await Cart.findByPk(cartId);
    if (cart) {
      cart.total = total;
      await cart.save();
    }
  } catch (error) {
    console.error('Error updating cart total:', error.message);
  }
};

export const getPendingCartItems = async (req, res) => {
  const { userId } = req.params;

  try {
    // Obtener el carrito PENDING del usuario
    const cart = await Cart.findOne({
      where: { user_id: userId, status: 'PENDING' },
    });

    if (!cart) {
      return res.status(404).json({ message: 'No hay carrito PENDING para este usuario.' });
    }

    // Obtener los items del carrito
    const cartItems = await CartItem.findAll({
      where: { cart_id: cart.id },
      include: [{ model: Product, attributes: ['name', 'image_url', 'price'] }], // Incluye el nombre del producto
    });

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getCartItemsByCartId = async (req, res) => {
  const { cartId } = req.params;

  try {
    // Obtener items del carrito usando el ID del carrito
    const cartItems = await CartItem.findAll({
      where: { cart_id: cartId },
      include: [{ model: Product, attributes: ['name', 'price'] }], // Incluir el nombre y precio del producto
    });

    if (cartItems.length === 0) {
      return res.status(404).json({ message: 'No se encontraron items para este carrito.' });
    }

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getProductsReport = async (req, res) => {
  try {
    const cartItems = await CartItem.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'price'], // Selecciona los atributos que necesitas
          include: [{
            model: Supplier,
            attributes: ['id', 'name'] // Cambia los atributos según lo que necesites
          }]
        }
      ],
    });

    // Formatear el reporte
    const report = cartItems.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      category: item.product.categories, // Asegúrate de que tengas la relación correctamente
      supplier: item.product.supplier.name,
      quantity: item.quantity,
      total: item.sub_total
    }));

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAboveAverageSalesProducts = async (req, res) => {
  try {
    // 1. Obtener todos los items del carrito
    const cartItems = await CartItem.findAll();

    // 2. Calcular el total de ventas y el número de productos vendidos
    const totalSales = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalProductsSold = cartItems.length;

    // 3. Calcular el promedio de ventas
    const averageSales = totalProductsSold ? totalSales / totalProductsSold : 0;

    // 4. Obtener los productos que superan el promedio de ventas
    const aboveAverageProducts = await CartItem.findAll({
      attributes: ['product_id', [sequelize.fn('SUM', sequelize.col('quantity')), 'total_quantity']],
      group: ['product_id'],
      having: sequelize.where(sequelize.fn('SUM', sequelize.col('quantity')), {
        [Op.gt]: averageSales // Usar Op.gt correctamente
      }),
      include: [{
        model: Product,
        attributes: ['id', 'name'],
      }]
    });

    // 5. Formatear la respuesta
    const report = aboveAverageProducts.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      totalSold: item.dataValues.total_quantity,
    }));

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};