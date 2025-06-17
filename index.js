const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const tarefasRoutes = require('./routes/tarefas');
const usuariosRoutes = require('./routes/usuarios');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuariosRoutes);
app.use('/tarefas', tarefasRoutes);

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco com sucesso!');
    sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco:', err);
  });
