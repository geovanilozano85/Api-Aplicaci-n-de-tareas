import express from "express";
import cors from "cors";
import routesAuth from "./router/autenticacion.js";
import routesUser from "./router/usuarios.js";
import routesFolders from "./router/carpetas.js";

import routesTask from "./router/tareas.js";
import routesReloadPassword from "./router/cambiar_password.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json("API To - Do");
});

app.use("/users", routesUser);
app.use("/auth", routesAuth);
app.use("/folders", routesFolders);
app.use("/tasks", routesTask);
app.use("/reload-password", routesReloadPassword);

app.get("*", (_req, res) => {
  res.status(404).json({ message: "No se encontro" });
});

app.listen(3100, () => {
  console.log("Servidor en el puerto http://localhost:3100");
});
