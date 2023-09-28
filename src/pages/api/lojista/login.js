import { genSalt, hash } from 'bcrypt';
console.log("AAAAAAAAAAAAAAAAAAAAAAAA")
import db from '../../../models/index';
db.sequelize.sync();
const Lojista = db.Lojista;


export async function handler(req, res) {
  switch (req.method) {
    
    case 'GET':
      res.status(200).json({ name: 'Lojista Ja' });
      break;

    case 'POST':
      const user = req.body
      console.log("BBBBBBBBBBBBBBBBBBBBBBBB")

      try{
        console.log("AAAAAAAAAAAAAAAAAAAAAAAA")
        const emailInserido = user.email;
        const senhaInserida = user.senha;


        const lojista = await Lojista.findOne({
          where: {  email: emailInserido  }
        });

        if(!lojista){
          throw new Error('Lojista não encontrado')
        } 

        if(!(await lojista.isTheUserPassword(senhaInserida))){
          throw new Error('Senha incorreta')
        }
        return res.json({lojista});
      }catch(e){
        console.log(e)
        return res.status(401).json({error: e.message})
      }
      break;

  }
}