import { User } from "../relaciones/relacionesModelos.js";
import dotenv from "dotenv";
import nodemiler from "nodemailer";

dotenv.config();

const transporter = nodemiler.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ msg: "El usuario no existe" });
  }

  const mail = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Cambio de contraseña De tu lista de tareas TO-DO",
    html: `
    <h1>Cambio de contraseña</h1>
    <p>Para cambiar su contraseña de De tu lista de tareas TO-DO, por favor visite la siguiente URL:</p>
    <a href="http://localhost:5173/update-password/${user.id}/${user.email}/${user.names}">Cambiar contraseña de De tu lista de tareas TO-DO</a>
    <p>Si no solicitó este cambio de contraseña, puede ignorar este correo electrónico.</p>
    <p>Saludos cordiales,
    El equipo de soporte</p>`,
  };

  transporter.sendMail(mail, (error, info) => {
    if (error) {
      return res.status(500).json({ msg: "Error al enviar el correo" });
    }

    return res.status(200).json({ msg: "Correo enviado" });
  });
};
