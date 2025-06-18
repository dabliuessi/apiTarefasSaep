const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');

// 1. Importar os modelos ANTES das associações e rotas
// Isso garante que o Sequelize "conhece" os modelos
const Tarefa = require('./models/tarefa');
const Usuario = require('./models/usuario');

// 2. Importar e chamar a função de configuração de associações
// Esta função irá criar os links entre Tarefa e Usuario
const setupAssociations = require('./models/associations');


const app = express();

app.use(cors());
app.use(express.json());

// 3. Chamar as associações APÓS os modelos estarem definidos
// Isso resolve o erro "not a subclass of Sequelize.Model"
setupAssociations();


// 4. Importar e usar as rotas APÓS as associações terem sido configuradas
// As rotas dependem das associações para fazer includes e operações complexas
const tarefasRoutes = require('./routes/tarefas');
const usuariosRoutes = require('./routes/usuarios');

app.use('/usuarios', usuariosRoutes);
app.use('/tarefas', tarefasRoutes);

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco com sucesso!');
    // Usar sequelize.sync({ alter: true }) em desenvolvimento pode ser útil
    // para que o Sequelize tente ajustar o esquema do banco de dados
    // para corresponder aos seus modelos (ex: adicionar chaves estrangeiras).
    // Em produção, você usaria ferramentas de migração.
    sequelize.sync({ alter: true })
      .then(() => {
        console.log('Banco de dados sincronizado (com possíveis alterações)!');
        app.listen(PORT, () => {
          console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
      })
      .catch(err => {
        console.error('Erro ao sincronizar o banco de dados:', err);
      });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco:', err);
  });