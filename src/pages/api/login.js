
import db from '../../models/index';
db.sequelize.sync();
const Usuario = db.Usuario;


export default async function handler(req, res) {
  console.log("-------------------------------------------------------------------------------------")
  console.log(Usuario)
  console.log("-------------------------------------------------------------------------------------")
  switch (req.method) {
    
    case 'GET':
      res.status(200).json({ name: 'Usuario Ja' });
      break;

    case 'POST':
      try{
        const emailInserido = req.body.email;
        const senhaInserida = req.body.senha;

        console.log(emailInserido)
        const usuario = await Usuario.findOne({
          where: {  email: emailInserido  }
        });

        console.log("teste")
        if(!usuario){
          throw new Error('Usuario não encontrado')
        } 

        if(!(await usuario.isTheUserPassword(senhaInserida))){
          throw new Error('Senha incorreta')
        }
        return res.json({usuario});
      }catch(e){
        return res.status(401).json({error: e.message})
      }
      break;

  }
}