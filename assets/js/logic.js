var currentQ = 0;
var score = 0;
var time = 120;

// get references for the divs where the questions and answers should appear
var qBox = document.querySelector("#questions");
var qBoxTitle = document.querySelector("#question-title");
var aBox = document.querySelector("#choices");

const sfxCorrect = new Audio("./assets/sfx/correct.wav");
const sfxIncorrect = new Audio("./assets/sfx/incorrect.wav");

function handleAnswerClick(event) {

    var element = event.target;

    var choice = parseInt(element.parentElement.getAttribute("data-index"));
    if (choice === questions[currentQ].correct) {
        sfxCorrect.play();
        score += 1;
    } else {
        sfxIncorrect.play();
        time -= 10;
    }

    // empty the qBox before re-rendering and increment the currentQ
    qBoxTitle.textContent = "";
    aBox.innerHTML = "";
    currentQ += 1;

    // render the next question
    renderQuestion(questions[currentQ]);
}

function renderQuestion(qObject) {

    // create the h3 to display the question
    var question = document.createElement("h3");

    // set the question from the qObject passed in
    question.textContent = qObject.q;
    qBoxTitle.appendChild(question);

    // create an oredered list to hold the answer options
    var answers = document.createElement("ol");

    // iterate over the answer array for the qObject passed in and create an li and child button for each choice

    for (let i = 0; i < qObject.answers.length; i++) {

        var option = document.createElement("li");
        var select = document.createElement("button");

        option.textContent = qObject.answers[i];
        // add a little styling to the li so that the spacing between the button and the question looks nice
        option.setAttribute("style", "display: flex; justify-content: space-between;");

        option.setAttribute("data-index", i)

        select.textContent = "Select";

        // add the event listener for each button;
        select.addEventListener("click", handleAnswerClick);

        // append the button to the li
        option.appendChild(select);
        // append the li to the ol
        answers.appendChild(option);
        answers.setAttribute("class", "fade-in-text");
    }



    // once iteration has finished append the ol to the choices div
    aBox.appendChild(answers);

    // change the class here to create a fade-in effect for the ready to display question
    qBox.setAttribute("class", "show");
    aBox.setAttribute("class", "show");
}

renderQuestion(questions[currentQ]);