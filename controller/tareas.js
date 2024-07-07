import { Tasks } from "../relaciones/relacionesModelos.js";

export const getTasks = async (req, res) => {
  const { id } = req.params;
  const tasks = await Tasks.findAll({
    where: {
      id_user: id,
    },
    attributes: [
      "id",
      "title",
      "description",
      "status",
      "priority",
      "due_date",
      "id_folders",
    ],
  });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const {
    id_user,
    id_folders,
    title,
    description,
    status,
    priority,
    due_date,
  } = req.body;
  const task = await Tasks.create({
    id_user,
    id_folders,
    title,
    description,
    status,
    priority,
    due_date,
  });
  res.json(task);
};

export const updateTask = async (req, res) => {
  const {
    id,
    id_folders,
    title,
    description,
    status,
    priority,
    due_date,
    id_user,
  } = req.body;
  const task = await Tasks.update(
    {
      id_folders,
      title,
      description,
      status,
      priority,
      due_date,
      id_user,
    },
    { where: { id } }
  );
  res.json(task);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Tasks.destroy({ where: { id } });

  if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

  res.json(`Se elimino la tarea con el id ${task}`);
};
