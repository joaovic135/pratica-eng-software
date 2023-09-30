import db from '../../../../models/index';
const Produto = db.Produto;


export default async function handler(req, res) {
  const params = req.query;
  await db.sequelize.sync();

  try {
    switch (req.method) {

      case 'GET':

        const produto = await Produto.findOne({ where: { id: params.id, idLojista: params.idLojista } })
        res.status(200).json(produto.dataValues);
        break;

      case 'POST':
        await Produto.update(req.body, { where: { id: params.id, idLojista: params.idLojista } })

        res.status(200).json({ name: 'erro J' });
        break;

      case 'DELETE':
        await Produto.destroy({ where: { id: params.id, idLojista: params.idLojista } })

        res.status(200).json({ name: 'erro J' });
        break;
    }
  } catch (e) { console.log(e) }
}