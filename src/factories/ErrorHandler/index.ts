export const ErrorHandler = (error: any, defaultMessage: string = "Something went wrong, try again please."): string => {
  let message: string;
  if (error.response) {
    if (error.response.status === 403)
      message = "You do not have the required permission";
    else if (error.response.status >= 500 && error.response.status < 600) {
      message = defaultMessage;
    } else {
      message =
        error.response.data.message ||
        error.response.data.Message ||
        defaultMessage;
    }
  } else if (error.request) {
    message = error.message;
  } else {
    message = error.message;
  }
  return message;
};
