const db = require('../config/db');

exports.createRoom = async (req, res) => {
    if (!req.user.isPrime) return res.status(403).json({ message: 'Only prime members can create chat rooms' });

    const { roomId, createdBy } = req.body;

    try {
        await db.query(
            'INSERT INTO chatrooms (roomId, createdBy) VALUES (?, ?)',
            [roomId, createdBy]
        );
        res.status(201).json({ message: 'Chat room created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.joinRoom = async (req, res) => {
    const { roomId } = req.body;

    try {
        const [room] = await db.query('SELECT * FROM chatrooms WHERE roomId = ?', [roomId]);
        if (room.length === 0) return res.status(404).json({ message: 'Room not found' });

        const [participants] = await db.query('SELECT COUNT(*) AS count FROM messages WHERE roomId = ?', [roomId]);
        if (participants[0].count >= room[0].maxCapacity) return res.status(400).json({ message: 'Room is full' });


        res.status(200).json({ message: 'Joined room successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
