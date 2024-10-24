// src/routes/chatParticipantsRoutes.js
import express from 'express';
import {
  addParticipant,
  getChatParticipants,
  removeParticipant,
} from '../controllers/chatParticipantsController.js';

const router = express.Router();

router.post('/', addParticipant); // Ruta para añadir un participante a un chat
router.get('/:chat_id', getChatParticipants); // Ruta para obtener los participantes de un chat
router.delete('/:chat_id/:user_id', removeParticipant); // Ruta para eliminar un participante de un chat

export default router;
