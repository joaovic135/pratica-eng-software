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
            case 'POST':
                const { idComprador, idLojista, avaliacao, analise } = req.body;
                try {
                    // Crie uma nova avaliação no banco de dados usando o modelo Avaliacao
                    const novaAvaliacao = await Avaliacao.create({
                      idComprador: idComprador,
                      idLojista: idLojista,
                      avaliacao: avaliacao,
                      analise: analise,
                    });
                  
                    // Envie uma resposta de sucesso para o cliente
                    res.status(201).json({ message: 'Avaliação criada com sucesso!', avaliacao: novaAvaliacao });
                  } catch (error) {
                    // Se houver um erro ao criar a avaliação, envie uma resposta de erro para o cliente
                    console.error('Erro ao criar a avaliação:', error);
                    res.status(500).json({ error: 'Erro interno do servidor ao criar a avaliação.' });
                  }

        }
    } catch (e) {
        console.log(e)
    }
}