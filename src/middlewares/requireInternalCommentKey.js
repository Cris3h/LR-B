/**
 * Solo permite crear comentarios si la petición trae la clave compartida
 * que usa el proxy de Next.js (COMMENT_INTERNAL_SECRET). Así se evita
 * POST anónimo directo al Express público.
 */
module.exports = (req, res, next) => {
  const expected = process.env.COMMENT_INTERNAL_SECRET;
  if (!expected) {
    console.error("COMMENT_INTERNAL_SECRET no está definido en el servidor Express");
    return res.status(503).json({
      error: true,
      message: "Comment API not configured",
    });
  }

  const provided = req.headers["x-internal-comment-key"];
  if (provided !== expected) {
    return res.status(403).json({
      error: true,
      message: "No autorizado",
    });
  }

  return next();
};
