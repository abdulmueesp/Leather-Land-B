const User = require('../models/user.model');

exports.signup = async (req, res) => {
  try {
     console.log("backen enter");
     
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: 'User created successfully', data: user });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
}; 