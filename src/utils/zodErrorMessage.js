/**
 * @param {import("zod").ZodError | undefined} zodError
 * @returns {string}
 */
function zodErrorMessage(zodError) {
  if (!zodError || !Array.isArray(zodError.issues)) {
    return "Error de validación";
  }
  return zodError.issues.map((issue) => issue.message).join(". ");
}

module.exports = zodErrorMessage;
