import { genSalt, hash } from 'bcrypt';
import db from '../../../models/index';
const Lojista = db.Lojista;

import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: 'http://example.com', // Replace with your allowed origin(s)
});


export default async function handler(req, res) {
  await db.sequelize.sync();
  await cors(req, res);

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