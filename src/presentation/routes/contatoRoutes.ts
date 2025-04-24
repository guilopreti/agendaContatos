import { Router } from "express";
import { ContatoController } from "@presentation/controllers/ContatoController";
import { validateDTO } from "@presentation/middlewares/validateDTO";
import { ContatoDTO } from "@presentation/dtos/ContatoDTO";

const router = Router();
const controller = new ContatoController();

router.post("/contatos", validateDTO(ContatoDTO), async (req, res) => {
  await controller.create(req, res);
});
router.get("/contatos/:name", async (req, res) => {
  await controller.getByUserName(req, res);
});

export default router;
