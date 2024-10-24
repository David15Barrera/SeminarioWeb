import ChatParticipants from '../models/chatParticipants.js';
import Chat from '../models/chat.js';
import User from '../models/user.js';

// Añadir un participante a un chat
export const addParticipant = async (req, res) => {
  try {
    const { chat_id, user_id } = req.body;

    // Verificar si el chat y el usuario existen
    const chat = await Chat.findByPk(chat_id);
    const user = await User.findByPk(user_id);

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Crear la relación entre el chat y el usuario
    const participant = await ChatParticipants.create({ chat_id, user_id });
    res.status(201).json(participant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los participantes de un chat
export const getChatParticipants = async (req, res) => {
  try {
    const { chat_id } = req.params;

    // Verificar si el chat existe
    const chat = await Chat.findByPk(chat_id);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Obtener todos los participantes del chat
    const participants = await ChatParticipants.findAll({
      where: { chat_id },
      include: [{ model: User, attributes: ['id', 'username'] }],
    });

    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un participante de un chat
export const removeParticipant = async (req, res) => {
  try {
    const { chat_id, user_id } = req.params;

    // Buscar la relación participante-chat
    const participant = await ChatParticipants.findOne({ where: { chat_id, user_id } });
    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }

    // Eliminar la relación
    await participant.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
