const submitWordToGuess = document.getElementById("word-in");
const submitLetterGuess = document.getElementById("letter-in");
const playAgain = document.getElementById("play-again");
const concealedWordElement = document.getElementById("word-in-play");
const guessedLetters = document.getElementById("guessed-letters");
let wordToGuess;

submitWordToGuess.addEventListener('click', function() {
    setWord();
    concealWord();
});

function setWord () {

    const wordToGuessElement = document.getElementById("word-to-guess");
    wordToGuess = wordToGuessElement.value;

    wordToGuessElement.value = '';

    console.log(wordToGuess);
}

function concealWord() {

    concealedWord = "";

    const wordLength = wordToGuess.length;

    const letterPlaceholder = "<span class = 'word'></span>"

    for(let i = 0; i < wordLength; i++){
        concealedWord += letterPlaceholder;
    }

    concealedWordElement.innerHTML = concealedWord;
}

submitLetterGuess.addEventListener('click', function () {

    let concealedSpans = document.querySelectorAll(".word");
    let guessCount;
    //let letterGuess;

    let letterGuess = setGuess();

    let winOrLose = compareGuess(letterGuess); 
    if(winOrLose){
        addCorrectGuess(concealedSpans, letterGuess);
    } else {
        addIncorrectGuess(letterGuess);
        guessCount = guessedLetters.querySelectorAll("span").length;
        showBodyPart(guessCount);
    }

    checkEndOfGame(concealedSpans, guessCount);
});

function setGuess() {
    const letterGuessElement = document.getElementById("guess");
    letterGuess = letterGuessElement.value;

    letterGuessElement.value = '';

    return letterGuess;
}

function compareGuess(letterGuess){

    letterGuess = letterGuess.toLowerCase();
    console.log(letterGuess);

    if(wordToGuess.includes(letterGuess)){
        return true;
    } else {
        return false;
    }
}

function addCorrectGuess(concealedSpans, letterGuess){

    let letterIndicies = [];
    for(i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess[i] === letterGuess){
            letterIndicies.push(i);
        }
    }

    for(let i = 0; i < letterIndicies.length; i++){
        concealedSpans[letterIndicies[i]].innerHTML = letterGuess;
    
    }
}

function addIncorrectGuess(letterGuess){
    
    const span = document.createElement("span");
    const guess = document.createTextNode(letterGuess);
    span.appendChild(guess);

    guessedLetters.appendChild(span);
}

function checkEndOfGame(concealedSpans, guessCount){

    // check for win
    let tally = 0;

    for(let i = 0; i < wordToGuess.length; i++){

        if(concealedSpans[i]?.innerHTML === ""){
            tally += 1;
           
        }
    }

    if(tally === 0){
        setTimeout(function() {
            window.alert("Hooray!  You win!");
        }, 9)
    }

    // check for loss
    if (guessCount >= 6){
        setTimeout(function() {
            window.alert("You Lose :(");
          }, 9)
    }
}



function showBodyPart(guessCount) {

    let bodyParts = ["head-photo", "torso-photo", "right-arm-photo", "left-arm-photo", "right-leg-photo", "chicken-leg-photo"];

   const part = document.getElementById(bodyParts[guessCount - 1]);

    part.classList.remove("invisible");
    part.classList.add("visible");
}




playAgain.onclick = function () {

    concealedWordElement.innerHTML = '<span class = "word"></span><span class = "word"></span><span class = "word"></span><span class = "word"></span><span class = "word"></span>';

    wordToGuess = "";

    letters = guessedLetters.querySelectorAll("span");

    letters.forEach(function (letter) {
        letter.remove();
    })

    // hide the body parts
    let bodyPhotos = document.querySelectorAll(".body-photo");

    bodyPhotos.forEach(function (part){
        part.classList.remove("visible");
        part.classList.add("invisible");
        console.log("in here");
    })
}