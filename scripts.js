// Función para encriptar el texto
function encryptText(text) {
    return text.split('').map(char => {
        return String.fromCharCode(char.charCodeAt(0) + 1);
    }).join('');
}

// Función para desencriptar el texto
function decryptText(text) {
    return text.split('').map(char => {
        return String.fromCharCode(char.charCodeAt(0) - 1);
    }).join('');
}

// Función para mostrar el mensaje
function displayMessage(message) {
    const outputMessageElement = document.getElementById('outputMessage');
    outputMessageElement.textContent = message ? message : 'Ningún mensaje fue encontrado';
}

// Manejar la encriptación automática al escribir en el área de texto
document.getElementById('inputText').addEventListener('input', () => {
    const inputText = document.getElementById('inputText').value;
    const encryptedMessage = encryptText(inputText);
    displayMessage(encryptedMessage);
});

// Función para manejar el evento de arrastrar y soltar en el área de texto
function handleDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const inputText = document.getElementById('inputText');

    if (files.length > 0) {
        const file = files[0];
        if (file.type === "text/plain") {
            const reader = new FileReader();
            reader.onload = function(e) {
                inputText.value = e.target.result;
                const encryptedMessage = encryptText(inputText.value);
                displayMessage(encryptedMessage);
            };
            reader.readAsText(file);
        } else {
            alert('Por favor, suelte un archivo de texto plano (.txt)');
        }
    } else {
        const text = event.dataTransfer.getData('text');
        inputText.value = text;
        const encryptedMessage = encryptText(text);
        displayMessage(encryptedMessage);
    }
}

// Añadir clase para el estilo dragover
const inputText = document.getElementById('inputText');
const outputSection = document.querySelector('.output-section');

inputText.addEventListener('dragover', () => {
    inputText.classList.add('dragover');
});

inputText.addEventListener('dragleave', () => {
    inputText.classList.remove('dragover');
});

inputText.addEventListener('drop', () => {
    inputText.classList.remove('dragover');
});

// Funcionalidad de arrastrar y soltar para desencriptar en la sección de salida
outputSection.addEventListener('dragover', (event) => {
    event.preventDefault();
    outputSection.classList.add('dragover');
});

outputSection.addEventListener('dragleave', () => {
    outputSection.classList.remove('dragover');
});

outputSection.addEventListener('drop', (event) => {
    event.preventDefault();
    outputSection.classList.remove('dragover');

    const text = event.dataTransfer.getData('text');
    if (text) {
        const decryptedMessage = decryptText(text);
        displayMessage(decryptedMessage);
    }
});

// Transferencia de datos de texto encriptado
inputText.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text', event.target.value);
});
