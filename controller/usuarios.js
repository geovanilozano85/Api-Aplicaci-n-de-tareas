import { Folder, Tasks, User } from "../relaciones/relacionesModelos.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return res.status(404).json({
      msg: `el usuario con el id: ${id} no existe`,
    });
  }

  res.status(200).json({
    id: user.id,
    names: user.names,
    email: user.email,
  });
};

export const saveUser = async (req, res) => {
  const { names, email, password } = req.body;

  const validate = await User.findOne({ where: { email } });

  if (validate) {
    return res.status(400).json({ msg: "El Usuario ya existe" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    names,
    email,
    password: hashedPassword,
    confirm_password: password,
  });

  const folder = await Folder.create({
    name: "General",
    id_user: user.id,
  });

  const fechaHoy = new Date();
  const fechaCorta = fechaHoy.toISOString().split("T")[0];

  const task = await Tasks.create({
    title: "Tu primera tarea",
    description: "Descubre como funciona esta aplicacion",
    status: "pendiente",
    priority: "medio",
    due_date: fechaCorta,
    id_user: user.id,
    id_folders: folder.id,
  });

  res.json({ msg: `el usuario  ${user.names} ha sido creado correctamente` });
};

export const updateUser = async (req, res) => {
  const { id, names, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.update(
    { names, email, password: hashedPassword, confirm_password: password },
    { where: { id } }
  );
  const userFront = await User.findOne({ where: { id } });

  res.status(200).json({
    msg: `el usuario con el id: ${id} ha sido actualizado correctamente`,
    user: {
      id: userFront.id,
      names: userFront.names,
      email: userFront.email,
    },
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.destroy({ where: { id } });

  if (!user) {
    return res.status(404).json({
      msg: `el usuario con el id: ${id} no existe`,
    });
  }

  res.status(200).json({
    msg: `el usuario con el id: ${id} ha sido eliminado correctamente`,
    user,
  });
};
