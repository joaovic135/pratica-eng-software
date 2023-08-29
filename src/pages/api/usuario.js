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
      const user = req.body
      try{
        console.log("teste")
        const novoUsuario = await Usuario.create({
          nome: user.nome,
          email: user.email,
          senhaHash: user.senha,
        });
        const id = novoUsuario.id;
      }catch(e){console.log(e)}
        res.status(200).json({ name: 'erro J' });
      break;

  }
}