import express from 'express';
import Chat from '../models/Chat.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/message', auth, async (req, res) => {
  try {
    const { chatId, message } = req.body;
    const userId = req.user.userId;

    let chat;
    if (chatId) {
      chat = await Chat.findById(chatId);
      if (!chat || chat.userId.toString() !== userId) {
        return res.status(404).json({ error: 'Chat not found' });
      }
    } else {
      chat = new Chat({ userId });
    }

    chat.messages.push({
      content: message,
      sender: 'user',
    });

    // Add bot response (you can implement your chatbot logic here)
    chat.messages.push({
      content: 'This is a sample response from the bot.',
      sender: 'bot',
    });

    await chat.save();
    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/history', auth, async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;