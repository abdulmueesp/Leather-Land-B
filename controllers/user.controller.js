const User = require('../models/user.model');

exports.signup = async (req, res) => {
  try {
    console.log("backend enter");
    
    const { username, email, password } = req.body;
    console.log(req.body, "muees");

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ 
        message: 'Username, email, and password are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Please provide a valid email address' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email already exists' 
      });
    }

    // Validate password strength (minimum 6 characters)
    if (password.length < 6) {
      return res.status(400).json({ 
        message: 'Password must be at least 6 characters long' 
      });
    }

    // Create user
    const user = new User({ username, email, password });
    await user.save();

    // Don't send password in response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({ 
      message: 'User created successfully', 
      data: userResponse 
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(400).json({ 
      message: 'Error creating user', 
      error: error.message 
    });
  }
};

// LOGIN API
exports.login = async (req, res) => {
  console.log("login enter");
  
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    // Don't send password in response
    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(200).json({ message: 'Login successful', data: userResponse });
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ message: 'Error logging in', error: error.message });
  }
}; 