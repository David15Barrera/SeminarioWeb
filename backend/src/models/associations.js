// src/models/associations.js
import Chat from './chat.js';
import ChatParticipants from './chatParticipants.js';
import Messages from './messages.js';
import User from './user.js';

function setupAssociations() {
  // Configura las asociaciones entre los modelos
  Chat.hasMany(ChatParticipants, { foreignKey: 'chat_id', as: 'participants' });
  ChatParticipants.belongsTo(Chat, { foreignKey: 'chat_id' });
  ChatParticipants.belongsTo(User, { foreignKey: 'user_id' });

  Messages.belongsTo(Chat, { foreignKey: 'chat_id' });
  Chat.hasMany(Messages, { foreignKey: 'chat_id', as: 'messages' });
}

export default setupAssociations;
