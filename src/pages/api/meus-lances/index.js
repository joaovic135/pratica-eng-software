// Importe os módulos e modelos necessários
import db from "../../../models/index.js";
const Sequelize = require('sequelize');
const { Op } = Sequelize;
const Leiloes = db.Leiloes;
const ItemLeiloes = db.ItemLeiloes;
const Lances = db.Lances;
const Usuario = db.Usuario;

// Rota para mostrar os leilões do comprador
// Rota para mostrar os leilões do comprador
export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const compradorId = req.query.compradorId;

      try {
        const lancesDoComprador = await Lances.findAll({
          where: {
            compradorId: compradorId,
          },
        });

        const responseData = [];
        const leiloesProcessados = new Set();

        for (const lance of lancesDoComprador) {
          const itemLeilao = await ItemLeiloes.findOne({
            where: {
              id: lance.ItemLeilaoId,
            },
          });

          const leilao = await Leiloes.findOne({
            where: {
              id: itemLeilao.leilaoId,
            },
          });

          console.log(lance.id)
          if (!leiloesProcessados.has(leilao.id)) {
            // Verifique se o lance do comprador é o lance atual
            console.log(itemLeilao.lanceId)
            const lanceAtual = await Lances.findOne({
              where: {
                id: itemLeilao.lanceId,
              },
            })
            console.log(lance)
            console.log(lance.id)
            let lanceDaVez = null
            if(itemLeilao.lanceId == lanceAtual.id){
              lanceDaVez = lanceAtual.valorLance
              console.log("Lance atual")
              console.log(lance)
            }
            
            let isLanceAtualDoComprador = false
            if(lanceAtual.compradorId == compradorId){
              if (itemLeilao.lanceId == lanceAtual.id) {
                isLanceAtualDoComprador = true;
              }
            }
            
            const historicoLancesLeilao = await Lances.findAll({
              where: {
                ItemLeilaoId: itemLeilao.id,
              },
            });
  
            const historicoLancesDoComprador = historicoLancesLeilao.filter(
              (l) => l.compradorId == compradorId
            );
  
            responseData.push({
              leilaoId: leilao.id,
              nomeProduto: leilao.nome,
              dataInicio: leilao.dataInicio,
              dataFim: leilao.dataFim,
              lanceAtual: lanceDaVez,
              isLanceAtualDoComprador: isLanceAtualDoComprador,
              historicoLancesDoComprador: historicoLancesDoComprador,
            });

            leiloesProcessados.add(leilao.id);
          }
        }
        
        console.log(responseData)
        res.status(200).json(responseData);
      } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Erro ao buscar os leilões do comprador." });
      }
      break;

    default:
      res.status(405).end("Method not allowed");
      break;
  }
}
