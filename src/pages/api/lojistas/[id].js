import { genSalt, hash } from 'bcrypt';
import db from '../../../models/index';
db.sequelize.sync();
const Lojista = db.Lojista;
const Produto = db.Produto;


export default async function handler(req, res) {
  //console.log("-------------------------------------------------------------------------------------")
  //console.log(Lojista)
  //console.log("-------------------------------------------------------------------------------------")
  switch (req.method) {

    case 'GET':
      const lojistas = await Lojista.findAll();
      res.status(200).json(lojistas);
      break;

    case 'POST':
      const user = req.body
      try {
        const salt = await genSalt(10);
        const senha = await hash(user.senha, salt);

        const novoLojista = await Lojista.create({
          nome: user.nome,
          email: user.email,
          senha: senha,
          numero: user.numero,
          descricao: user.descricao,
        });
        const id = novoLojista.id;
      } catch (e) { console.log(e) }
      res.status(200).json({ name: 'erro J' });
      break;

    case 'PUT':
      try {
        const params = req.query;
        const { nome, email, numero, descricao } = req.body;
        await Lojista.update(
          { nome, email, numero, descricao },
          { where: { id: params.id } }
        );
        res.status(200).json({ message: 'Atualização bem-sucedida' });
      } catch (e) {
        console.error('Erro ao editar lojista:', e);
        res.status(500).json({ message: 'Erro ao editar lojista' });
      }
      break;

    case 'DELETE':
      try {
        const params = req.query;

        const produtos = await Produto.findAll({ where: { idLojista: params.id } });

        for (const produto of produtos) {
          await produto.destroy();
        }
        await Lojista.destroy({ where: { id: params.id } });

        res.status(200).json({ message: 'Lojista e produtos excluídos com sucesso' });
      } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Ocorreu um erro ao excluir o lojista e seus produtos' });
      }
      break;


  }
}