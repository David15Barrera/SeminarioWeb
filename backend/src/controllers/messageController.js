// src/controllers/messageController.js
import Messages from '../models/messages.js';

// Crear un nuevo mensaje en el chat
export const createMessage = async (req, res) => {
  try {
    const { message, chat_id } = req.body;
    const newMessage = await Messages.create({ message, chat_id });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los mensajes
export const getMessages = async (req, res) => {
  try {
    const messages = await Messages.findAll();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un mensaje por ID
export const getMessageById = async (req, res) => {
  try {
    const message = await Messages.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un mensaje
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Messages.findByPk(id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    await message.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
