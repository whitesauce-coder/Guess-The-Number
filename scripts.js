let attemps = document.getElementById("attemps")
let random = document.getElementById("random")
let checkButton = document.getElementById("checkButton")
let input = document.querySelector(".input")
let historyUpdate = document.getElementById("historyUpdate")
let empty = document.querySelector(".empty")
let startAgainButton = document.getElementById("startAgainButton")
let randomNumber = Math.floor(Math.random() * 9000) + 1000;
console.log(randomNumber)
let hasRun = false;
checkButton.addEventListener('click', buttonClick)
startAgainButton.addEventListener('click', reset);

let attempsCounter = 1;
let attempsRemaining = 5;


input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        buttonClick();
    }
});

//-----------close Button popup-----------
let popup = document.getElementById("popup");
let closeBtn = document.getElementById("closeBtn");

function showPopup() {
    popup.style.display = "flex";
}

closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
    location.reload(true);
});
close4.addEventListener("click", () => {
    popup.style.display = "none";
});


//-----------Try again Button popup-----------
let popup1 = document.getElementById("popup1");
let popup2 = document.getElementById("popup2");
let close1 = document.getElementById("close1");
let close2 = document.getElementById("close2");
let close3 = document.getElementById("close3");
function showPopup1() {
    popup1.style.display = "flex";
}
function showPopup2() {
    popup2.style.display = "flex";
}
close1.addEventListener("click", () => {
    popup1.style.display = "none";
});
close2.addEventListener("click", () => {
    popup2.style.display = "none";
    location.reload(true);
});
close3.addEventListener("click", () => {
    popup2.style.display = "none";
});



//Total run proccess
function buttonClick() {

    let value = parseInt(input.value);
    let splitRandom = randomNumber.toString().split("").map(Number);
    let splitValue = value.toString().split("").map(Number);
    let correctPosition = 0;
    let valueCounter = 0;
    splitValue.forEach((value) => {
        valueCounter++;
    });


    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    let correctNumber = (splitRandom.filter(num => splitValue.includes(num)));
    let shuffled = shuffleArray([...correctNumber]);


    let correctNumberAndPosition = [];
    for (let i = 0; i < splitRandom.length; i++) {
        if (splitRandom[i] === splitValue[i]) {
            correctNumberAndPosition.push(splitValue[i]);
        };
    };

    splitValue.forEach((num, i) => {
        if (num === splitRandom[i]) {
            correctPosition++
        }
    });

    if (5 === attempsCounter || value === randomNumber) {
        input.disabled = true;
        random.innerText = "Random number is " + randomNumber;
    }

    if (5 === attempsCounter || value === randomNumber) {
        checkButton.disabled = true;
        random.innerText = "Random number is " + randomNumber;
    }

    if (value === "" || isNaN(value) || valueCounter !== 4) {
        showPopup1();
        "Please enter exactly 4 digits"
        return;
    }

    let li = document.createElement("li")
    historyUpdate.prepend(li);

    if (!hasRun) {
        historyUpdate.removeChild(empty)
        hasRun = true;
    }


    attempsRemaining--;
    if (value === randomNumber) {
        li.innerText = "Your Number Was " + value + "\nNumber of Correct Position: " + correctPosition + "\nNumber Match: " + shuffled + "\nNumber & Postion Both Match: " + correctNumberAndPosition
        showPopup();
    }
    else if (value != randomNumber) {
        if (attempsCounter === 5) {
            showPopup2();
        };
        li.style.color = "orange"
        li.innerText = "Your Number Was " + value + "\nNumber of Correct Position: " + correctPosition + "\nNumber Match: " + shuffled + "\nNumber & Postion Both Match: " + correctNumberAndPosition
    };
    attemps.innerText = "Attemps Remaining: " + attempsRemaining;
    attempsCounter++;
    input.value = "";
    input.focus();
};

function reset() {
    location.reload(true);
};