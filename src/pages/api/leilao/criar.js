import Lojista from "@/pages/lojistas/[id].js";
import db from "../../../models/index.js";
db.sequelize.sync();
const Leiloes = db.Leiloes;
const ItemLeiloes = db.ItemLeiloes;

export default async function handler(req, res) {
  switch (req.method) {
    
    
    case "POST":
      const params = req.query;
      const LojistaId = params.idLojista;
      try{
        console.log(LojistaId)
        console.log(req.body)
        const produto = req.body.produto;
        const leilao = req.body.leilao;
        console.log(produto)
        console.log(leilao)

        const ItemLeiloesNovo = await ItemLeiloes.create({
          nome: produto.nomeProduto,
          descricao: produto.descricaoProduto,
          valorInicial: produto.valorInicialProduto,
          valorAtual: produto.valorInicialProduto,
          valorAtual: produto.valorInicialProduto,
          lojistaId: LojistaId,
        });
        
        const LeiloesNovo = await Leiloes.create({
          nome: leilao.nomeLeilao,
          lojistaId: LojistaId,
          produtoId: ItemLeiloesNovo.id,
          dataInicio: leilao.dataInicio,
          dataFim: leilao.dataFim,
        });

        ItemLeiloes.update({
          leilaoId: LeiloesNovo.dataValues.id,
          
        },{
          where: {
            id: ItemLeiloesNovo.dataValues.id,
          },
        })
        
        console.log(LeiloesNovo)
        res.status(201).json(LeiloesNovo.dataValues.id);
      }catch(e){
        console.log(e)
        res.status(500).end("Erro interno do servidor")
      }
      
      break;
    default:
      res.status(405).end("Method not allowed");
      break;
  }
}
