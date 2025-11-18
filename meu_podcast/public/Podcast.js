async function gerarRoteiroIA() {
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
