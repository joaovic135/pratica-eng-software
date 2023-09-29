import { genSalt, hash } from 'bcrypt';
import db from '../../../models/index';
import withCORS from '@/middleware/cors';
const Lojista = db.Lojista;


async function handler(req, res) {
  await db.sequelize.sync();


  try {
    switch (req.method) {

      case 'GET':
        const lojistas = await Lojista.findAll();
        res.status(200).json(lojistas);
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

    }
  } catch (e) { console.log(e) }
}

export default withCORS(handler);