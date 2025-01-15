from flask import Flask, render_template, request, jsonify
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.naive_bayes import MultinomialNB
from routes import main 
import unicodedata
import random
import re

app = Flask(__name__)
app.register_blueprint(main)

def preprocess_text(text):
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("utf-8")
    text = re.sub(r"\s+", " ", text).strip().lower()
    return text

perguntas = [
    "oi", "ola", "e ai", "opa", "salve",
    "qual e o seu nome", "como voce esta", "sair",
    "triagem pelo chat", "ajuda", "esqueci minha documentacao", 
    "nao tenho carteirinha do sus", "nao achei meus sintomas",
    "problemas com a senha", "senha", "tempo de espera", 
    "tempo", "atendimento", "tem cardiologista", "tem pediatra", 
    "tem otorrinolaringologista", "tem enfermeiro", "tem medico", 
    "tem neuro", "horario de atendimento", "horario", "remedio", 
    "tem remedio", "preferencia", "preferencial", "obrigado", 
    "obrigada", "obrigade", "risco", "estou em risco", 
    "quem vai me atender", "tem meu historico medico", 
    "historico medico", "posso levar meu acompanhante", 
    "acompanhante", "quantos anos voce tem", "anos"
]

intencoes = [
    "saudacao", "saudacao", "saudacao", "saudacao", "saudacao",
    "nome", "estado", "despedida", "triagem", "ajuda",
    "documentacao", "documentacao", "sintomas", "senha", "senha",
    "tempo_espera", "tempo_espera", "tempo_espera", "especialidade",
    "especialidade", "especialidade", "especialidade", "especialidade",
    "especialidade", "horario", "horario", "farmacia", "farmacia",
    "preferencia", "preferencia", "agradecimento", "agradecimento",
    "agradecimento", "risco", "risco", "atendimento", "historico",
    "historico", "acompanhante", "acompanhante", "anos", "anos"
]

perguntas_preprocessadas = [preprocess_text(q) for q in perguntas]

vectorizer = CountVectorizer()
X = vectorizer.fit_transform(perguntas_preprocessadas)
model = MultinomialNB()
model.fit(X, intencoes)

respostas = {
    "saudacao": ["Oi! Sou a MIA, você quer ajuda ou fazer triagem pelo chat?", "Olá! Tudo bem? Você quer ajuda ou fazer triagem pelo chat?"],
    "nome": ["MIA, sua assistente inteligente de medicina.", "Eu sou uma assistente virtual."],
    "estado": ["Estou bem, obrigado por perguntar!", "Estou funcionando perfeitamente."],
    "despedida": ["Até mais! Foi bom conversar com você.", "Tchau! Volte sempre!"],
    "triagem": ["Por favor, vá até o cadastro e coloque suas informações."],
    "ajuda": ["Posso ajudar com dúvidas ou com o encaminhamento para a triagem."],
    "documentacao": ["Não tem problema, use seu CPF ou vá à recepção para a emissão da sua carteirinha."],
    "sintomas": ["Por favor, vá até a tela de sintomas e descreva o que está sentindo."],
    "senha": ["Vá à recepção para resolver questões de senha."],
    "tempo_espera": ["O tempo de espera para passar na triagem é de 10 minutos."],
    "horario": ["O hospital está aberto 24 horas."],
    "farmacia": ["Vá à farmácia do hospital para mais informações sobre medicamentos."],
    "preferencia": ["Se você tiver 60 anos ou mais ou qualquer tipo de deficiência, seu atendimento será prioritário."],
    "agradecimento": ["De nada! Se precisar de mais alguma coisa, digite sua pergunta."],
    "risco": ["Por favor, aguarde que o enfermeiro(a) vai avaliar sua situação."],
    "atendimento": ["Depois de finalizar seu cadastro, será emitida uma senha para continuar com o enfermeiro na triagem."],
    "historico": ["Sim, temos seu histórico médico em nosso sistema por até 6 meses."],
    "acompanhante": ["Sim, você pode levar um acompanhante com você."],
    "default": ["Desculpe, não entendi sua pergunta."],
    "anos": ["Tenho exatamente 1 semana de vida."]
}

def responder(pergunta_usuario):
    pergunta_usuario = preprocess_text(pergunta_usuario)
    pergunta_vectorizada = vectorizer.transform([pergunta_usuario])

    similaridades = cosine_similarity(pergunta_vectorizada, X).flatten()
    indice_mais_similar = similaridades.argmax()
    
    if similaridades[indice_mais_similar] > 0.3:
        intencao_predita = intencoes[indice_mais_similar]
    else:
        intencao_predita = "default"

    resposta = random.choice(respostas.get(intencao_predita, respostas["default"]))
    return resposta

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    pergunta_usuario = data.get("message")
    resposta = responder(pergunta_usuario)
    return jsonify({"response": resposta})

if __name__ == '__main__':
    app.run(port=5500, debug=True)