const userInput = document.getElementById('user-input')
const story = document.querySelector('div')
let progress = 0
const edgeCases = [
    ['get out of bed', 'get up', 'jump out of bed'], 
    []
]
const storyContinues = ["The story continues..."]

if (userInput) {
    userInput.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
            for (let i = 0; i < edgeCases.length; i++) {
                if (userInput.value.includes(edgeCases[progress][i])) {
                    setTimeout(function(){insertLine(edgeCases[progress][i])}, 1000)
                    setTimeout(function(){insertLine(storyContinues[progress])}, 2000)
                    progress++;
                }
            }
            userInput.value = "";
        }
    });
}

function insertLine(line) {
    const newElement = document.createElement("p");
    const node = document.createTextNode(line);
    newElement.appendChild(node);
    story.insertBefore(newElement, userInput.parentElement);
}