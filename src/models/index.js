// models/index.js
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
let modelPath = path.resolve('src', 'models'); //add this line
console.log(modelPath)
console.log("caminho")
const basename = path.basename(__dirname + '/../models/index.js'); //change this line
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
import mysql2 from 'mysql2';

const db = {};

const sequelize = new Sequelize('db', 'jcghtq93gd961qgtppej', 'pscale_pw_mWN466AzFLvkzP7PRXEUt0Xu7fAh3lXpfFNxn9tjRM3', {
  host: 'aws.connect.psdb.cloud',
  dialect: 'mysql',
  dialectModule: mysql2,
  dialectOptions: {
      ssl: {
          rejectUnauthorized: true,        
      }
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PlanetScale!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } 
})(); 

const Lojista = require('./lojista')(sequelize, Sequelize); // Importe o modelo Lojista
const Usuario = require('./usuario')(sequelize, Sequelize); // Importe o modelo Lojista
const Produto = require('./produto')(sequelize, Sequelize); // Importe o modelo Lojista

Lojista.init(sequelize);
Produto.init(sequelize);
Usuario.init(sequelize);

db.Lojista = Lojista;
db.Usuario = Usuario;
db.Produto = Produto;


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;