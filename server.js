const authRoutes = require('./routes/authRoutes');
const chatRoomRoutes = require('./routes/chatRoomRoutes');
const messageRoutes = require('./routes/messageRoutes');
const profileRoutes = require('./routes/profileRoutes');
const friendRequestRoutes = require('./routes/friendRequestRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', chatRoomRoutes);
app.use('/api', messageRoutes);
app.use('/api', profileRoutes);
app.use('/api', friendRequestRoutes);
app.use(errorHandler);
