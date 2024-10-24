// src/routes/chatRoutes.js
import express from 'express';
import {
  createChat,
  getChats,
  getChatById,
  deleteChat,
} from '../controllers/chatController.js';

const router = express.Router();

router.post('/create', createChat);
router.get('/all', getChats);
router.get('/:id', getChatById);
router.delete('/delete/:id', deleteChat);

export default router;
