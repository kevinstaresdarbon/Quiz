//load scores from local storage
var scoresString = localStorage.getItem("scores");

// get references
var scoresTable = document.querySelector("#highscores");

// custom compare function to aid sorting the javascript object array in descending order adapted from https://javascript.plainenglish.io/how-to-sort-json-object-arrays-based-on-a-key-a157461e9610#:~:text=Sort%20the%20JSON%20object%20array%20using%20the%20compare%20function&text=jsonObjectArray.,JavaScript%20is%20a%20straightforward%20process.

function compareByScore(a,b){
    if (parseInt(a.finalScore) < parseInt(b.finalScore)){
        return 1;
    }
    if (parseInt(a.finalScore) > parseInt(b.finalScore)){
        return -1;
    }
    return 0;
}

if (scoresString){
    // no scores set into local storage yet so exit
    var scoresArr = JSON.parse(scoresString);
    scoresArr.sort(compareByScore);
 
    for (score of scoresArr){
        var item = document.createElement("li");
        item.setAttribute("style", "display:flex; justify-content: space-between;")

        var initials = document.createElement("h3");
        initials.textContent = score.scoreTag.toUpperCase();

        var points = document.createElement("h3");
        points.textContent = score.finalScore;

        item.appendChild(initials);
        item.appendChild(points);

        scoresTable.appendChild(item);
    }
} else {
    var msg = document.createElement("h2");
    msg.textContent = "No scores saved to the table yet, go back and play my quiz!!";
    scoresTable.appendChild(msg);
}