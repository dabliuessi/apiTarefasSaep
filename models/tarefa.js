// models/tarefa.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// REMOVA: const Usuario = require('./usuario'); // Não importe Usuario aqui

const Tarefa = sequelize.define('Tarefa', {
  // Adicione a definição explícita do ID da Tarefa
  id: {
    type: DataTypes.INTEGER, // Importante: Tipo INT4 do seu DB
    primaryKey: true,
    autoIncrement: true, // Se o ID for auto-incrementado no seu DB
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  nome_setor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prioridade: {
    type: DataTypes.ENUM('baixa', 'media', 'alta'),
    allowNull: false
  },
  // ADICIONE A CHAVE ESTRANGEIRA id_usuario
  id_usuario: {
    type: DataTypes.INTEGER, // Deve ser do mesmo tipo do ID do Usuario (INT4)
    allowNull: false, // Tarefas devem ter um usuário associado
    references: {
      model: 'usuarios', // Nome da tabela de usuários no DB (verifique se é 'usuarios' no plural e minúsculo)
      key: 'id',        // Coluna da tabela 'usuarios' que está sendo referenciada
    }
  },
  data_cadastro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('a fazer', 'fazendo', 'pronto'),
    defaultValue: 'a fazer'
  }
}, {
  tableName: 'tarefas', // Nome exato da sua tabela no Supabase
  timestamps: false // Manter se você não tiver colunas createdAt/updatedAt
});

// REMOVA: Tarefa.belongsTo(Usuario, { foreignKey: 'id_usuario' }); // Remover esta linha!

module.exports = Tarefa;