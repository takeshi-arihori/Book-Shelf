function requestErrorHandler(controller) {
  return async function (req, res, next) {
    try {
      await controller(req, res);
    } catch (err) {
      next(err);
    }
  }
}

export {requestErrorHandler};