const caixaTexto = document.querySelector(".caixaTexto textarea");
const sendChatBtn = document.getElementById("botao");
const chatbot = document.querySelector(".chatbot");

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("mensagem", className);

    if (className === "pessoa") {
        const icon = `<span class="material-symbols-outlined">face</span>`;
        chatLi.innerHTML = `<p class="pessoa">${message}</p>${icon}`; 
    } else {
        const botIcon = `<img class="chatbot-icon" src="/static/img/MIA.png" alt="Chatbot" />`; 
        chatLi.innerHTML = `${botIcon}<p class="chat-ia">${message}</p>`; 
    }

    return chatLi;
};

async function sendMessage() {
    const message = caixaTexto.value.trim(); 
    if (!message) return;

    chatbot.appendChild(createChatLi(message, "pessoa"));
    caixaTexto.value = ""; 

    try {
        const response = await fetch('http://127.0.0.1:5500/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        const botResponse = data.response;

        chatbot.appendChild(createChatLi(botResponse, "bot"));
    } catch (error) {
        console.error("Erro ao conectar com o backend:", error);
        chatbot.appendChild(createChatLi("Erro ao conectar com o backend.", "bot"));
    }
}

sendChatBtn.addEventListener("click", sendMessage);

caixaTexto.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); 
        sendMessage();
    }
});