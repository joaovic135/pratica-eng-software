import { genSalt, hash } from 'bcrypt';
import db from '../../models/index';
const Usuario = db.Usuario;

export default async function handler(req, res) {
  console.log("-------------------------------------------------------------------------------------")
  console.log(Usuario)
  console.log("-------------------------------------------------------------------------------------")
  try {
    
    await db.sequelize.sync();
    switch (req.method) {
      
      case 'GET':
        res.status(200).json({ name: 'Usuario Ja' });
        break;

      case 'POST':
        const user = req.body
        console.log("teste")
        const salt = await genSalt(10);
        const senha = await hash(user.senha, salt);


        const novoUsuario = await Usuario.create({
          nome: user.nome,
          email: user.email,
          senhaHash: senha,
          tipoUsuario: 'usuario',
          telefone: user.telefone,
          endereco: user.endereco,
          cidade: user.cidade,
          cep: user.cep
        });
        const id = novoUsuario.id;

        res.status(200).json({ name: 'erro J' });
        break;

    }

  } catch (e) {
    console.log(e)
  }

}