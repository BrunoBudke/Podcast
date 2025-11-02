
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.units import inch


arquivo_pdf = "Podcast_A_Escola_de_Magia_do_Python_Episodio_1.pdf"


doc = SimpleDocTemplate(
    arquivo_pdf,
    pagesize=A4,
    title="A Escola de Magia do Python - Episódio 1",
    leftMargin=60,
    rightMargin=60,
    topMargin=60,
    bottomMargin=40
)


estilos = getSampleStyleSheet()
estilos.add(ParagraphStyle(name="Titulo", fontSize=18, leading=22, alignment=1, spaceAfter=20))
estilos.add(ParagraphStyle(name="Subtitulo", fontSize=14, leading=18, alignment=1, spaceAfter=10, textColor="#444444"))
estilos.add(ParagraphStyle(name="Sessao", fontSize=13, leading=18, spaceBefore=15, spaceAfter=8, textColor="#003366"))
estilos.add(ParagraphStyle(name="Texto", fontSize=12, leading=16, alignment=4))


roteiro = []


roteiro.append(Paragraph("🎙️ Podcast: A Escola de Magia do Python", estilos["Titulo"]))
roteiro.append(Paragraph("Episódio 1: A Pedra Filosofal do Python", estilos["Subtitulo"]))
roteiro.append(Paragraph("Subtítulo: “Descubra os fundamentos mágicos das variáveis e tipos de dados”", estilos["Texto"]))
roteiro.append(Spacer(1, 0.2 * inch))


roteiro.append(Paragraph("🎧 Introdução – Duração aproximada: 2 minutos", estilos["Sessao"]))
roteiro.append(Paragraph("""
(Som de feitiços e página de grimório abrindo)

👩‍💻 Locutor(a):
Sejam todos muito bem-vindos, jovens aprendizes de magia… ou melhor, de Python! 🐍✨
Este é o primeiro episódio da Escola de Magia do Python, onde cada linha de código é um feitiço, e cada comando pode transformar o mundo digital!

Hoje, abriremos juntos o livro mais antigo da programação mística, e nele está gravado o segredo do começo de tudo:

“Toda magia começa com... uma variável!”

Prepare sua varinha — ou melhor, seu teclado — porque hoje vamos decifrar A Pedra Filosofal do Python, e entender os fundamentos mágicos das variáveis e tipos de dados.
""", estilos["Texto"]))

roteiro.append(Spacer(1, 0.2 * inch))
roteiro.append(Paragraph("💡 Fundamentos e aprofundamento – Duração: 8 a 9 minutos", estilos["Sessao"]))
roteiro.append(Paragraph("""
👩‍💻 Locutor(a):
Vamos começar pelo básico: o que é uma variável?
Pense nela como uma caixinha mágica onde você guarda algo importante.
Pode ser um número, um nome, uma palavra, ou até uma frase inteira.

Por exemplo, imagine que você é um mago e tem várias poções.
Cada poção tem um nome e um conteúdo.
No Python, você pode criar uma poção assim:

poção = "Elixir da Sabedoria"

Aqui, “poção” é o nome da caixinha, e o que está dentro dela — “Elixir da Sabedoria” — é o valor que guardamos.

🔮 Locutor(a):
Mas, Bruno, por que precisamos dessas variáveis?
Porque, em programação, tudo precisa estar guardado em algum lugar da memória.
As variáveis são a forma como damos nome a esses espaços.
Assim, o Python sabe onde procurar as informações que você usa em seus feitiços... ops, programas!
""", estilos["Texto"]))

roteiro.append(Spacer(1, 0.2 * inch))
roteiro.append(Paragraph("🧙‍♂️ Tipos de dados — A alquimia da programação", estilos["Sessao"]))
roteiro.append(Paragraph("""
👩‍💻 Locutor(a):
Nem todas as poções são iguais, certo?
Uma pode ser líquida, outra sólida, e outra pode até brilhar no escuro!
Com as variáveis acontece o mesmo: cada uma tem um tipo de dado.

✨ No Python, temos alguns tipos principais:

int – números inteiros, como 1, 2, 3 ou -5
float – números com vírgula, como 3.14 ou 2.5
str – textos, palavras, frases
bool – verdadeiro ou falso, como se fosse um feitiço de decisão

👩‍💻 Locutor(a):
Esses tipos ajudam o Python a entender o que ele está manipulando.
É como um feitiço que precisa do ingrediente certo!
""", estilos["Texto"]))

roteiro.append(Spacer(1, 0.2 * inch))
roteiro.append(Paragraph("🧠 Curiosidades sobre Python – Duração: 2 minutos", estilos["Sessao"]))
roteiro.append(Paragraph("""
👩‍💻 Locutor(a):
O nome Python não veio de uma cobra, mas do programa de comédia “Monty Python’s Flying Circus”, da Inglaterra.
O criador, Guido van Rossum, era fã do grupo e quis que sua linguagem fosse divertida e acessível — e realmente é!

Python é usado em inteligência artificial, robótica, análise de dados, jogos e até efeitos de cinema!
Sim, a mesma linguagem que você está aprendendo pode estar por trás de um robô, de um algoritmo ou de um feitiço digital.
""", estilos["Texto"]))


roteiro.append(Spacer(1, 0.2 * inch))
roteiro.append(Paragraph("🏁 Finalização – Duração: 2 minutos", estilos["Sessao"]))
roteiro.append(Paragraph("""
👩‍💻 Locutor(a):
E assim, jovens bruxos e bruxas do código, terminamos a nossa primeira aula na Escola de Magia do Python!

Hoje, aprendemos que as variáveis são como frascos mágicos que guardam valores, e os tipos de dados são as diferentes essências que dão forma à nossa programação.

✨ Dica final do dia:
Experimente criar suas próprias variáveis no Python.
Brinque, mude valores, combine textos e números.
A prática é o verdadeiro feitiço da aprendizagem!

E não perca o próximo episódio: “A Câmara Secreta das Funções”,
onde vamos desvendar os mistérios das funções e parâmetros em Python!
""", estilos["Texto"]))


doc.build(roteiro)

print(f"✅ PDF gerado com sucesso: {arquivo_pdf}")
