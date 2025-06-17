const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./usuario');

const Tarefa = sequelize.define('Tarefa', {
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
  data_cadastro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('a fazer', 'fazendo', 'pronto'),
    defaultValue: 'a fazer'
  }
}, {
  tableName: 'tarefas',
  timestamps: false
});

Tarefa.belongsTo(Usuario, { foreignKey: 'id_usuario' });

module.exports = Tarefa;
