// src/routes/chatRoutes.js
import express from 'express';
import {
  createChat,
  getChatById,
  deleteChat,
  getMessagesByChatId,
  getUserChats,
  getChatDetails,
  getOrCreateChat,
  saveMessage
} from '../controllers/chatController.js';

const router = express.Router();

router.post('/create', createChat);
//router.get('/all', getChats);
router.get('/:id', getChatById);
router.delete('/delete/:id', deleteChat);
router.get('/user/:user_id', getUserChats); // Obtener chats de un usuario específico
router.get('/:chat_id/messages', getMessagesByChatId); // Obtener mensajes de un chat específico
router.get('/chat/:chat_id', getChatDetails); // Endpoint para obtener detalles del chat
router.post('/getOrCreateChat', getOrCreateChat);
router.post('/chat/message', saveMessage); 


export default router;
