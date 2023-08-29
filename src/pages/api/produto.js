import db from '../../models/index';
db.sequelize.sync();
const Produto = db.Produto;


export default function handler(req, res) {

  switch (req.method) {

    case 'GET':
      res.status(200).json({ name: 'Produto' });
      break;

    case 'POST':
      res.status(200).json({ name: 'Produto' });
      break;

  }
}