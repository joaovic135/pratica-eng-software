import { getServerSession } from "next-auth";
import db from "../../../../models/index.js";
db.sequelize.sync();
const Leiloes = db.Leiloes;
const ItemLeiloes = db.ItemLeiloes;
const Lances = db.Lances;

export default async function handler(req, res) {
  switch (req.method) {

    case "GET":


      res.json({ message: "Hello GET" });
    case "POST":

      
      const { id } = req.query;
      const { lance } = req.body;
      try{

        const {idComprador} = req.query

        console.log(req.body)
        const itemLeilao = await ItemLeiloes.findOne({ where: { LeilaoId: id } });
        if (!itemLeilao) {
          return res.status(404).json({ error: 'Leilão não encontrado.' });
        }
        if(itemLeilao.valorAtual >= lance){
          throw new Error("Valor do lance menor que valor atual")
        }else{
          
          const NovoLance = await Lances.create({
            valorLance: lance,
            ItemLeilaoId: itemLeilao.id,
            compradorId: idComprador,
          });
          itemLeilao.update({
            valorAtual: lance,
            lanceId: NovoLance.id,
          })
          return res.status(200).json({ message: 'Lance dado com sucesso.' });
        }
      }catch(e){
        res.status(500).json({ error: e.message });
        console.log(e)
      }
      break;
    default:
      res.status(405).end("Method not allowed");
      break;
  }
}
