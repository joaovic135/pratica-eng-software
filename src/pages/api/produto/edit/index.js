import db from '../../../../models/index';
db.sequelize.sync();
const Produto = db.Produto;


export default async function handler(req, res) {
  const params = req.query;

  switch (req.method) {

    case 'GET':
      console.log (params)

      const produto = await Produto.findOne({where: {id: params.id, idLojista: params.idLojista}})
      console.log(produto)
      res.status(200).json(produto.dataValues);
      break;

    case 'POST':
      try{
        await Produto.update(req.body,{where:{ id: params.id, idLojista: params.idLojista }})

      }catch(e){console.log(e)}
      res.status(200).json({ name: 'erro J' });
      break;
    
    case 'DELETE':
      try{
        await Produto.destroy({where:{ id: params.id, idLojista: params.idLojista }})

      }catch(e){console.log(e)}
      res.status(200).json({ name: 'erro J' });
      break;
  }
}