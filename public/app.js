const userInput = document.getElementById('user-input')
// const line = document.getElementById('line')
const storyLine = document.getElementById('story-line')
const story = document.querySelector('.story')

// if (userInput) {
//     userInput.addEventListener('keydown', (e) => {
//         if (e.key == 'Enter') {
//             // insertLine("New line added")
//             // userInput.value = "";
//         }
//     });
// }

// function insertLine(newLine) {
//     const newElement = document.createElement("p");
//     const node = document.createTextNode(newLine);
//     newElement.appendChild(node);
//     story.insertBefore(newElement, userInput.parentElement);
// }


window.addEventListener("load", () => {
    // Get a HTMLCollection of elements in the page
    let latestScenario = document.getElementsByClassName("currentScenario");
    let userInputField = document.getElementById("user-input")

    const fadeInLine = (i) => {
        if(i < latestScenario.length) {
            latestScenario[i].style.display = "block"
            let fadeInTime = latestScenario[i].innerHTML.length * 50 + 1200
            console.log(fadeInTime)
            i++
            setTimeout(() => { fadeInLine(i) }, fadeInTime)
        }
        if(i == latestScenario.length) {
            setTimeout(() => {
                userInputField.style.display = "block"
            }, 2500)
        }
    };

    setTimeout(fadeInLine, 2000, 0)
    console.log("page is fully loaded");
});