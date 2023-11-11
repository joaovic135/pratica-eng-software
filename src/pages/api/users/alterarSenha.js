import { genSalt, hash } from 'bcrypt';
import db from '../../../models/index';
const bcrypt = require('bcrypt');
const Usuario = db.Usuario;


export default async function handler(req, res) {
const { id, novaSenha } = req.body;

try {
    const NovaSenhaHash = await bcrypt.hash(novaSenha, 10);

    const usuario = await Usuario.findOne({ where: { id: id } }); 

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario não encontrado.' });
    }

  
    usuario.senhaHash = NovaSenhaHash; // Supondo que 'senhaHash' seja o campo onde você armazena o hash da senha
    await usuario.save(); // Ou o método equivalente na sua biblioteca de banco de dados para salvar as mudanças

    res.status(200).json({ message: 'Senha alterada com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}
