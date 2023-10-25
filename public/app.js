const userInput = document.getElementById('user-input')
const line = document.getElementById('line')
const storyLine = document.getElementById('story-line')
const story = document.querySelector('.story')

if (userInput) {
    userInput.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
            // insertLine("New line added")
            // userInput.value = "";
        }
    });
}

function insertLine(newLine) {
    const newElement = document.createElement("p");
    const node = document.createTextNode(newLine);
    newElement.appendChild(node);
    story.insertBefore(newElement, userInput.parentElement);
}