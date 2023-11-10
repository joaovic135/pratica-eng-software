import { genSalt, hash } from 'bcrypt';
import db from '../../../models/index';
const bcrypt = require('bcrypt');
const Lojista = db.Lojista;


export default async function handler(req, res) {
const { id, novaSenha } = req.body;

try {
    const senhaHash = await bcrypt.hash(novaSenha, 10);

    const lojista = await Lojista.findOne({ where: { id: id } }); 

    if (!lojista) {
      return res.status(404).json({ error: 'Lojista não encontrado.' });
    }

  
    lojista.senha = senhaHash; // Supondo que 'senhaHash' seja o campo onde você armazena o hash da senha
    await lojista.save(); // Ou o método equivalente na sua biblioteca de banco de dados para salvar as mudanças

    res.status(200).json({ message: 'Senha alterada com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}




