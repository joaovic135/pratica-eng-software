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
      try{
        const params = req.query;
        console.log(req)
        const lojista = await Lojista.findOne({ 
          where: { id: params.id },
          include: {
            model: db.Produto,
          }
          
        });
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        console.log(params)
        
        console.log(lojista)
        
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        res.status(200).json(lojista);
        break;
      }catch(e){console.log(e)}


    case 'POST':
      const user = req.body
      try {
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
      } catch (e) { console.log(e) }
      res.status(200).json({ name: 'erro J' });
      break;

  }
}