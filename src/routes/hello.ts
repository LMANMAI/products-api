// hello.ts
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Ruta de verificacion de funcionamiento, metodo GET funcionando");
});

export default router;
