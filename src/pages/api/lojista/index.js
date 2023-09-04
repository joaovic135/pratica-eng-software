import { genSalt, hash } from 'bcrypt';
import db from '../../../models/index';
db.sequelize.sync();
const Lojista = db.Lojista;


export default async function handler(req, res) {
  console.log("-------------------------------------------------------------------------------------")
  console.log(Lojista)
  console.log("-------------------------------------------------------------------------------------")
  switch (req.method) {
    
    case 'GET':
      res.status(200).json({ name: 'Lojista Ja' });
      break;

    case 'POST':
        const user = req.body
      try{
        const salt = await genSalt(10);
        const senha = await hash(user.senha, salt);

        const novoLojista = await Lojista.create({
            nome: user.nome,
            email: user.email,
            senha: senha,
            numero:user.numero,
            descricao:user.descricao,
          });
          const id = novoLojista.id;
        }catch(e){console.log(e)}
          res.status(200).json({ name: 'erro J' });
        break;

  }
}