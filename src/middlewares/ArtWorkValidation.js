const { ClientError } = require("../utils/errors");
const zodErrorMessage = require("../utils/zodErrorMessage");
const validateArtWork = require("./validateBody/validateArtWork");

module.exports = (req, res, next) => {
   const result = validateArtWork(req.body);

   if (result.error) {
      throw new ClientError(zodErrorMessage(result.error), 400);
   }
   return next();

};
