import { genSalt, hash } from 'bcrypt';
import db from '../../../models/index';
import { where } from 'sequelize';
db.sequelize.sync();
const Usuario = db.Usuario;

export default async function handler(req, res) {
  console.log("-------------------------------------------------------------------------------------")
  console.log(Usuario)
  console.log("-------------------------------------------------------------------------------------")
  switch (req.method) {

    case 'GET':

      const users = await Usuario.findAll();
      res.status(200).json(users);
      break;

    case 'PUT':
      try {
        const params = req.query;
        const { nome, email, telefone, endereco, cidade, cep } = req.body;
        await Usuario.update(
          { nome, email, telefone, endereco, cidade, cep },
          { where: { id: params.id } }
        );
        res.status(200).json({ message: 'Atualização bem-sucedida' });
      } catch (e) {
        console.error('Erro ao editar usuario:', e);
        res.status(500).json({ message: 'Erro ao editar usuario' });
      }
      break;

    case 'DELETE':
      try {
        const params = req.query;
        await Usuario.destroy({ where: { id: params.id, id: params.id } })
      } catch (e) { console.log(e) }
      res.status(200).json({ name: 'erro J' });
      break;

  }
}