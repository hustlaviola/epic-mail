class ErrorHandler {
  static validationError(res, code, message) {
    return res.status(code).send({
      status: res.statusCode,
      error: message,
    });
  }

  static routeError(res) {
    return res.status(404).send({
      status: res.statusCode,
      error: 'The requested url was not found on this server',
    });
  }
}

export default ErrorHandler;
