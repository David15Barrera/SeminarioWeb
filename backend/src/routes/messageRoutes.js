import express from 'express';
import {
  createMessage,
  getMessages,
  getMessageById,
  deleteMessage,
} from '../controllers/messageController.js';

const router = express.Router();

router.post('/create', createMessage);
router.get('/all', getMessages);
router.get('/:id', getMessageById);
router.delete('/delete/:id', deleteMessage);

export default router;
