import express from "express";
import dotenv from "dotenv";
import { Database } from "@infrastructure/config/Database";

dotenv.config();

async function startApp() {
  await Database.init();
  console.log("Banco de Dados inicializado com sucesso!");

  const app = express();
  const PORT = process.env.PORT;

  app.use(express.json());

  const userRouter = await import("@presentation/routes/userRoutes");
  app.use("/api", userRouter.default);

  const contatoRoutes = await import("@presentation/routes/contatoRoutes");
  app.use("/api", contatoRoutes.default);

  app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
  });
}

startApp();

// const app = express();
// const PORT = process.env.PORT;

// app.use(express.json());
// app.use('/api', userRouter);

// app.listen(PORT, () => {
//     console.log(`Application is running on port ${PORT}`);
// });
