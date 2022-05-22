customError = (status, code, message) => {
  const error = new Error(message);
  error.code = code;
  error.status = status;
  return error;
};

const authError = customError(
  401,
  "AUTH_ERROR",
  "invalid username or password"
);
const authorizationError = customError(
  403,
  "AUTHORIZATION_ERROR",
  "you are not authorized on this action"
);

module.exports = { customError, authError, authorizationError };
