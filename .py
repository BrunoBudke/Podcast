import os
PASTA_BASE = "meu_podcast"
ARQUIVOS_PUBLIC = ["Podcast.html", "Podcast.js", "Podcast.css"]
SUBPASTA_AUDIO = "audio"

SERVER_JS = """import express from "express";
import OpenAI from "openai";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/gerarRoteiroIA", async (req, res) => {
  try {
    const { titulo, tema } = req.body;

    const roteiroPrompt = `
Você é o narrador do podcast "A Escola de Magia do Python".
Crie um roteiro didático e envolvente sobre "${tema}", com o título "${titulo}".
Tom: divertido e mágico, misturando referências de Harry Potter e ensino de Python.
`;

    const resposta = await client.chat.completions.create({
      model: "gpt-5",
      messages: [{ role: "user", content: roteiroPrompt }],
    });

    const roteiro = resposta.choices[0].message.content;

    const tts = await client.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "alloy",
      input: roteiro,
    });

    const buffer = Buffer.from(await tts.arrayBuffer());
    const nomeArquivo = `audio/${titulo.replace(/\\s+/g, "_")}.mp3`;
    fs.writeFileSync(`public/${nomeArquivo}`, buffer);

    res.json({
      status: "ok",
      titulo,
      tema,
      roteiro,
      audio: nomeArquivo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao gerar roteiro IA" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
"""

PACKAGE_JSON = """{
  "name": "meu_podcast",
  "version": "1.0.0",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "dotenv": "^16.3.1",
    "express": "^4.19.2",
    "openai": "^4.12.0"
  }
}
"""

ENV_CONTENT = "OPENAI_API_KEY=sua_chave_aqui\n"

HTML_BASE = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Podcast IA - Escola de Magia do Python</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="Podcast.css">
</head>
<body class="text-white bg-gradient-to-r from-purple-900 to-indigo-900 min-h-screen text-center">
  <h1 class="text-4xl font-bold mt-10 text-amber-400">🎙️ A Escola de Magia do Python 🎙️</h1>
  <p class="text-gray-300 mb-8">Gere episódios mágicos com IA!</p>

  <button onclick="gerarRoteiroIA()" class="bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-lg font-semibold text-black">
    🪄 Gerar Novo Episódio com IA
  </button>

  <div id="mensagem" class="mt-6 text-lg text-gray-300"></div>

  <script src="Podcast.js"></script>
</body>
</html>
"""

JS_BASE = """async function gerarRoteiroIA() {
  const titulo = prompt("Digite o título do episódio:");
  const tema = prompt("Sobre qual tema do Python será o episódio?");

  document.getElementById('mensagem').textContent = "Gerando episódio mágico... ✨";

  const response = await fetch("/gerarRoteiroIA", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, tema })
  });

  const data = await response.json();

  if (data.status === "ok") {
    document.getElementById('mensagem').innerHTML =
      "✅ Episódio gerado com sucesso!<br><audio controls src='" + data.audio + "'></audio>";
  } else {
    document.getElementById('mensagem').textContent = "❌ Erro ao gerar episódio IA.";
  }
}
"""

CSS_BASE = """body {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}
button {
  transition: all 0.3s ease;
}
button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
}
"""

print(f"🪄 Criando estrutura do projeto '{PASTA_BASE}'...")

os.makedirs(os.path.join(PASTA_BASE, "public", SUBPASTA_AUDIO), exist_ok=True)

with open(os.path.join(PASTA_BASE, "server.js"), "w", encoding="utf-8") as f:
    f.write(SERVER_JS)

with open(os.path.join(PASTA_BASE, "package.json"), "w", encoding="utf-8") as f:
    f.write(PACKAGE_JSON)

with open(os.path.join(PASTA_BASE, ".env"), "w", encoding="utf-8") as f:
    f.write(ENV_CONTENT)


with open(os.path.join(PASTA_BASE, "public", "Podcast.html"), "w", encoding="utf-8") as f:
    f.write(HTML_BASE)

with open(os.path.join(PASTA_BASE, "public", "Podcast.js"), "w", encoding="utf-8") as f:
    f.write(JS_BASE)

with open(os.path.join(PASTA_BASE, "public", "Podcast.css"), "w", encoding="utf-8") as f:
    f.write(CSS_BASE)

print("✅ Projeto 'meu_podcast' criado com sucesso!")
print("👉 Agora execute:")
print("   cd meu_podcast")
print("   npm install")
print("   npm start")
