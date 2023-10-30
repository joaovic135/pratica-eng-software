import db from '../../../models/index';

const Lojista = db.Lojista;
const Avaliacao = db.Avaliacoes;

export default async function handler(req, res) {
    try {
        await db.sequelize.sync();
        switch (req.method) {
            case 'GET':
                const params = req.query;
                const lojista = await Lojista.findOne({ where: { id: params.id } });
                const avaliacao_lojista = await Avaliacao.findAll({ where: { idLojista: lojista.id } });
                const responseData = {
                    avaliacoes_lojista: avaliacao_lojista,
                };
                res.status(200).json(responseData);
                break;
        }
    } catch (e) {
        console.log(e)
    }
}