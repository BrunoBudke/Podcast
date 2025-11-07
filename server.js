// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // <--- Importar o Pool do 'pg'
// const bcrypt = require('bcrypt'); // <--- Adicionar (Opcional, mas recomendado para senhas)

const app = express();
const PORT = 3000;
// const DB_FILE = './database.json'; // <--- Remover

app.use(cors());
app.use(bodyParser.json());

// --- Configuração do PostgreSQL ---
const pool = new Pool({
    user: 'seu_usuario',       // Seu usuário do PostgreSQL
    host: 'localhost',         // Ou o endereço do seu servidor de DB
    database: 'seu_banco',     // Nome do seu banco de dados
    password: 'sua_senha',     // Sua senha
    port: 5432,                // Porta padrão do PostgreSQL
});

// Testar a conexão (opcional)
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Erro ao conectar ao PostgreSQL:', err);
        // Considere sair do processo se a conexão for vital
    } else {
        console.log('Conectado ao PostgreSQL com sucesso!', res.rows[0]);
    }
});
// ---------------------------------


// --- Rota de Registro (/api/register) ---
app.post('/api/register', async (req, res) => { // Tornar a função assíncrona
    const { username, email, password } = req.body;

    // A. *Opcional e Recomendado*: Hashing da Senha com bcrypt (Você já tem o pacote!)
    // const hashedPassword = await bcrypt.hash(password, 10);
    // Use 'password' diretamente por enquanto, mas considere implementar o hash!

    // B. Verificar se o e-mail já existe
    try {
        const checkEmail = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        
        if (checkEmail.rows.length > 0) {
            return res.status(400).json({ message: 'Email já cadastrado!' });
        }

        // C. Inserir novo usuário
        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, email, password]
        );

        const newUser = result.rows[0];

        res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });
    } catch (error) {
        console.error("Erro no registro:", error);
        res.status(500).json({ message: 'Erro interno do servidor ao registrar.' });
    }
});


// --- Rota de Login (/api/login) ---
app.post('/api/login', async (req, res) => { // Tornar a função assíncrona
    const { email, password } = req.body;
    
    try {
        // A. Buscar usuário pelo email
        const result = await pool.query('SELECT id, username, email, password FROM users WHERE email = $1', [email]);
        
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Email ou senha incorretos!' });
        }

        const user = result.rows[0];

        // B. Comparar a senha (Sem bcrypt: comparação direta)
        // Se você usasse bcrypt: const passwordMatch = await bcrypt.compare(password, user.password);
        const passwordMatch = user.password === password; // <--- Comparação direta sem hash

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Email ou senha incorretos!' });
        }

        // C. Retornar dados (removendo a senha)
        const { password: _, ...userSafe } = user;

        res.json({ message: 'Login bem-sucedido!', user: userSafe });

    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ message: 'Erro interno do servidor ao logar.' });
    }
});


// --- Rota de Usuários (/api/users) - Exemplo de GET ---
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, username, email FROM users');
        res.json(result.rows);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// ... outras rotas (PUT/DELETE) seguiriam o mesmo padrão Async/Await + pool.query() ...

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});