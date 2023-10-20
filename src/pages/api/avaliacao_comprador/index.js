import db from '../../../models/index';

const Usuario = db.Usuario;
const Avaliacao = db.Avaliacoes;

export default async function handler(req, res) {
    try {
        await db.sequelize.sync();
        switch (req.method) {
            case 'GET':
                const params = req.query;
                const comprador = await Usuario.findOne({ where: { id: params.id } });
                const avaliacao_comprador = await Avaliacao.findAll({ where: { idComprador: comprador.id } });
                const responseData = {
                    avaliacoes_comprador: avaliacao_comprador,
                };
                res.status(200).json(responseData);
                break;
        }
    } catch (e) {
        console.log(e)
    }
}