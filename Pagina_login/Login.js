// =============================================================
// ARQUIVO: login.js (OU NO SEU ARQUIVO JS EXISTENTE)
// =============================================================

const BACKEND_URL = 'http://localhost:3000/api';

/**
 * Função para lidar com o login do usuário.
 */
async function handleLogin(event) {
    if (event) event.preventDefault(); 
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const dados = { email, password };

    try {
        const response = await fetch(`${BACKEND_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados),
        });

        const data = await response.json();

        if (response.ok) {
            // SUCESSO! Armazene o ID/Token do usuário para manter a sessão
            console.log('Login OK!', data.user);
            alert(`Bem-vindo, ${data.user.username}!`);
            // Exemplo: Redirecionar para a área logada
            // window.location.href = 'pagina_logada.html'; 
        } else {
            // ERRO (Geralmente 401 ou 400)
            alert('Falha no Login: ' + data.message);
        }

    } catch (error) {
        console.error('Erro de Rede/Servidor:', error);
        alert('Erro ao tentar conectar com o Servidor Mágico.');
    }
}

/**
 * Função de exemplo para lidar com o cadastro de novo usuário.
 */
async function handleCadastro() {
    // Para simplificar, vamos pedir os dados via prompt ou você pode usar um formulário dedicado
    const username = prompt("Digite um nome de usuário:");
    const email = prompt("Digite seu email:");
    const password = prompt("Digite uma senha:");

    if (!username || !email || !password) return alert("Cadastro cancelado.");

    const dados = { username, email, password };

    try {
        const response = await fetch(`${BACKEND_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados),
        });

        const data = await response.json();

        if (response.ok) {
            alert('🎉 Cadastro realizado com sucesso! ' + data.message);
        } else {
            alert('Falha no Cadastro: ' + data.message);
        }

    } catch (error) {
        console.error('Erro de Rede/Servidor:', error);
        alert('Erro ao tentar conectar com o Servidor Mágico.');
    }
}

// Adiciona o listener de evento para o formulário (se você usar a estrutura HTML acima)
 const form = document.getElementById('loginForm');
 if (form) {
    form.addEventListener('submit', handleLogin);
}