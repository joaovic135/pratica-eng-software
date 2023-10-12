import db from '../../../models/index';

const Seguidores = db.Seguidores;


export default async function handler(req, res) {
  try{
    await db.sequelize.sync();
    switch (req.method) {
      case 'POST':
        const user = req.body;
        const novoSeguidor = await Seguidores.create({
          idLojista: user.idLojista,
          idCliente: user.idCliente,
        });
        const id = novoSeguidor.id;
        res.status(200).json({ id: id, name: 'Seguidor' });
        break;
    }
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro em solicitação de seguir' });
  }
}