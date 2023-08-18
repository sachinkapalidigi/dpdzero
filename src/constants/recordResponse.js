const RECORD_RESPONSE = {
  STORE_SUCCESSFULL: {
    status: "success",
    message: "Data stored successfully.",
  },
  RETRIEVE_SUCCESSFULL: {
    status: "success",
  },
  UPDATE_SUCCESSFULL: {
    status: "success",
    message: "Data updated successfully.",
  },
  DELETE_SUCCESSFULL: {
    status: "success",
    message: "Data deleted successfully.",
  },
  INVALID_KEY: {
    status: "error",
    code: "INVALID_KEY",
    message: "The provided key is not valid or missing.",
  },
  INVALID_VALUE: {
    status: "error",
    code: "INVALID_VALUE",
    message: "The provided value is not valid or missing.",
  },
  KEY_EXISTS: {
    status: "error",
    code: "KEY_EXISTS",
    message:
      " The provided key already exists in the database. To update an existing key, use ",
  },
  KEY_NOT_FOUND: {
    status: "error",
    code: "KEY_NOT_FOUND",
    message: "The provided key does not exist in the database.",
  },
};

module.exports = {
  RECORD_RESPONSE,
};
