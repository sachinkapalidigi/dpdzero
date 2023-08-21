const { Op } = require("sequelize");

const User = require("../../models/users.model");
const catchAsync = require("../../utils/catchAsync");
const { REGISTER_RESPONSE } = require("../../constants/userResponse");
const { hashPassword } = require("../../utils/authUtil");
const AppError = require("../../utils/appError");

const httpCreateUser = catchAsync(async (req, res) => {
  const { email, password, username, full_name, age, gender } = req.body;
  // Check if user already exists
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ email }, { username }],
    },
  });

  if (existingUser) {
    let errorType;
    if (existingUser.email === email) {
      errorType = REGISTER_RESPONSE.EMAIL_EXISTS;
    } else {
      errorType = REGISTER_RESPONSE.USERNAME_EXISTS;
    }

    const { status, code, message } = errorType;
    throw new AppError(status, code, message, 400);
  }

  const hashedPassword = hashPassword(password);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    fullName: full_name,
    gender,
    age,
  });
  return res.status(201).json({
    ...REGISTER_RESPONSE.SUCCESS,
    data: {
      user_id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      full_name: newUser.fullName,
      age: newUser.age,
      gender: newUser.gender,
    },
  });
});

module.exports = {
  httpCreateUser,
};
