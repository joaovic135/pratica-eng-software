import db from '../../../models/index';
import { useSession } from 'next-auth/react';
db.sequelize.sync();
const Produto = db.Produto;


export default async function handler(req, res) {

  switch (req.method) {

    case 'GET':
      const params = req.query;
      console.log (params)

      const produto = await Produto.findOne({where: {id: params.id, idLojista: params.idLojista}})
      console.log(produto)
      res.status(200).json(produto.dataValues);
      break;

      case 'POST':
        const user = req.body;
        try {
  
          const novoProduto = await Produto.create({
            idLojista: user.idLojista,
            nome: user.nome,
            descricao: user.descricao,
            preco: user.preco,
            categoria: user.categoria,
            estoque: user.estoque,
          });
  
          const id = novoProduto.id;
          res.status(200).json({ id: id, name: 'Produto' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erro ao criar o produto' });
        }
        break;
  

  }
}