import db from "../db/connection.js";
import { DataTypes } from "sequelize";

const Task = db.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_folders: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pendiente",
      allowNull: false,
      validate: {
        isIn: {
          args: [["pendiente", "en progreso", "hecho"]],
          msg: "La tarea debe ser pendiente, en progreso o hecho",
        },
      },
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: {
          args: [["low", "medio", "alto", "urgente"]],
          msg: "La prioridad debe ser bajo, medio, alto o urgente",
        },
      },
    },
    due_date: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "task",
  }
);

export default Task;
