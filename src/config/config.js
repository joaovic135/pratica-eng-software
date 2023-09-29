

module.exports ={

  development: {
    username: 'jcghtq93gd961qgtppej',
    password: 'pscale_pw_mWN466AzFLvkzP7PRXEUt0Xu7fAh3lXpfFNxn9tjRM3',
    database: 'db',
    host: 'aws.connect.psdb.cloud',
    dialect: 'mysql',
    dialectModule: mysql2,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
      },
    },
    define: {
      timestamps: false,
    },
  }
}
