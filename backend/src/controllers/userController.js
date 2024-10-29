import User from '../models/user.js';
import bcrypt from 'bcrypt';
// Crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  try {
    const { password } = req.body;

    // Encriptar la nueva contraseña si se está cambiando
    if (password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(password, salt);
    }

    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const updatedUser = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] } // Excluir contraseña de la respuesta
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Cambiar el rol de un usuario
export const updateUserRole = async (req, res) => {
  const { id } = req.params; // ID del usuario
  const { role_id } = req.body; // Nuevo rol

  try {
    // Verificar si el usuario existe
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar el rol del usuario
    user.role_id = role_id;
    await user.save();

    res.status(200).json({ message: 'Rol de usuario actualizado', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};