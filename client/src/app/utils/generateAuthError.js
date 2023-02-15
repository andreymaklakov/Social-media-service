function generateAuthError(message) {
  if (message === "EMAIL_NOT_FOUND" || message === "INVALID_PASSWORD") {
    return "Email or password is incorrect";
  }
  if (message.includes("TOO_MANY_ATTEMPTS_TRY_LATER")) {
    return "Too many enter attempts try later";
  }

  if (message === "EMAIL_EXISTS") {
    const errorObject = { email: "User with this email already exists" };
    return errorObject;
  }
  if (message === "INVALID_EMAIL") {
    const errorObject = { email: "This is not Email" };
    return errorObject;
  }
}

export default generateAuthError;
