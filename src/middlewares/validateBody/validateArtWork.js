const z = require("zod");

const artWorkSchema = z
  .object({
    name: z.string({
      invalid_type_error: "Name must be a string",
      required_error: "Name es required",
    }),
    description: z.string({
      invalid_type_error: "Description must be a string",
      required_error: "Description es required",
    }),
    image: z
      .string({
        invalid_type_error: "Image must be a string",
      })
      .url({ message: "Image must be a valid URL" })
      .optional(),
    images: z.array(z.string().url({ message: "Cada imagen debe ser una URL válida" })).optional(),
  })
  .refine(
    (data) =>
      (Array.isArray(data.images) && data.images.length > 0) ||
      (typeof data.image === "string" && data.image.length > 0),
    {
      message: "Se requiere al menos una imagen: campo images (array de URLs) o image (una URL)",
      path: ["images"],
    }
  );

const validateArtWork = (obj) => {
   return artWorkSchema.safeParse(obj)
}
module.exports = validateArtWork;