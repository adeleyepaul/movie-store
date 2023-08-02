const User = require("../model/userTable")
const jwt = require("jsonwebtoken")
const { authMiddleware, SECRET_KEY } = require("../controller/authMiddleware")

// Signup function
const signUp = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already registered' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({ email, password: hashedPassword });
      await user.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Signin function
const signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id }, SECRET_KEY);
  
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

const auth = (req, res) => {
  const user = req.user;
  res.json({ message: 'Protected route accessed successfully', user });
};


module.exports = {
    signUp,
    signIn,
    auth
}