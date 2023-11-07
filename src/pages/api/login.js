
import db from '../../models/index';
const Usuario = db.Usuario;


export default async function handler(req, res) {
  try {
    
    await db.sequelize.sync();
    switch (req.method) {

      case 'GET':
        res.status(200).json({ name: 'Usuario Ja' });
        break;

      case 'POST':
        const emailInserido = req.body.email;
        const senhaInserida = req.body.senha;

        const usuario = await Usuario.findOne({
          where: { 
            email: emailInserido,
            tipoUsuario:'usuario'

          }
        });

        if (!usuario) {
          throw new Error('Usuario não encontrado')
        }

        if (!(await usuario.isTheUserPassword(senhaInserida))) {
          throw new Error('Senha incorreta')
        }
        return res.json({ usuario });

        break;
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Erro no servidor' });
  }
}