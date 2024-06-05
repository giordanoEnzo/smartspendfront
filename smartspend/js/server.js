// Importando módulos necessários
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = 3306;

// Configurando o middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Conectando ao banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smartspend'
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados MySQL:', err);
    throw err;
  }
  console.log('Conexão com o banco de dados MySQL estabelecida.');
});



// Rota de cadastro
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const usuario = document.getElementById('cadastroUsuario').value;
  const email = document.getElementById('cadastroEmail').value;
  const senha = document.getElementById('cadastroSenha').value;
  const confirmarSenha = document.getElementById('cadastroConfirmarSenha').value;

  if (senha !== confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
  }

  fetch('/cadastro', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usuario, email, senha, tipo: 'user' })  // Certifique-se que a variável 'tipo' é definida corretamente
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert('Usuário cadastrado com sucesso.');
          $('#loginCadastroModal').modal('hide');
      } else {
          alert('Erro ao cadastrar usuário.');
      }
  });
});

// Rota de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const usuario = document.getElementById('loginUsuario').value;
  const senha = document.getElementById('loginSenha').value;

  fetch('/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usuario, senha })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          if (data.tipo === 'admin') {
              window.location.href = 'uppdf.html';
          } else {
              window.location.href = 'index.html';
          }
      } else {
          alert('Usuário ou senha incorretos.');
      }
  });
});

// Rota para servir a página HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
