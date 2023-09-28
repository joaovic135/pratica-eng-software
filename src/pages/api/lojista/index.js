import { genSalt, hash } from 'bcrypt';
import db from '../../../models/index';
const Lojista = db.Lojista;


export default async function handler(req, res) {
  try {
    
    await db.sequelize.sync();
    switch (req.method) {

      case 'GET':
        const params = req.query;
        const lojista = await Lojista.findOne({
          where: { id: params.id },
          include: {
            model: db.Produto,
          }

        });


        res.status(200).json(lojista);
        break;


      case 'POST':
        const user = req.body
        const salt = await genSalt(10);
        const senha = await hash(user.senha, salt);

        const novoLojista = await Lojista.create({
          nome: user.nome,
          email: user.email,
          senha: senha,
          numero: user.numero,
          descricao: user.descricao,
        });
        const id = novoLojista.id;
      res.status(200).json({ name: 'erro J' });
      break;

    case 'PUT':
      try {
        const params = req.query;
        await Lojista.update(req.body, { where: { id: params.id, idLojista: params.idLojista } })

      } catch (e) { console.log(e) }
      res.status(200).json({ name: 'erro J' });
      break;

    case 'DELETE':
      try {
        const params = req.query;
        await Lojista.destroy({ where: { id: params.id, idLojista: params.idLojista } })
      } catch (e) { console.log(e) }
      res.status(200).json({ name: 'erro J' });
      break;

        res.status(200).json({ name: 'erro J' });
        break;

    }
  } catch (e) {
    res.status(400).json({ name: 'erro J' });
    console.log(e)
  }
}