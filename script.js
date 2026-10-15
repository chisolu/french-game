function launchFireworks() {
    const colors = ["red", "yellow", "blue", "lime", "orange", "magenta"];

    const container = document.querySelector(".container");
    if (!container) return;

    const rect = container.getBoundingClientRect();

    for (let burst = 0; burst < 3; burst ++) {
        setTimeout(() => {
           const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            for (let i = 0; i < 36; i++) {
                const particle = document.createElement("div");

                particle.className = "firework-particle";

                particle.style.left = centerX + "px";
                particle.style.top = centerY + "px";

                const color = colors[Math.floor(Math.random() * colors.length)];
                particle.style.backgroundColor = color;
                particle.style.color = color;
                const angle = (Math.PI * 2 * i) / 36;
                const distance = 30 + Math.random() * 50;

                particle.style.setProperty(
                    "--x", Math.cos(angle) * distance + "px"
                    );

                particle.style.setProperty(
                    "--y", Math.sin(angle) * distance + "px"
                );
                    document.body.appendChild(particle);
                    setTimeout(() => particle.remove(), 1100);                
            }
        }, burst * 300);
    }
}
// END AMIMATION

let currentNumber;
let currentType;
let score = 0;
let questionCount = 0;
let maxQuestions = 10;
let timeleft = 60;
let timer;
let gameStarted = false;

// FRENCH NUMBER 1 - 100
const frenchNumbers = {
    1: "un",
    2: "deux",
    3: "trois",
    4: "quatre",
    5: "cinq",
    6: "six",
    7: "sept",
    8: "huit",
    9: "neuf",
    10: "dix",

    11: "onze",
    12: "douze",
    13: "treize",
    14: "quatorze",
    15: "quinze",
    16: "seize",
    17: "dix-sept",
    18: "dix-huit",
    19: "dix-neuf",
    20: "vingt",

    21: "vingt et un",
    22: "vingt-deux",
    23: "vingt-trois",
    24: "vingt-quatre",
    25: "vingt-cinq",
    26: "vingt-six",
    27: "vingt-sept",
    28: "vingt-huit",
    29: "vingt-neuf",

    30: "trente",
    31: "trente et un",
    32: "trente-deux",
    33: "trente-trois",
    34: "trente-quatre",
    35: "trente-cinq",
    36: "trente-six",
    37: "trente-sept",
    38: "trente-huit",
    39: "trente-neuf",

    40: "quarante",
    41: "quarante et un",
    42: "quarante-deux",
    43: "quarante-trois",
    44: "quarante-quatre",
    45: "quarante-cinq",
    46: "quarante-six",
    47: "quarante-sept",
    48: "quarante-huit",
    49: "quarante-neuf",

    50: "cinquante",
    51: "cinquante et un",
    52: "cinquante-deux",
    53: "cinquante-trois",
    54: "cinquante-quatre",
    55: "cinquante-cinq",
    56: "cinquante-six",
    57: "cinquante-sept",
    58: "cinquante-huit",
    59: "cinquante-neuf",

    60: "soixante",
    61: "soixante et un",
    62:  "soixante-deux",
    63:  "soixante-trois",
    64:  "soixante-quatre",
    65:  "soixante-cinq",
    66:  "soixante-six",
    67:  "soixante-sept",
    68:  "soixante-huit",
    69:  "soixante-neuf",

    70:  "soixante-dix",
    71:  "soixante et onze ",
    72:  "soixante-douze",
    73:  "soixante-treize",
    74:  "soixante-quatorze",
    75:  "soixante-quinze",
    76:  "soixante-seize",
    77:  "soixante-dix-sept",
    78:  "soixante-dix-huit",
    79:  "soixante-dix-neuf",

    80:  "quatre-vingts",
    81:  "quatre-vingt-un",
    82:  "quatre-vingt-deux",
    83:  "quatre-vingt-trois",
    84:  "quatre-vingt-quatre",
    85:  "quatre-vingt-cinq",
    86:  "quatre-vingt-six",
    87:  "quatre-vingt-sept",
    88:  "quatre-vingt-huit",
    89:  "quatre-vingt-neuf",

    90:  "quatre-vingt-dix",
    91:  "quatre-vingt-onze",
    92:  "quatre-vingt-douze",
    93:  "quatre-vingt-treize",
    94:  "quatre-vingt-quatorze",
    95:  "quatre-vingt-quinze",
    96:  "quatre-vingt-seize",
    97:  "quatre-vingt-dix-sept",
    98:  "quatre-vingt-dix-huit",
    99:  "quatre-vingt-dix-neuf",

    100:  "cent"

};

