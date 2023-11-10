import { genSalt, hash } from 'bcrypt';
import db from '../../../models/index';
const bcrypt = require('bcrypt');
const Lojista = db.Lojista;


export default async function handler(req, res) {
  const { id, senhaAtual } = req.body;

  try {
    // Encontre o lojista no banco de dados pelo ID
    const lojista = await Lojista.findOne({ where: { id:id } });

    // Se o lojista não foi encontrado, retorne um erro
    if (!lojista) {
      return res.status(404).json({ error: 'Lojista não encontrado.' });
    }

    // Verifique se a senhaAtual fornecida pelo cliente é válida
    const senhaValida = await bcrypt.compare(senhaAtual, lojista.senha); // 'senhaHash' é o hash da senha armazenado no banco de dados

    if (senhaValida) {
      res.status(200).json({ message: 'Senha atual válida.' });
    } else {
      res.status(401).json({ error: 'Senha atual incorreta.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

