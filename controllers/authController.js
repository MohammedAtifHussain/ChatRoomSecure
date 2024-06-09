const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

exports.register = async (req, res) => {
    const { userId, deviceId, name, phone, availCoins, password, isPrime } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const [rows] = await db.query(
            'INSERT INTO users (userId, deviceId, name, phone, availCoins, password, isPrime) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [userId, deviceId, name, phone, availCoins, hashedPassword, isPrime]
        );
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { userId, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE userId = ?', [userId]);
        if (rows.length === 0) return res.status(400).json({ message: 'Invalid user ID or password' });

        const user = rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid user ID or password' });

        const token = jwt.sign({ userId: user.userId, isPrime: user.isPrime }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
