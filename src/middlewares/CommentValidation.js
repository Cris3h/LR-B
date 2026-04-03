const { ClientError } = require("../utils/errors/index");
const validateComment = require("./validateBody/validateComment");
const validateObjectId = require("./validateId/validateId");


module.exports = (req, res, next) => {
   const result = validateComment(req.body);
   const validateId = validateObjectId(req.params.id);

   if (result.error) {
      const error = JSON.parse(result.error.message);
      throw new ClientError(error.map(e => e.message), 401);
   } else if (validateId.error) {
      const error = JSON.parse(validateId.error.message);
      throw new ClientError(error.map(e => e.message), 401);
   }
   return next();

};