const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import routes
const newsRoutes = require('./routes/api');
const userRoutes = require('./controllers/userController');
const authRoutes = require('./controllers/authController');

// Initialize Express app
const app = express();

// Enable Cross Origin Resource Sharing
app.use(cors());

// Enable JSON use
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config')(passport);

// Use Routes
app.use('/api/news', newsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('public'));

  // Any route that gets hit - send the index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
}

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
