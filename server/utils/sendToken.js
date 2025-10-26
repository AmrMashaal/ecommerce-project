import { generateAccessToken, generateRefreshToken } from "./jwt.js";

export const sendToken = (res, user) => {
  const accessToken = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id, user.role);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict", 
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  console.log("Refresh token set in cookie:", refreshToken);

  res.status(200).json({
    accessToken,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      address: user.address,
    },
  });
};
