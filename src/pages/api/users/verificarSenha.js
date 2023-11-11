import { genSalt, hash } from 'bcrypt';
import db from '../../../models/index';
const bcrypt = require('bcrypt');
const Usuario = db.Usuario;


export default async function handler(req, res) {
  const { id, senhaAtual } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { id:id } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario não encontrado.' });
    }

    // Verifique se a senhaAtual fornecida pelo cliente é válida
    const senhaValida = await bcrypt.compare(senhaAtual, usuario.senhaHash); // 'senhaHash' é o hash da senha armazenado no banco de dados

    if (senhaValida) {
      res.status(200).json({ message: 'Senha atual válida.' });
    } else {
      res.status(401).json({ error: 'Senha atual incorreta.' });
    }
  } catch (error) {
    console.error("asddasdasd",error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
