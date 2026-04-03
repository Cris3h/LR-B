const { createArtWork } = require("../../services");
const { response } = require("../../utils");

const create = async (req, res) => {
   const obj = req.body
   const artWork = await createArtWork(obj)
   response(res, 200, artWork);
};

module.exports = create;