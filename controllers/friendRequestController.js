exports.sendFriendRequest = async (req, res) => {
  const {toUserId} = req.body
  const fromUserId = req.user.userId

  try {
    const [rows] = await db.query(
      'INSERT INTO friendRequests (fromUserId, toUserId) VALUES (?, ?)',
      [fromUserId, toUserId],
    )
    res.status(201).json({message: 'Friend request sent'})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}
