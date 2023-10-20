import db from '../../../models/index';


const Seguidores = db.Seguidores;

export default async function handler(req, res) {
    if (req.method == 'GET'){
        db.sequelize.sync();
        try{
            const userId = req.query.id;

            if (!userId) {
                throw new Error('Id do usuário não informado');
            }
            // Busca os lojistas seguidos pelo usuário
            const lojistaSeguidos = await Seguidores.findAll({
                where: {
                    IdComprador: userId,
                },
                attributes: ['IdLojista'],
            });
            // Extrai os ids dos lojistas seguidos
            const idLojistas = lojistaSeguidos.map((seguidor) => seguidor.IdLojista);
            // Busca os lojistas com os ids extraídos
            const lojistas = await db.Lojista.findAll({
                where: {
                    id: idLojistas,
                },
            });
            res.status(200).json({ lojistas });
        }catch (error) {
            console.log(error.message)
            res.status(500).json({ error: error.message});
        }
    }
}

