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
        const emailInserido = user.email;
        const senhaInserida = user.senha;

        console.log(emailInserido)

        console.log(senhaInserida)
        const lojista = await Lojista.findOne({
          where: {  email: emailInserido  }
        });

        console.log("teste")
        console.log(lojista)
        if(!lojista){
          throw new Error('Lojista não encontrado')
        } 

        if(!(await lojista.isTheUserPassword(senhaInserida))){
          throw new Error('Senha incorreta')
        }
        return res.json({lojista});
      }catch(e){
        return res.status(401).json({error: e.message})
      }
      break;

  }
}