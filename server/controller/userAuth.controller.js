import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Register a New User
const createNewUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, phone, password, image, role } = req.body;

    // 🔍 Check if email already exists
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(400).json({
        status: 400,
        message: "Validation Error",
        details: ["Email is already registered"],
      });
    }

    // 🔍 Check if phone number already exists
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({
        status: 400,
        message: "Validation Error",
        details: ["Phone number already in use"],
      });
    }

    // ☁️ Upload image if file provided (Cloudinary optional)
    const imageUrl = req.file ? await uploadOnCloudinary(req.file.path) : null;

    // 👤 Create new user instance
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      phone,
      image: imageUrl?.url || image || "https://media-hosting.imagekit.io//4bc72ff0889f4681/demo.png?Expires=1837020820&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=c3Nq6Mu7wtR7-l57wCuFJDWqnmAYe1mnhTV60rRh~Jbr8iEoriWR0qAXj7ZZTfT4XwDeVixlpLg0spaVCXXnT0PkgZgvPx8uAqEOl2brHCHXKkKbKmE3Szgkh6l~dfwmJhUcL1pLE0v23fLt6xcVnwglPQ~tZ1fmD02KYcjDD1cX8lTGmF2wSHJv0OVScK2Aw4mHuUSvWbBrDsRt7PpFfWskmXiWUG~QuWDgbcHuSrS2r2ffQ98PdMT96uhXeNRwZsmFs8BSzj15gVYC05hBdkk~7uKhWuA6rl5eSh61hqCLvkjElDrHe7wLa7tfJwUVYRcYicu6LTU0UIeNckAViw__https://media-hosting.imagekit.io//4bc72ff0889f4681/demo.png",
      role: role || "user",
    });

    // 🔐 Register using passport-local-mongoose
    const registeredUser = await User.register(newUser, password);
    if (!registeredUser) {
      return res.status(400).json(
        new ApiError(400, ["User registration failed"], "Validation Error")
      );
    }

    console.log("✅ User registered successfully!");

    // 🔑 Auto login after registration
    req.login(registeredUser, { session: true }, (err) => {
      if (err) {
        return res.status(500).json(
          new ApiError(500, err, "Auto-login after registration failed!")
        );
      }

      console.log("🔐 Auto-login successful!");

      return res.status(201).json(
        new ApiResponse(
          201,
          { user: registeredUser },
          "User registered and logged in successfully!"
        )
      );
    });

  } catch (error) {
    console.error("❌ Error during user registration:", error);
    return res.status(500).json(
      new ApiError(500, error, "Failed to register user!")
    );
  }
});

export { createNewUser };
