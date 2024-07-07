import db from "../db/connection.js";
import { DataTypes } from "sequelize";

const Folders = db.define("Folders", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Folders;
