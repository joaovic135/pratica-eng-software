import Lojista from "@/pages/lojistas/[id].js";
import db from "../../../models/index.js";
const Sequelize = require('sequelize'); 
db.sequelize.sync();
const Leiloes = db.Leiloes;
const ItemLeiloes = db.ItemLeiloes;
const Lances = db.Lances;
const Usuario = db.Usuario;

export default async function handler(req, res) {
  switch (req.method) {
    
    case "GET":

      const params = req.query;
      const id = params.id;

      try{
        console.log(id)
        const Leilao = await Leiloes.findOne({
          where: {
            id: id
          },
        })

        console.log(Leilao.id)
        const ItemLeilao = await ItemLeiloes.findOne({
          where: {
            leilaoId: Leilao.id
          },
        })
        console.log(id)
        console.log("teste")
        console.log(ItemLeilao)
        const TodosLances = await Lances.findAll({
          where:{
            ItemLeilaoId: ItemLeilao.id
          }
        })
        
        const CompradoresLances = await Usuario.findAll({
          where: {
            id: {
              [Sequelize.Op.in]: [
                Sequelize.literal(
                  `SELECT compradorId FROM Lances WHERE ItemLeilaoId = ${ItemLeilao.id}`
                ),
              ],
            },
          },
        });
        const responseData = {
          Leilao: Leilao,
          ItemLeilao: ItemLeilao,
          TodosLances: TodosLances,
          CompradoresLances: CompradoresLances
        };
        console.log(responseData)

        res.status(200).json(responseData);
      }catch(e){
        console.log(e)
      }

    case "POST":
     
      
      break;
    default:
      res.status(405).end("Method not allowed");
      break;
  }
}
