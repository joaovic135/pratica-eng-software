import db from "../../../../models/index.js";
const Sequelize = require('sequelize');
const { Leiloes, ItemLeiloes, Lances, Usuario } = db;

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const AllLeiloes = await Leiloes.findAll();

        const leiloesComNomes = await Promise.all(
          AllLeiloes.map(async (leilao) => {
            const itemLeilao = await ItemLeiloes.findOne({
              where: { leilaoId: leilao.id },
            });
            const lojista = await Usuario.findOne({
              where: { id: itemLeilao.lojistaId },
            });

            return {
              id: leilao.id,
              nomeLeilao: leilao.nome,
              nomeLojista: lojista.nome,
              nomeProduto: itemLeilao.nome,
              leilaoInicio: leilao.dataInicio,
              leilaoFinal: leilao.dataFim,
              itemLeilaoValorInicial: itemLeilao.valorInicial,
              itemLeilaoValorAtual: itemLeilao.valorAtual,
              // Outros campos do leilão, se necessário
            };
          })
        );

        res.status(200).json(leiloesComNomes);
      } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Ocorreu um erro ao buscar os leilões." });
      }
      break;
    case "DELETE":
      try {

        console.log("oi")
        const { id } = req.query
        console.log(id)
        const leilaoId = id; // Suponha que você recebe o ID do leilão a ser excluído no corpo da solicitação
        // Inicie uma transação
        await db.sequelize.transaction(async (t) => {
          // Exclua os lances associados ao item do leilão
          const leilaoDelete = await Leiloes.findOne({ where: { id: leilaoId }, transaction: t })
          console.log(leilaoDelete)
          await Lances.destroy({
            where: { ItemLeilaoId: leilaoDelete.produtoId },
            transaction: t,
          });
          
          const itemLeilao = await ItemLeiloes.findOne({
            where: { leilaoId: leilaoDelete.id },
            transaction: t,
          });
          
          if (itemLeilao) {
            // Exclua o item do leilão
            await itemLeilao.destroy({ transaction: t });
            
            // Exclua o leilão em si
            await Leiloes.destroy({
              where: { id: leilaoDelete.id },
              transaction: t,
            });
            
            res.status(204).send(); // 204 significa "No Content" (sucesso sem resposta)
          } else {
            res.status(404).json({ error: "Item de leilão não encontrado." });
          }
        });
      } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Ocorreu um erro ao excluir o leilão." });
      }
      break;
    default:
      res.status(405).json({ error: "Método não permitido." });
  }
}
