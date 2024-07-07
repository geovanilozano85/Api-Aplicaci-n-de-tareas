import User from "../models/usuario.js";
import Folder from "../models/carpetas.js";
import Tasks from "../models/tareas.js";

Folder.belongsTo(User, { foreignKey: "id_user", as: "user" });
Folder.hasMany(Tasks, { foreignKey: "id_folders", as: "tasks" });

Tasks.belongsTo(User, { foreignKey: "id_user" });
Tasks.belongsTo(Folder, { foreignKey: "id_folders", as: "folders" });

export { User, Folder, Tasks };
