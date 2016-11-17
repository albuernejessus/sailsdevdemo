module.exports = {

models: {
          connection: 'localMySQLServer',
          //schema: true,
          migrations: 'safe'
},

connections: {
                localMySQLServer:
                {
                  adapter: 'sails-mysql',
                  host: 'localhost',
                  user: 'dev1',
                  password: 'dev1localhost',
                  database: 'sailsdevbetadb'
                }
},

session: {
            adapter: 'memory'
         },
};
