const z = require("zod");

const commentSchema = z.object({
   user: z.string({
      invalid_type_error: 'User must be a string',
      required_error: 'User es required'
   }),
   title: z.string({
      invalid_type_error: 'Title must be a string',
      required_error: 'Title es required'
   }),
   body: z.string({
      invalid_type_error: 'Body must be a string',
      required_error: 'Body es required'
   })
})

const validateComment = (obj) => {
   return commentSchema.safeParse(obj)
}
module.exports = validateComment;