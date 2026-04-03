const z = require("zod");
const { isValidObjectId } = require("mongoose");


const validateObjectId = (id) => {
   const idSchema = z.string().refine((value) => {
      return value && isValidObjectId(value);
   }, {
      message: "Invalid ID format",
   });

   return idSchema.safeParse(id);
};

module.exports = validateObjectId;


