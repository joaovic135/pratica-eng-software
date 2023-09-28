import db from '../../../../models/index';
const Produto = db.Produto;


export default async function handler(req, res) {
  try {
    await db.sequelize.sync();
    switch (req.method) {

      case 'GET':
        const params = req.query;
        console.log(params)

        const produto = await Produto.findAll()
        //   console.log(produto)
        res.status(200).json(produto);
        break;

      case 'POST':
        res.status(200).json({ name: 'Produto' });
        break;

    }
  } catch (e) {
    console.log(e)
  }

}