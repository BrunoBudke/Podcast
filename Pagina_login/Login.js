
const BACKEND_URL = 'http://localhost:3000/api';

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
           
            console.log('Login OK!', data.user);
            alert(`Bem-vindo, ${data.user.username}!`);
           
        } else {
           
            alert('Falha no Login: ' + data.message);
        }

    } catch (error) {
        console.error('Erro de Rede/Servidor:', error);
        alert('Erro ao tentar conectar com o Servidor Mágico.');
    }
}
async function handleCadastro() {
    
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


 const form = document.getElementById('loginForm');
 if (form) {
    form.addEventListener('submit', handleLogin);
}