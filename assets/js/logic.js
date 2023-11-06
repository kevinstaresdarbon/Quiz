
function renderQuestion(qObject){

    // get references for the divs where the questions and answers should appear
    var qBox = document.querySelector("#questions");
    var qBoxTitle = document.querySelector("#question-title");
    var aBox = document.querySelector("#choices");

    console.log(aBox);

    // create the h3 to display the question
    var question = document.createElement("h3");
    // set the question from the qObject passed in
    question.textContent = qObject.q;

    qBoxTitle.appendChild(question);

    var answers = document.createElement("ol");

    for (let i = 0; i< qObject.answers.length; i++){
        
        var option = document.createElement("li");
        var select = document.createElement("button");

        option.textContent = qObject.answers[i];
        option.setAttribute("style", "display: flex; justify-content: space-between;");
        select.textContent = "Select";
        
        option.appendChild(select);
        answers.appendChild(option);
    }

    aBox.appendChild(answers);

    qBox.setAttribute("class", "fade-in-text");
}

renderQuestion(questions[0]);