import User from '../models/user.js'
import Role from '../models/role.js'
import { Op } from 'sequelize'; 
import bcrypt from 'bcrypt';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      const role = await Role.findByPk(user.role_id);
  
      // Para generar el token, pero ahora lo dejamos pasar
      // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: role ? role.role_name : null,
        // token, // Por si deseo el token
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const register = async (req, res) => {
    const { name, email, address, nit, password, payment_method } = req.body;
  
    try {
      // Validar el correo en el portal de pagos
      const tokenResponse = await axios.post(`${process.env.PAYMENT_API_URL}/auth/company`, {
        code: process.env.PAYMENT_API_CODE,
        secretKey: process.env.PAYMENT_API_SECRET_KEY
      });
      const token = tokenResponse.data.token;
  
      // Validar si el email existe en el portal de pagos
      const emailResponse = await axios.get(`${process.env.PAYMENT_API_URL}/user-email/${email}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      if (!emailResponse.data.exists) {
        return res.status(400).json({ message: 'El correo no está registrado en el portal de pagos.' });
      }
  
      // Continuar con el registro si el correo es válido
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        address,
        nit,
        password: hashedPassword,
        role_id: 2,
        payment_method,
      });
  
      res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        address: newUser.address,
        nit: newUser.nit,
        created_at: newUser.created_at,
        message: 'User registered successfully',
      });
    } catch (error) {
      res.status(500).json({ message: error.response?.data?.message || error.message });
    }
  };
  