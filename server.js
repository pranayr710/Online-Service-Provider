const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User model
const User = mongoose.model('User', new mongoose.Schema({
  email: String,
  password: String
}));

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Contact from ${name}`,
      text: message
    });

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: 'User registered' });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.status(200).json({ token });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
