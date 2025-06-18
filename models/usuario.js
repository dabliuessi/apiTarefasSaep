const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Tarefa = require('./tarefa');

const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = Usuario;
