import nodemailer from 'nodemailer';
import User from '../model/Usermodel.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from 'express-async-handler';


const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  try {
      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
          return res.status(400).json({ success: false, message: 'User already exists' });
      }

      // Create a new user instance
      const user = await User.create({ username, email, password });

      if (user) {
          // Generate token and send response
          generateToken(res, user._id);
          res.status(201).json({
              _id: user._id,
              username: user.username,
              email: user.email,
              success: true,
              message: "Welcome"
          });

          // Send email
          const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                  user: process.env.GMAIL,
                  pass: process.env.PASS
              }
          });

          const mailOptions = {
              from: 'dinemate29@gmail.com',
              to: user.email,
              subject: 'Registration Successful',
              html: `<p><b> Congratulation!..</b></p>
                     <p>You've successfully registered!</p>
                     <p>Please contact us for any queries; we're always happy to help.</p>
                     <p>Thanks & Regards,<br/> 
                     Dine Mate.</p>`
          };

          transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                  console.log(error);
              } else {
                  console.log('Message sent: ' + info.response);
              }
          });
      } else {
          return res.status(400).json({ success: false, message: 'Failed to create user' });
      }
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
});



const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    
    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: user.token,
        success: true,
        message: "Welcome to Dine Mate"
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


//logout start
const logoutUser = asyncHandler (async (req, res) =>{

  res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
  });

  res.status(200).json({ message:'User logged out'});
  });
  //logout end 



const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    // Check if the user exists
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user data
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save the updated user
    await user.save();
    
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  register,
  login,
  getAllUsers,
  deleteUser,
  updateUser,
  logoutUser 
};
