exports.getProfile = async (req, res) => {
  const {userId} = req.params

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE userId = ?', [
      userId,
    ])
    if (rows.length === 0)
      return res.status(404).json({message: 'User not found'})

    res.json(rows[0])
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}
