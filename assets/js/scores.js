//load scores from local storage
var scoresString = localStorage.getItem("scores");

// get references
var scoresTable = document.querySelector("#highscores");
var clearBtn = document.querySelector("#clear");

function handleClear(){
    localStorage.removeItem("scores");
    window.location.reload();
}

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

    var scoresArr = JSON.parse(scoresString);
    scoresArr.sort(compareByScore);
    // adapted from advice here: https://medium.com/@_DandyLyons/how-to-use-a-js-for-of-loop-with-an-index-a4675ed22351#:~:text=Adding%20an%20Index%20to%20the%20for...of%20Loop&text=In%20this%20modified%20loop%2C%20we,the%20value%20during%20each%20iteration to get access to the index

    for (let i = 0; i < scoresArr.length; i++){
        var item = document.createElement("li");
        item.setAttribute("style", "display:flex; justify-content: space-between;")

        item.classList.add("invisible");

        var initials = document.createElement("h3");
        initials.textContent = scoresArr[i].scoreTag.toUpperCase();

        var points = document.createElement("h3");
        points.textContent = scoresArr[i].finalScore;

        item.appendChild(initials);
        item.appendChild(points);

        scoresTable.appendChild(item);
    }
} else {
    var msg = document.createElement("h2");
    msg.textContent = "The table is clear, go back and play my quiz!!";
    scoresTable.appendChild(msg);
}

// animate fade-ins over all the invisible items
var showUs = document.querySelectorAll(".invisible");

for(let j = 0; j < showUs.length; j++){
    let delay = 1000*j;
    setTimeout(()=> {
        showUs[j].classList.remove("invisible");
        showUs[j].classList.add("fade-in-text-quick");
    }, delay)
}

clearBtn.addEventListener("click", handleClear);