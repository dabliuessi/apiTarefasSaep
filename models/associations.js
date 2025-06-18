// models/associations.js
const Tarefa = require('./tarefa');
const Usuario = require('./usuario');

function setupAssociations() {
  // Uma Tarefa pertence a um Usuário
  // Tarefa terá uma coluna 'id_usuario' que referencia o 'id' do Usuario
  // 'as: 'usuario'' define o alias que você usará no `include` (ex: task.usuario.nome)
  // Certifique-se de que este alias 'usuario' (minúsculo) é o que você usa no seu backend na rota GET /tarefas
  Tarefa.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

  // Um Usuário pode ter muitas Tarefas
  // Isso cria o método 'getTarefas' no objeto Usuario
  // 'as: 'tarefas'' define o alias para quando você busca as tarefas de um usuário (ex: user.tarefas)
  Usuario.hasMany(Tarefa, { foreignKey: 'id_usuario', as: 'tarefas' });

  console.log('Associações Sequelize configuradas!');
}

module.exports = setupAssociations;