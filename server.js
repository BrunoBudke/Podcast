<<<<<<< HEAD


        const podcasts = [
            {
                title: "A Pedra Filosofal do Python",
                
                audio: "../../Audios_Podcast/Pagina1_EP1.mp3"  
            },
            {
                title: "A Câmara Secreta das Funções",
                audio: "LINK_DO_AUDIO_EPISODIO_2.mp3"  
            },
            {
                title: "O Prisioneiro de Azkaban - Loops e Condições",
                audio: "LINK_DO_AUDIO_EPISODIO_3.mp3"  
            },
            {
                title: "O Cálice de Fogo - Classes e Objetos",
                audio: "LINK_DO_AUDIO_EPISODIO_4.mp3"  
            },
            {
                title: "A Ordem da Fênix - Bibliotecas e Módulos",
                audio: "LINK_DO_AUDIO_EPISODIO_5.mp3"  
            }
        ];
        
        let currentPodcastIndex = 0;
        
        let isPlaying = false;
        
        let isMuted = true;
        
        
        const backgroundMusic = document.getElementById('backgroundMusic');
        const podcastAudio = document.getElementById('podcastAudio');
        const podcastSource = document.getElementById('podcastSource');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const progressBar = document.getElementById('progressBar');
        const currentTimeEl = document.getElementById('currentTime');
        const totalTimeEl = document.getElementById('totalTime');
        const currentTitleEl = document.getElementById('currentTitle');
        const currentNumberEl = document.getElementById('currentNumber');
        const muteBtn = document.getElementById('muteBtn');
        const muteIcon = document.getElementById('muteIcon');
        const muteText = document.getElementById('muteText');
        
        
        window.onload = function() {
            loadPodcast(0);
            
            backgroundMusic.volume = 0.5;
            backgroundMusic.muted = true;
        };
        
       
        function toggleMute() {
            isMuted = !isMuted;
            backgroundMusic.muted = isMuted;
            
            if (isMuted) {
                muteIcon.textContent = '🔇';
                muteText.textContent = 'Desmutar Música';
                muteBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
                muteBtn.classList.add('bg-red-600', 'hover:bg-red-700');
            } else {
                muteIcon.textContent = '🔊';
                muteText.textContent = 'Mutar Música';
                muteBtn.classList.remove('bg-red-600', 'hover:bg-red-700');
                muteBtn.classList.add('bg-green-600', 'hover:bg-green-700');
                backgroundMusic.play();
            }
        }
        function loadPodcast(index) {
            if (index < 0 || index >= podcasts.length) return;
            
            currentPodcastIndex = index;
            
            podcastSource.src = podcasts[index].audio;
            podcastAudio.load();
            
            
            currentTitleEl.textContent = podcasts[index].title;
            currentNumberEl.textContent = index + 1;
            
            isPlaying = false;
            playPauseBtn.textContent = '▶️';
            
        
            updatePodcastHighlight();
        }
        
        function updatePodcastHighlight() {
            
            for (let i = 0; i < podcasts.length; i++) {
                document.getElementById(`podcast-${i}`).classList.remove('active-podcast');
            }
            
            document.getElementById(`podcast-${currentPodcastIndex}`).classList.add('active-podcast');
        }
        
        function selectPodcast(index) {
            loadPodcast(index);
        }
        
        function togglePlayPause() {
            if (isPlaying) {
                podcastAudio.pause();
                playPauseBtn.textContent = '▶️';
            } else {
                podcastAudio.play();
                playPauseBtn.textContent = '⏸️';
            }
            isPlaying = !isPlaying;
        }
        
        function nextPodcast() {
            const nextIndex = (currentPodcastIndex + 1) % podcasts.length;
            loadPodcast(nextIndex);
        }
        
        function previousPodcast() {
            const prevIndex = currentPodcastIndex === 0 ? podcasts.length - 1 : currentPodcastIndex - 1;
            loadPodcast(prevIndex);
        }
        
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        function scrollToPodcasts() {
            document.getElementById('podcasts-section').scrollIntoView({
                behavior: 'smooth'
            });
        }
        function goToNextPage() {
            alert('Bem vindo a Grifinória !!');
            
            window.location.href = '../../segunda_pagina/segunda_pagina.html'
        }
        
        podcastAudio.addEventListener('timeupdate', function() {
            const progress = (podcastAudio.currentTime / podcastAudio.duration) * 100;
            progressBar.style.width = progress + '%';
            currentTimeEl.textContent = formatTime(podcastAudio.currentTime);
        });

        podcastAudio.addEventListener('loadedmetadata', function() {
            totalTimeEl.textContent = formatTime(podcastAudio.duration);
        });

        podcastAudio.addEventListener('ended', function() {
            nextPodcast();
        });
        
        function formatTime(seconds) {
            if (isNaN(seconds)) return '0:00';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }
=======
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
>>>>>>> 10968bb855ce27c250df46ff3d2ce777fbb5947b
