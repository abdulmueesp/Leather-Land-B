// server.js
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
// Middleware
app.use(express.json()); 

// Routes
app.get('/', (req, res) => {
  res.send('Hello, Express Backend!');
});
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


// Connect to MongoDB
connectDB();


app.use('/api/user', userRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
