const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });
  };
  console.log(process.env.JWT_SECRET)
  
// Register a new user
exports.register = async (req,res) => {
   try {
     const {username,email,password} = req.body;
     
     //Check if user already exists
     const userExists = await User.findOne({
        $or : [{email},{username}]
     })

     if(userExists){
        return res.status(400).json({
            success:false,
              message: 'User with this email or username already exists'
        });
     }

     //Create new user
     const user = await User.create({
        username,
        email,
        password
     });
  
       // Generate token
       const token = generateToken(user._id);

       res.status(201).json({
        success:true,
        token,
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
       });
   } catch (error) {
      res.status(500).json({
        success:false,
        message: error.message,
      });
   }
};

// Login User
exports.login = async (req,res) => {
    try {
        const {email,password} = req.body;

        // Check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate token
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

