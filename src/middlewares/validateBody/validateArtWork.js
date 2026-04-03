const z = require("zod");

const artWorkSchema = z.object({
   name: z.string({
      invalid_type_error: 'Name must be a string',
      required_error: 'Name es required'
   }),
   image: z.string({
      invalid_type_error: 'Image must be a string',
      required_error: 'Image es required'
   }).url({
      message: 'Image must be a valid URL'
   }),
   description: z.string({
      invalid_type_error: 'Description must be a string',
      required_error: 'Description es required'
   })
})

const validateArtWork = (obj) => {
   return artWorkSchema.safeParse(obj)
}
module.exports = validateArtWork;