from flask import Blueprint, render_template

segunda = Blueprint('segunda', __name__)

@segunda.route('/chatbot')
def chatbot():
    return render_template('HTML/chatBot.html')

@segunda.route('/cadastro')
def cadastro():
    return render_template('HTML/cadastro.html')

@segunda.route('/')
def home():
    return render_template('HTML/enfermeiro.html')

@segunda.route('/index')
def index():
    return render_template('HTML/index.html')

@segunda.route('/confirmar')
def confirmar():
    return render_template('HTML/confirmar.html')

@segunda.route('/sintomas1')
def sintomas1():
    return render_template('HTML/sintomas1.html')

@segunda.route('/sintomas2')
def sintomas2():
    return render_template('HTML/sintomas2.html')

@segunda.route('/sintomas3')
def sintomas3():
    return render_template('HTML/sintomas3.html')

@segunda.route('/confirmar-sintomas')
def confirmarSintomas():
    return render_template('HTML/confirmar-sintomas.html')

@segunda.route('/tratamento')
def tratamento():
    return render_template('HTML/tratamento.html')

@segunda.route('/retirar')
def retirar():
    return render_template('HTML/retirar.html')

@segunda.route('/especialidade')
def especialidade():
    return render_template('HTML/especialidade.html')
