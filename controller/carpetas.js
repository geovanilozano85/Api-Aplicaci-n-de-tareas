import { Folder, Tasks } from "../relaciones/relacionesModelos.js";

export const getFolders = async (req, res) => {
  const { id } = req.params;
  const folders = await Folder.findAll({
    where: {
      id_user: id,
    },
    attributes: ["id", "name", "id_user"],
    include: [
      {
        model: Tasks,
        as: "tasks",
        attributes: [
          "id",
          "id_user",
          "id_folders",
          "title",
          "description",
          "status",
          "priority",
          "due_date",
        ],
      },
    ],
  });

  if (!folders)
    return res.status(404).json({ message: "Carpeta no encontrada" });
  res.json(folders);
};

export const saveFolder = async (req, res) => {
  const { id, name } = req.body;

  const folder = await Folder.create({ name, id_user: id });

  if (!folder)
    return res.status(404).json({ message: "Carpeta no encontrada" });

  res.status(201).json(folder);
};

export const updateFolder = async (req, res) => {
  const { id, name } = req.body;

  const folder = await Folder.update({ name }, { where: { id } });

  if (!folder)
    return res.status(404).json({ message: "Carpeta no encontrada" });

  res.json(folder);
};

export const deleteFolder = async (req, res) => {
  const { id } = req.params;

  const folder = await Folder.destroy({ where: { id } });
  const categories = await Categories.destroy({ where: { id_folder: id } });

  if (!folder)
    return res.status(404).json({ message: "Carpeta no encontrada" });

  if (!categories)
    return res.status(404).json({ message: "No se encontraron categorias" });

  res.json(folder);
};