// start game

function startGame () {
    score = 0;
    questionCount = 0;
    timeleft = 60;
    gameStarted  = true;
    clearInterval(timer);

    document.getElementById("score").innerText = score;
    document.getElementById("count").innerText = questionCount;
    document.getElementById("timer").innerText = timeleft;
    document.getElementById("message").innerText = "";
    document.getElementById("answer").value = "";

    // start timer
    timer = setInterval( function () {
        timeleft--;
        document.getElementById("timer").innerText = timeleft;
        if (timeleft <= 0) {
            clearInterval(timer);
            gameStarted =false
            document.getElementById("question").innerText = "Time's up!";

            document.getElementById("message").innerText = 
            "Final Score:" + score + "/" + maxQuestions;
        } 
    }, 1000);
    nextQuestion();
}
// Generate next question
function nextQuestion () {
    if (questionCount >= maxQuestions) {
        clearInterval(timer);
        gameStarted = false;

         document.getElementById("question").innerText = "Game Over!";

         document.getElementById("message").innerText = 
         "Final Score:" + score + "/" + maxQuestions;
         return;
    }

    let level = Number(document.getElementById("level").value);
    // generate random number
    currentNumber = Math.floor(Math.random() * level) + 1;

    // RANDOMLY CHOOSE QUESTION TYPE
    currentType = Math.random() < 0.5
    ? "word"
    : "number";

    if (currentType === "word") {
        // example:
        // deus -> 2
        // cinq -> 5
    document.getElementById("question").innerText =
    frenchNumbers[currentNumber];
    document.getElementById("answer").type = "number";
    document.getElementById("answer").placeholder = "enter number";
    }
    else {
         // example:
        // 10 -> dix
        // 7 -> sept
    document.getElementById("question").innerText = currentNumber
    document.getElementById("answer").type = "text";
    document.getElementById("answer").placeholder = "enter french number";
    }

    // display english word
    // document.getElementById("question").innerText = numberTowords(currentNumber);
    // clear anser 
    document.getElementById("answer").value = "";
    //  increase question count
    questionCount++;
    document.getElementById("count").innerText = questionCount;
    // focus count
    document.getElementById("answer").focus();
}

// check answer
function checkAnswer () {
    if (!gameStarted) {
        return;
    }

  let answer = document.getElementById("answer")
  .value
  .trim()
  .toLowerCase();

//   dont accept emty answr
if (answer ==="") {
    return;
}
let correct = false;

// word number
if (currentType === "word"){
    if (Number(answer) === currentNumber){
        correct = true;
    }
}

else{
    let correcword = frenchNumbers[currentNumber].toLowerCase();
    if (answer === correcword) {
        correct = true;
    }
}

//   correct answer
  if (correct){
    score++;
    document.getElementById("score").innerText = score;
    document.getElementById("message").innerText = "correct!";
    message.style.color = "green"
    launchFireworks();
    
  } else{
    document.getElementById("message").innerText = 
    "wrong! correct answer: " + (currentType === "word" ? currentNumber
    : frenchNumbers[currentNumber]);
    message.style.color = "red"
  }
        nextQuestion();

} 
// press enter to submit answer
    document.getElementById("answer").addEventListener(
        "keydown",
        function(event) {
            if (event.key ==="Enter") {
                checkAnswer();
            }
        }
    );

