const { ClientError } = require("../utils/errors/index");
const zodErrorMessage = require("../utils/zodErrorMessage");
const validateComment = require("./validateBody/validateComment");
const validateObjectId = require("./validateId/validateId");

module.exports = (req, res, next) => {
   const result = validateComment(req.body);
   const validateId = validateObjectId(req.params.id);

   if (result.error) {
      throw new ClientError(zodErrorMessage(result.error), 400);
   }
   if (validateId.error) {
      throw new ClientError(zodErrorMessage(validateId.error), 400);
   }
   return next();

};