import { genSalt, hash } from 'bcrypt';
import db from '../../../../models/index';
import { where } from 'sequelize';
db.sequelize.sync();
const Lojista = db.Lojista;

export default async function handler(req, res) {
  //console.log("-------------------------------------------------------------------------------------")
  //console.log(Lojista)
  //console.log("-------------------------------------------------------------------------------------")
  switch (req.method) {

    case 'GET':
        const params = req.query;
        try {
          const lojista = await Lojista.findOne({ where: { id: params.id } });
          if (lojista) {
            res.status(200).json(lojista.dataValues); // Se o usuário for encontrado, responde com o usuário em formato JSON
          } else {
            res.status(404).json({ error: 'Usuário não encontrado' }); // Se o usuário não for encontrado, responde com um erro 404
          }
        } catch (error) {
          res.status(500).json({ error: 'Erro ao buscar usuário' }); // Se houver um erro durante a busca, responde com um erro 500
        }
        break;
  }
}