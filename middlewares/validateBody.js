const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    
    if (
      Object.keys(req.body).length === 0 &&
      req.route.path === "/update"
    ) {
      throw HttpError(400, "missing fields updating user");
    }

    if (
      Object.keys(req.body).length === 0 &&
      req.route.path === "/food-intake/:id"
    ) {
      throw HttpError(400, "missing fields updating food");
    }

    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, error.message));
    }

    next();
  };

  return func;
};

module.exports = validateBody;
