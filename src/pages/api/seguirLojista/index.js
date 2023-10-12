import db from '../../../models/index';

const Seguidores = db.Seguidores;


export default async function handler(req, res) {
  try{
    await db.sequelize.sync();
    const { idComprador, idLojista } = req.query;

    switch (req.method) {
      case 'POST':
        console.log(req.query)
        const user = req.query;
        console.log(user.idLojista)
        console.log(idLojista, idComprador)
        const existingSeguidor = await Seguidores.findOne({
          where: {
            IdComprador: idComprador,
            IdLojista: idLojista,
          },
        });
        if (existingSeguidor) {
          throw new Error('O cliente já segue o lojista');
        } else {
          const novoSeguidor = await Seguidores.create({
            IdComprador: idComprador,
            IdLojista: idLojista,
          });
          const id = novoSeguidor.id;
          res.status(200).json({ id: id, name: 'Seguidor' });
        }
        break;

      case 'DELETE':

        const seguidor = await Seguidores.findOne({
          where: {
            IdComprador: idComprador,
            IdLojista: idLojista,
          },
        });
        if (seguidor) {
          await seguidor.destroy();
          res.status(200).json({ message: 'Deixou de seguir o lojista' });
        } else {
          throw new Error('O cliente não segue o lojista');
        }
        break;
    }
  }catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message});
  }
}