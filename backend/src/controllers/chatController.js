import Chat from '../models/chat.js';
import Messages from '../models/messages.js';
import ChatParticipants from '../models/chatParticipants.js';
import sequelize from '../config/database.js'; 
import User from '../models/user.js';
import { Op } from 'sequelize'; // Agregar esta línea
// Crear un nuevo chat
export const createChat = async (req, res) => {
  try {
    const newChat = await Chat.create();
    // Agregar participantes al chat
    const { participants } = req.body; // Espera un array de user_ids
    await ChatParticipants.bulkCreate(participants.map(user_id => ({ chat_id: newChat.id, user_id })));
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los chats
export const getUserChats = async (req, res) => {
  try {
    const { user_id } = req.params;
    const chats = await ChatParticipants.findAll({
      where: { user_id },
      include: [{ model: Chat }]
    });
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

// Obtener los mensajes de un chat específico
export const getMessagesByChatId = async (req, res) => {
  try {
    const { chat_id } = req.params;
    const messages = await Messages.findAll({
      where: { chat_id },
      include: [{ model: User, attributes: ['id', 'name'] }] // Incluye el nombre del usuario que envió el mensaje
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getChatDetails = async (req, res) => {
  const { chat_id } = req.params;

  try {
    // Buscar el chat por su ID
    const chat = await Chat.findByPk(chat_id);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Obtener participantes del chat
    const participants = await ChatParticipants.findAll({
      where: { chat_id },
      include: [{
        model: User, // Asegúrate de que el modelo User esté importado
        attributes: ['id', 'name'] // Asegúrate de incluir solo los atributos que necesitas
      }]
    });

    // Obtener mensajes del chat
    const messages = await Messages.findAll({
      where: { chat_id },
      order: [['created_at', 'ASC']], // Ordenar los mensajes por fecha
    });

    res.status(200).json({
      chat,
      participants,
      messages,
    });
  } catch (error) {
    console.error(error); // Para depuración
    res.status(500).json({ message: error.message });
  }
};


/////////////////////////////////////

// Obtener o crear un chat entre dos usuarios
export const getOrCreateChat = async (req, res) => {
  const { user_id_1, user_id_2 } = req.body;

  try {
    // Buscar si ya existe un chat entre los dos usuarios
    const chat = await Chat.findAll({
      attributes: ['id', 'created_at'], // Especifica las columnas que deseas seleccionar
      include: [
        {
          model: ChatParticipants,
          as: 'participants',
          attributes: [], // No es necesario seleccionar chat_id
          where: {
            user_id: { [Op.in]: [user_id_1, user_id_2] }
          }
        }
      ],
      group: ['Chat.id', 'Chat.created_at'], // Agrupa por id y created_at
      having: sequelize.where(sequelize.fn('COUNT', sequelize.col('participants.user_id')), 2) // Asegúrate de que ambos usuarios estén en el chat
    });

    // Si existe, devuelve el chat y los mensajes
    if (chat.length > 0) {
      const messages = await Messages.findAll({
        where: { chat_id: chat[0].id }, // Obtener el ID del primer chat
        order: [['created_at', 'ASC']], // Ordenar mensajes por fecha
      });
      return res.status(200).json({ chat: chat[0], messages });
    }

    // Si no existe, crea un nuevo chat
    const newChat = await Chat.create();

    // Agregar ambos usuarios al nuevo chat
    await ChatParticipants.bulkCreate([
      { chat_id: newChat.id, user_id: user_id_1 },
      { chat_id: newChat.id, user_id: user_id_2 },
    ]);

    // Devuelve el nuevo chat sin mensajes
    res.status(201).json({ chat: newChat, messages: [] });

  } catch (error) {
    console.error("Error en getOrCreateChat:", error);
    res.status(500).json({ message: error.message });
  }
};



// Guardar un mensaje en un chat específico
export const saveMessage = async (req, res) => {
  const { chat_id, sender_id, message } = req.body; // Cambia content a message

  try {
    // Verifica que el chat exista
    const chat = await Chat.findByPk(chat_id);
    if (!chat) {
      return res.status(404).json({ message: 'Chat no encontrado' });
    }

    // Crea el nuevo mensaje
    const newMessage = await Messages.create({
      chat_id: chat_id,
      sender_id: sender_id, // ID del usuario que envía el mensaje
      message: message, // Aquí usamos el campo correcto
    });

    // Devuelve el nuevo mensaje
    return res.status(201).json({ message: newMessage });

  } catch (error) {
    console.error("Error en saveMessage:", error);
    return res.status(500).json({ message: error.message });
  }
};
