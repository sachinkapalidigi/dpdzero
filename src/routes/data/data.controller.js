const Record = require("../../models/records.model");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const {
  RECORD_RESPONSE: {
    STORE_SUCCESSFULL,
    RETRIEVE_SUCCESSFULL,
    UPDATE_SUCCESSFULL,
    DELETE_SUCCESSFULL,
    KEY_EXISTS,
    KEY_NOT_FOUND,
  },
} = require("../../constants/recordResponse");

const httpStoreData = catchAsync(async (req, res) => {
  const { key, value } = req.body;
  const user = req.user;

  const [record, created] = await Record.findOrCreate({
    where: { key, user_id: user.id },
    defaults: {
      key,
      value,
      user_id: user.id,
    },
  });

  if (!created) {
    const { status, code, message } = KEY_EXISTS;
    throw new AppError(status, code, message, 400);
  }

  return res.status(201).json({
    ...STORE_SUCCESSFULL,
  });
});

const httpRetrieveData = catchAsync(async (req, res) => {
  const key = req.params.id;
  const user = req.user;

  const record = await Record.findOne({
    where: {
      user_id: user.id,
      key: key,
    },
  });

  if (!record) {
    const { status, code, message } = KEY_NOT_FOUND;
    throw new AppError(status, code, message, 400);
  }

  return res.status(200).json({
    ...RETRIEVE_SUCCESSFULL,
    data: {
      key: record.key,
      value: record.value,
    },
  });
});

const httpUpdateData = catchAsync(async (req, res) => {
  const key = req.params.id;
  const user = req.user;
  const { value } = req.body;

  // provides [rowsAffected, [record]]
  const [_, rowsAffected] = await Record.update(
    {
      value,
    },
    {
      where: { key, user_id: user.id },
      returning: true, // NOTE: not for mysql
    }
  );
  if (rowsAffected === 0) {
    const { status, code, message } = KEY_NOT_FOUND;
    throw new AppError(status, code, message, 400);
  }

  return res.status(200).json({
    ...UPDATE_SUCCESSFULL,
  });
});

const httpDeleteData = catchAsync(async (req, res) => {
  const key = req.params.id;
  const user = req.user;

  const affectedRows = await Record.destroy({
    where: {
      key,
      user_id: user.id,
    },
  });
  if (affectedRows === 0) {
    const { status, code, message } = KEY_NOT_FOUND;
    throw new AppError(status, code, message, 400);
  }

  return res.status(200).json({
    ...DELETE_SUCCESSFULL,
  });
});

module.exports = {
  httpStoreData,
  httpRetrieveData,
  httpUpdateData,
  httpDeleteData,
};
