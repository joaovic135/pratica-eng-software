import db from "../../../../models/index.js";
const Sequelize = require('sequelize');
const { Leiloes, ItemLeiloes, Produto, Usuario } = db;

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;
        const EditLeilao = await Leiloes.findOne({
          where: { id: id },
        });


        res.status(200).json(EditLeilao);
      } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Ocorreu um erro ao buscar os leilões." });
      }
      break;

    case "PUT":
      try {

        const { id } = req.query;
        console.log(id)
        const { nome , dataInicio, dataFim} = req.body;
        const EditLeilao = await Leiloes.update({
          nome: nome,
          dataInicio: dataInicio,
          dataFim: dataFim
        }, {
          where: { id: id },
        });
        res.status(200).json(EditLeilao);
      } catch (e) {
        console.lop(e);
      }
      break;
    default:
      res.status(405).json({ error: "Método não permitido." });
  }
}
