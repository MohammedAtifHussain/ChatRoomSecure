const express = require('express');
const { createRoom, joinRoom } = require('../controllers/chatRoomController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/chatrooms', authMiddleware, createRoom);
router.post('/joinroom', authMiddleware, joinRoom);

module.exports = router;
