const { ClientError } = require("../utils/errors");
const validateArtWork = require("./validateBody/validateArtWork");

module.exports = (req, res, next) => {
   const result = validateArtWork(req.body);

   if (result.error) {
      const error = JSON.parse(result.error.message);
      throw new ClientError(error.map(e => e.message), 401);
   } else return next();


};
