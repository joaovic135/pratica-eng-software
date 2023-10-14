import db from '../../../models/index';

//const Lojista = db.Lojista;
//const Comprador = db.Usuario;
const Avaliacao = db.Avaliacoes;

export default async function handler(req, res) {
    try {
        await db.sequelize.sync();
        switch (req.method) {
            case 'GET':
                const avaliacao = await Avaliacao.findAll()
                res.status(200).json(avaliacao);
                break;
        }
    } catch (e) {
        console.log(e)
    }
}