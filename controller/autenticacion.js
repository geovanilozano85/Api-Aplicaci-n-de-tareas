import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/usuario.js";
import dotenv from "dotenv";

import { differenceInMinutes } from "date-fns";

dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ msg: "No se encontro el usuario" });
    }

    const isValid = await bcrypt.compare(password, user.dataValues.password);

    const currentTime = new Date();
    const blockedTime = new Date(user.last_failed_login);
    const minuteDifference = differenceInMinutes(currentTime, blockedTime);

    if (user.blocked) {
      if (minuteDifference >= 3) {
        await User.update(
          { blocked: false, failed_login: 0 },
          { where: { email } }
        );
        throw new Error("Usuario bloqueado");
      } else {
        res.status(401).json({
          msg: `El usuario ha sido bloqueado por ${minuteDifference / 2} horas`,
        });
      }
      return true;
    }

    if (!isValid) {
      let failed_login = user.failed_login || 0;
      failed_login++;

      const currentDate = new Date().toISOString();
      if (failed_login >= 3) {
        await User.update(
          { blocked: true, last_failed_login: currentDate },
          { where: { email } }
        );

        res.status(404).json({
          msg: `El usuario ha sido bloqueado por demasiados intentos fallidos.`,
        });
        return;
      } else {
        await User.update(
          { failed_login, last_failed_login: currentDate },
          { where: { email } }
        );
        res.status(404).json({ msg: `El usuario/contraseña no es válido` });
        return;
      }
    }

    const payload = { id: user.dataValues.id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      user,
      token,
    });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};
