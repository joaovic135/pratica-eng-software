import db from '../../../../models/index';
db.sequelize.sync();
const Produto = db.Produto;


export default async function handler(req, res) {

  switch (req.method) {

    case 'GET':
      const params = req.query;
      console.log (params)

      const produto = await Produto.findAll({
        where: {
        idLojista: params.id
      }})
    //   console.log(produto)
      res.status(200).json(produto);
      break;

    case 'POST':
      res.status(200).json({ name: 'Produto' });
      break;

  }
}