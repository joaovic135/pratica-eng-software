import db from '../../../models/index';

const Historico = db.Historico;

export default async function handler(req, res) {
    try {
        await db.sequelize.sync();
        switch (req.method) {
            case 'GET':
                const params = req.query;
                console.log(params)
                const usuario_historico = await Historico.findAll({ where: { idComprador: params.id } });
                const responseData = {
                    historico: usuario_historico,
                };
                res.status(200).json(responseData);
                break;
            case 'POST':
                const id = req.body.idComprador;
                const carrinho = req.body.carrinhosItens;
                console.log(carrinho)
                const historicos = await Promise.all(
                    carrinho.map(async (item) => {
                        const novoHistorico = await Historico.create({
                            idComprador: id,
                            idProduto: item.id,
                            idLojista: item.idLojista,
                            nomeProduto: item.nomeProduto,
                            descricao: item.descricao,
                            preco: item.preco,
                            categoria: item.categoria,
                            quantidade: item.quantidade,
                        });
                        return novoHistorico;
                        // console.log(item)
                    })
                )
                
                
                res.status(200).json(historicos);
            break;
        }

    } catch (e) {
        console.log(e)
    }
}

