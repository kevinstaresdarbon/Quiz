// initialise global variables
var currentQ = 0;
var score = 0;
var time = 100;

// get the needed references
var qBox = document.querySelector("#questions");
var qBoxTitle = document.querySelector("#question-title");
var aBox = document.querySelector("#choices");
var startButton = document.querySelector("#start");
var endBox = document.querySelector("#end-screen");
var scoreSpan = document.querySelector("#final-score");
var nameTag = document.querySelector("#initials");
var submitButton = document.querySelector("#submit");
var splash = document.querySelector("#start-screen");
var countSpan = document.querySelector("#time");
var timer = document.querySelector(".timer");

// add the event handler to the submitButton and the initials field
submitButton.addEventListener("click", handleSubmit);

nameTag.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        handleSubmit();
    }
})

// set the placeholder for the nameTag
nameTag.setAttribute("placeholder", "ABC");

// initialise the audio objects
const sfxCorrect = new Audio("./assets/sfx/correct.wav");
const sfxIncorrect = new Audio("./assets/sfx/incorrect.wav");

// add some more interesting rules to scoring
function calcScore() {
    var result = Math.floor(time / 10) + score;
    return result;
}

function handleStartClick() {
    // hide the splash text
    splash.setAttribute("class", "hide");
    // change the timer countdown to red and start counting down
    timer.setAttribute("style", "color: red;")

    // adapted from advice on stackoverflow.com to create a blinking effect on the timer

    countSpan.addEventListener("animationend", function () {
        countSpan.classList.remove("fade-in-text-quick");
    });

    var countDown = setInterval(() => {
        // creates a blinking effect

        countSpan.setAttribute("class", "fade-in-text-quick");

        if (time < 1) {
            clearInterval(countDown);
            quizFinished();
        }
        else if (!questions[currentQ]) {
            clearInterval(countDown);
        }
        else {
            time--;
            countSpan.textContent = time;
        }
    }, 1000);


    // to begin at the beginning...
    renderQuestion(questions[0]);

}

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

    if (questions[currentQ]) {
        // render the next question
        renderQuestion(questions[currentQ]);
    } else {
        // change the timer countdown to green. countdown has stopped
        timer.setAttribute("style", "color: green;")
        // handle scoring
        quizFinished();
    }
}

function handleSubmit() {

    if (nameTag.value.length > 3) {
        alert("Too many characters.  Please enter three at most");
        return;
    } else {
        var scoreTag = nameTag.value;
        var finalScore = calcScore();
        // if no item in local storage, create the first item
        if (!localStorage.getItem("scores")) {
            var scoreTable = [];
            scoreTable[0] = { scoreTag: scoreTag, finalScore: finalScore };
            var storageString = JSON.stringify(scoreTable);
            localStorage.setItem("scores", storageString);
        } else {
            // retrieve the array from local storage and push the next value into it, then return it to local storage
            var scoresString = localStorage.getItem("scores");
            var scoreTable = JSON.parse(scoresString);
            scoreTable.push({ scoreTag: scoreTag, finalScore: finalScore });
            var storageString = JSON.stringify(scoreTable);
            localStorage.setItem("scores", storageString);
        }

        //re-direct to the highscores page with the .assign() method
        window.location.assign("https://kevinstaresdarbon.github.io/Quiz/highscores.html")
    }

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
        // append the li to the ol and fade it in
        answers.appendChild(option);
        answers.setAttribute("class", "fade-in-text");
    }

    // once iteration has finished append the ol to the choices div
    aBox.appendChild(answers);

    // change the class here to show the fade-in effect for the ready to display question
    qBox.setAttribute("class", "show");
    aBox.setAttribute("class", "show");
}

function quizFinished() {
    // hide the qBox
    qBox.setAttribute("class", "hide");

    // set the score and fade-in the endBox
    scoreSpan.textContent = calcScore();
    endBox.setAttribute("class", "fade-in-text");
}

startButton.addEventListener("click", handleStartClick);