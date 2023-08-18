const User = require("../../models/users.model");
const AppError = require("../../utils/appError");
const {
  LOGIN_RESPONSE: { INVALID_CREDENTIALS, SUCCESS },
} = require("../../constants/userResponse");
const catchAsync = require("../../utils/catchAsync");
const { verifyPassword, getTokenWithExpiry } = require("../../utils/authUtil");

const httpGetToken = catchAsync(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  if (!user || !verifyPassword(password, user.password)) {
    const { status, code, message } = INVALID_CREDENTIALS;
    throw new AppError(status, code, message, 400);
  }
  const { token, expiresIn } = getTokenWithExpiry({ id: user.id });
  return res.status(200).json({
    ...SUCCESS,
    data: {
      access_token: token,
      expires_in: expiresIn,
    },
  });
});

module.exports = {
  httpGetToken,
};
