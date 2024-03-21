/**
 * List of replacements for encryption and decryption
 */
const REPLACEMENTS = [
    { initial: "e", end: "enter" },
    { initial: "i", end: "imes" },
    { initial: "a", end: "ai" },
    { initial: "o", end: "ober" },
    { initial: "u", end: "ufat" }
];

/**
 * Function to validate correct entry
 * 
 * @remarks It does not allow uppercase
 * @remarks It does not allow special characters
 * @remarks It does not allow accents
 * 
 * @param text - Text to validate
 */
function ValidationTextArea(textareaId) {
    const textarea = document.getElementById(textareaId);

    function handleInput(event) {
        const forbiddenCharacters = /[áéíóúÁÉÍÓÚüñÜÑ!@#$%^&*()_+=[\]{};':"\\|,.<>/?~`]/;
        const inputValue = textarea.value;
        const lastTypedCharacter = inputValue.slice(-1);

        if (lastTypedCharacter.match(/[A-ZáéíóúÁÉÍÓÚüñÜÑ]/) || forbiddenCharacters.test(lastTypedCharacter)) {
            textarea.value = inputValue.slice(0, -1); // Eliminar el último carácter ingresado
            alert("Error")
        }
    }

    textarea.addEventListener('keydown', handleInput);
    textarea.addEventListener('input', handleInput);
    textarea.addEventListener('paste', handleInput);
}

ValidationTextArea("textEncryptDecrypt");

/**
 * Replaces characters in a text based on a list of replacements
 * 
 * @param list - List of replacements
 * @param text - Text to be replaced
 * @param decrypt - If true, decrypts the text; otherwise, encrypts it
 * @returns Encrypted or decrypted text
 */
function replaceArray(list, text, decrypt = false) {
    let result = text;

    const listCopy = list.slice();

    if (decrypt) {
        listCopy.reverse();
    }

    listCopy.forEach(replacement => {
        const regex = new RegExp(decrypt ? replacement.end : replacement.initial, 'g');

        result = result.replace(regex, decrypt ? replacement.initial : replacement.end);
    });

    return result;
}

/**
 * 
 */

function createContent (text = "", restart = false)
{
    const contentResult = document.getElementById("result");

        contentResult.innerHTML = '';
    if (restart)
    {
        contentResult.className = "content-noResult";
        const image = document.createElement('img');
        image.src = "./assets//img//munecoEncrypt.png";
        alt = "munecoEncrypt";
        
        contentResult.appendChild(image);

        const div = document.createElement("div");
        div.className = "message";

        const h2 = document.createElement("h2");

        h2.textContent = "Ningún mensaje fue encontrado";

        div.appendChild(h2);
        
        const h3 = document.createElement("h3");

        h3.textContent = "Ingresa el texto que desees encriptar o desencriptar.";

        div.appendChild(h3);
        contentResult.appendChild(div);

    }
    else
    {
        contentResult.className = "content-noResult textResult";
        
        const h5 = document.createElement("h5");
        h5.textContent = text;
        h5.id ="textResult"

        const button = document.createElement("button");
        button.textContent = "Copiar";
        button.onclick = copy;

        contentResult.appendChild(h5);
        contentResult.appendChild(button);
    }
}

/**
 * Encrypts the input text
 */
function encrypt() {
    let textContent = document.getElementById("textEncryptDecrypt");

    let textValue = replaceArray(REPLACEMENTS, textContent.value);

    textContent.value = "";

    if (textValue)
        createContent(textValue);
    else
        createContent("", true);
        
}

/**
 * Decrypts the input text
 */
function decrypt() {
    let textContent = document.getElementById("textEncryptDecrypt");
    
    let textValue = replaceArray(REPLACEMENTS, textContent.value, true);

    const contentResult = document.getElementById("result");

    textContent.value = "";
    
    if (textValue)
        createContent(textValue);
    else
        createContent("", true);
}

/**
 * Copy the result text
 */
function copy ()
{
    let textCopy = document.getElementById("textResult");
    navigator.clipboard.writeText(textCopy.textContent);
    alert("Texto copiado")
}