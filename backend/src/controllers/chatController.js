import Chat from '../models/chat.js';
import Messages from '../models/messages.js';
import ChatParticipants from '../models/chatParticipants.js';

// Crear un nuevo chat
export const createChat = async (req, res) => {
  try {
    const newChat = await Chat.create();
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los chats
export const getChats = async (req, res) => {
  try {
    const chats = await Chat.findAll();
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un chat por ID
export const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findByPk(req.params.id);
    if (!chat) {
      return res.status(404).json({ message: 'chat no encontrado' });
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un chat
export const deleteChat = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findByPk(id);
    if (!chat) {
      return res.status(404).json({ message: 'Chat no encontrado' });
    }
    await chat.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
