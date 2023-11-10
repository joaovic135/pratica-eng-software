import db from '../../../models/index';

const Lojista = db.Lojista;
const Avaliacao = db.Avaliacoes;
const Produto = db.Produto;
const Historico = db.Historico;

export default async function handler(req, res) {
    try {
        await db.sequelize.sync();
        switch (req.method) {
            case 'GET':
                const params = req.query;
                const usuario_historico = await Historico.findOne({ where: { idUsuario: params.id } });
                const responseData = {
                    historico: usuario_historico,
                };
                res.status(200).json(responseData);
                break;
            case 'POST':
                const paramsPost = req.body;
                const novoHistorico = await Historico.create({
                    idComprador: paramsPost.idUsuario,
                    idProduto: paramsPost.idProduto,
                    quantidade: paramsPost.quantidade,
                    data: paramsPost.data,
                });
                res.status(200).json(novoHistorico);
                break;
        }
    } catch (e) {
        console.log(e)
    }
}

