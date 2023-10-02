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
        const params = req.query;
        const userId = params.id;
        try {
          const user = await Usuario.findOne({ where: { id: params.id } });
          if (user) {
            res.status(200).json(user.dataValues); // Se o usuário for encontrado, responde com o usuário em formato JSON
          } else {
            res.status(404).json({ error: 'Usuário não encontrado' }); // Se o usuário não for encontrado, responde com um erro 404
          }
        } catch (error) {
          res.status(500).json({ error: 'Erro ao buscar usuário' }); // Se houver um erro durante a busca, responde com um erro 500
        }
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