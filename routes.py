from flask import Blueprint, render_template

main = Blueprint('main', __name__)

@main.route('/chatbot')
def chatbot():
    return render_template('HTML/chatBot.html')

@main.route('/')
def home():
    return render_template('HTML/index.html')

@main.route('/confirmar')
def confirmar():
    return render_template('HTML/confirmar.html')

@main.route('/sintomas1')
def sintomas1():
    return render_template('HTML/sintomas1.html')

@main.route('/sintomas2')
def sintomas2():
    return render_template('HTML/sintomas2.html')

@main.route('/sintomas3')
def sintomas3():
    return render_template('HTML/sintomas3.html')

@main.route('/confirmar-sintomas')
def confirmarSintomas():
    return render_template('HTML/confirmar-sintomas.html')

@main.route('/tratamento')
def tratamento():
    return render_template('HTML/tratamento.html')

@main.route('/retirar')
def retirar():
    return render_template('HTML/retirar.html')

@main.route('/index')
def index():
    return render_template('HTML/index.html')

@main.route('/especialidade')
def especialidade():
    return render_template('HTML/especialidade.html')