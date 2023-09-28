import { genSalt, hash } from 'bcrypt';
import db from '../../../models/index';
import { where } from 'sequelize';
const Usuario = db.Usuario;

export default async function handler(req, res) {
  try {
    await db.sequelize.sync(); // Aguarde o banco de dados ser sincronizado antes de continuar


    switch (req.method) {
      case 'GET':
        const users = await Usuario.findAll();
        res.status(200).json(users);
        break;

      case 'POST':
        const user = req.body;
        const salt = await genSalt(10);
        const senha = await hash(user.senha, salt);

        const novoUsuario = await Usuario.create({
          nome: user.nome,
          email: user.email,
          senhaHash: senha,
          tipoUsuario: 'usuario'
        });
        const id = novoUsuario.id;
        res.status(200).json({ name: 'erro J' });
        break;
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Erro no servidor' });
  }
}
