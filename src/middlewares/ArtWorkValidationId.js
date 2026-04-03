const { ClientError } = require("../utils/errors");
const database = require("../schemas");
const validateObjectId = require("./validateId/validateId");

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const result = validateObjectId(id);

  if (result.error) {
    const error = JSON.parse(result.error.message);
    return next(new ClientError(error.map((e) => e.message), 400));
  }

  const artWork = await database.ArtWork.findById(id);
  if (!artWork) return next(new ClientError("ID not found in the database", 404));

  return next();
};

