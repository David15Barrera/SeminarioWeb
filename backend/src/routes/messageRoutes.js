import express from 'express';
import {
  createMessage,
  getMessages,
  getMessageById,
  deleteMessage,
  getUserMessages
  
} from '../controllers/messageController.js';

const router = express.Router();

router.post('/create', createMessage);
router.get('/all', getMessages);
router.get('/:id', getMessageById);
router.delete('/delete/:id', deleteMessage);
router.get('/user/:user_id', getUserMessages); 
export default router;
