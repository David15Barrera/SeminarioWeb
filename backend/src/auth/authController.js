import User from '../models/user.js'
import Role from '../models/role.js'
import { Op } from 'sequelize'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [
            { email },
            { nit }
          ]
        }
      });
  
      if (existingUser) {
        return res.status(409).json({ message: 'Email or NIT already exists' });
      }
  
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
       const newUser = await User.create({
        name,
        email,
        address,
        nit,
        password: hashedPassword,
        role_id: 2, // Este rerá el rol del cliente = 1
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
      res.status(500).json({ message: error.message });
    }
  };