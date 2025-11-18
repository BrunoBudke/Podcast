import express from "express";
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
    const nomeArquivo = `audio/${titulo.replace(/\s+/g, "_")}.mp3`;
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
