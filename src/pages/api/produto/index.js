import db from '../../../models/index';
import { useSession } from 'next-auth/react';
const Produto = db.Produto;
const Lojista = db.Lojista;


export default async function handler(req, res) {
  
  try {
    await db.sequelize.sync();

    switch (req.method) {

      case 'GET':
        const params = req.query;

        const produto = await Produto.findOne({ where: { id: params.id} })
        
        if(produto == null){
          throw new Error('produto nao encontrado')
        }

        const lojista = await Lojista.findOne({ where: { id: produto.idLojista} });
        
        const responseData = {
          lojista: lojista,
          produto: produto,
        };
        
        
        res.status(200).json(responseData); 
        break;

      case 'POST':
        const user = req.body;

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

        break;

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o produto' });
  }

}