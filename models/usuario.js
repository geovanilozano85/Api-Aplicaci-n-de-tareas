import db from "../db/connection.js";
import { DataTypes } from "sequelize";

const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    names: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirm_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    failed_login: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    last_failed_login: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  },
  {
    tableName: "user",
  }
);

export default User;
