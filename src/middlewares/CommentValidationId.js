const { ClientError } = require("../utils/errors");
const zodErrorMessage = require("../utils/zodErrorMessage");
const database = require("../schemas");
const validateObjectId = require("./validateId/validateId");

module.exports = async (req, res, next) => {
   const { id } = req.params;
   const result = validateObjectId(id);

   if (result.error) {
      return next(new ClientError(zodErrorMessage(result.error), 400));
   }

   const artWork = await database.ArtWork.findById(id);
   if (!artWork) return next(new ClientError("ID not found in the database", 404));

   return next();


};