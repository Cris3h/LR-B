const z = require("zod");

const trim = (v) => (typeof v === "string" ? v.trim() : v);

const commentSchema = z.object({
   user: z.preprocess(trim, z.string().min(1, "User es required")),
   title: z.preprocess(trim, z.string().min(1, "Title es required").max(200)),
   body: z.preprocess(trim, z.string().min(1, "Body es required").max(8000)),
   picture: z.preprocess(
      (v) => (v === "" || v == null ? undefined : trim(v)),
      z.string().url().optional()
   ),
})

const validateComment = (obj) => {
   return commentSchema.safeParse(obj)
}
module.exports = validateComment;