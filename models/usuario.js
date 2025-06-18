// models/usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  // Adicione a definição explícita do ID como chave primária
  id: {
    type: DataTypes.INTEGER, // Importante: Tipo INT4 do seu DB
    primaryKey: true,
    autoIncrement: true, // Se o ID for auto-incrementado no seu DB (geralmente é)
    allowNull: false
  },
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
  tableName: 'usuarios', // Nome exato da sua tabela no Supabase
  timestamps: false // Manter se você não tiver colunas createdAt/updatedAt
});

// Nenhuma associação aqui!

module.exports = Usuario;