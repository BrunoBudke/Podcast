// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DB_FILE = './database.json';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Garante que o arquivo de "banco" exista
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// Rota de cadastro
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    const db = JSON.parse(fs.readFileSync(DB_FILE));

    // Verifica se já existe
    if (db.find(u => u.email === email)) {
        return res.status(400).json({ message: 'Email já cadastrado!' });
    }

    // Cria novo usuário
    const newUser = { id: Date.now(), username, email, password };
    db.push(newUser);
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));

    res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });
});

// Rota de login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const db = JSON.parse(fs.readFileSync(DB_FILE));

    const user = db.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Email ou senha incorretos!' });
    }

    res.json({ message: 'Login bem-sucedido!', user });
});

// Inicia servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// server.js (Adicione após a rota de login)

// Rota para LER (READ) todos os usuários
app.get('/api/users', (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync(DB_FILE));
        // Mapeia para remover a senha antes de enviar para o frontend por segurança
        const usersSafe = db.map(({ id, username, email }) => ({ id, username, email }));
        res.json(usersSafe);
    } catch (error) {
        console.error("Erro ao ler banco de dados:", error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Rota para LER (READ) um usuário específico por ID
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const db = JSON.parse(fs.readFileSync(DB_FILE));
    
    const user = db.find(u => u.id === userId);
    
    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Retorna dados seguros
    const { id, username, email } = user;
    res.json({ id, username, email });
});

// server.js (Adicione após as rotas GET)

// Rota para ATUALIZAR (UPDATE) um usuário por ID
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { username, email, password } = req.body; // Campos a serem atualizados
    let db = JSON.parse(fs.readFileSync(DB_FILE));
    
    const userIndex = db.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Lógica de atualização
    db[userIndex] = {
        ...db[userIndex], // Mantém dados antigos (ex: ID)
        username: username || db[userIndex].username,
        email: email || db[userIndex].email,
        password: password || db[userIndex].password // **Atenção: A senha deve ser criptografada aqui!**
    };
    
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));

    res.json({ message: 'Usuário atualizado com sucesso!', user: db[userIndex] });
});

// server.js (Adicione após as rotas PUT)

// Rota para DELETAR (DELETE) um usuário por ID
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    let db = JSON.parse(fs.readFileSync(DB_FILE));
    
    const initialLength = db.length;
    // Filtra o array, mantendo apenas os usuários que NÃO têm o ID fornecido
    db = db.filter(u => u.id !== userId);
    
    if (db.length === initialLength) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));

    res.json({ message: 'Usuário deletado com sucesso!' });
});
