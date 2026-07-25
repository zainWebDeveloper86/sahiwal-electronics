// create token and saving that in cookies
const sendToken = (user, statusCode, res, options = {}) => {
  const { cookieName = "token", rememberMe = false } = options;
  const expiresIn = rememberMe ? "7d" : "1d";
  const token = user.getJwtToken(expiresIn);

  const cookieExpiryDays = rememberMe ? 7 : 1;

  // Options for cookies
  const cookieOptions  = {
    expires: new Date(Date.now() + cookieExpiryDays * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // while at production
    // sameSite: "none",
    // secure: true,

    // while at development
    sameSite: "lax",
    secure: process.env.NODE_ENV === "PRODUCTION",
  };

  res.status(statusCode).cookie(cookieName, token, cookieOptions ).json({
    success: true,
    user,
    token,
  });
};

export default sendToken;
