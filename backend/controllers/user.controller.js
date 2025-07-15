import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Register Controllers
export const register = async (req, res) => {
  try {

    if (!req.body) {
      return res.status(400).json({ 
        message: "Request body is required", 
        success: false 
      });
    }


    const { fullName, email, phoneNumber, password, role } = req.body;
    console.log(fullName, email, phoneNumber, password, role)

    // if (!fullName || !email || !phoneNumber || !role) {          -> original line hai ye

    if (!fullName || !email || !phoneNumber || !password|| !role) {       //->modified line hai ye
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with the email",
        success:false //ye line maine add kiya hai
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });
    return res.status(201).json({
      message: "Account creted successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};


// Login Controllers
export const login = async (req, res) => {

  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    // let user = await User.findOne({ email }); -> Original line ye hai
    let user = await User.findOne({ email });  //iss line mai maine const add kiya hai
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or pssword",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "inccorect email or password",
        success: false,
      });
    }
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }
    const tokenData = { 
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullName}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};


// Logout Controllers
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};


// Update Profile Controllers
export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;

    const file = req.file;
    //cloudinary ayega idhr

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    }

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    //resume comes later here...

    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; //save the cloudinary url
      user.profile.resumeOriginalName = file.originalname; //save the original file name
    }
    await user.save();
    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res.status(200).json({
      message: "profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};




































// import { User } from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// /* ----------------------------- Register ----------------------------- */
// export const register = async (req, res) => {
//   try {
//     if (!req.body) {
//       return res
//         .status(400)
//         .json({ message: "Request body is required", success: false });
//     }

//     const { fullName, email, phoneNumber, password, role } = req.body;

//     if (!fullName || !email || !phoneNumber || !password || !role) {
//       return res
//         .status(400)
//         .json({ message: "something is missing", success: false });
//     }

//     if (await User.findOne({ email })) {
//       return res
//         .status(400)
//         .json({ message: "User already exist with the email", success: false });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       fullName,
//       email,
//       phoneNumber,
//       password: hashedPassword,
//       role,
//     });

//     return res.status(201).json({ 
//         message: "Account created successfully.", 
//         success: true 
//       });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Internal Server Error", 
//       success: false 
//     });
//   }
// };

// /* ------------------------------ Login ------------------------------- */
// export const login = async (req, res) => {
//   try {
//     if (!req.body) {
//       return res
//         .status(400)
//         .json({ message: "Request body is required", success: false });
//     }

//     const { email, password, role } = req.body;

//     if (!email || !password || !role) {
//       return res
//         .status(400)
//         .json({ message: "something is missing", success: false });
//     }

//     let user = await User.findOne({ email });
//     if (
//       !user ||
//       !(await bcrypt.compare(password, user.password)) ||
//       role !== user.role
//     ) {
//       return res
//         .status(400)
//         .json({ message: "Invalid credentials", success: false });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
//       expiresIn: "1d",
//     });

//     user = {
//       _id: user._id,
//       fullName: user.fullName,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       role: user.role,
//       profile: user.profile,
//     };

//     return res
//       .status(200)
//       .cookie("token", token, {
//         maxAge: 24 * 60 * 60 * 1000,
//         httpOnly: true,
//         sameSite: "strict",
//       })
//       .json({ message: `Welcome back ${user.fullName}`, user, success: true });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ message: "Internal Server Error", success: false });
//   }
// };

// /* ------------------------------ Logout ------------------------------ */
// export const logout = async (_req, res) => {
//   try {
//     return res
//       .status(200)
//       .cookie("token", "", { maxAge: 0 })
//       .json({ message: "logged out successfully", success: true });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ message: "Internal Server Error", success: false });
//   }
// };

// /* --------------------------- Update Profile ------------------------- */
// export const updateProfile = async (req, res) => {
//   try {
//     if (!req.body) {
//       return res
//         .status(400)
//         .json({ message: "Request body is required", success: false });
//     }

//     const { fullName, email, phoneNumber, bio, skills } = req.body;
//     const user = await User.findById(req.id);

//     if (!user) {
//       return res
//         .status(400)
//         .json({ message: "user not found", success: false });
//     }

//     if (fullName) user.fullName = fullName;
//     if (email) user.email = email;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     if (bio) user.profile.bio = bio;
//     if (skills) user.profile.skills = skills.split(",");

//     await user.save();

//     return res
//       .status(200)
//       .json({ message: "profile updated successfully", user, success: true });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ message: "Internal Server Error", success: false });
//   }
// };
