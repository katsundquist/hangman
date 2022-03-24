const submitWordToGuess = document.getElementById("word-in");
const submitLetterGuess = document.getElementById("letter-in");
const concealedWordElement = document.getElementById("word-in-play");
const guessedLetters = document.getElementById("guessed-letters");
let wordToGuess;
let letterGuess;
//let concealedWord = "";


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

    setGuess();

    let blah = compareGuess();  // give this a less shitty name.
    if(blah){
        addCorrectGuess(concealedSpans);
    } else {
        addIncorrectGuess();
        guessCount = guessedLetters.querySelectorAll("span").length;
        showBodyPart(guessCount);
    }

    checkEndOfGame(concealedSpans, guessCount);
});

function setGuess() {
    const letterGuessElement = document.getElementById("guess");
    letterGuess = letterGuessElement.value;

    letterGuessElement.value = '';
}

function compareGuess(){

    letterGuess = letterGuess.toLowerCase();
    console.log(letterGuess);

    if(wordToGuess.includes(letterGuess)){
        return true;
    } else {
        return false;
    }
}

function addCorrectGuess(concealedSpans){

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

function addIncorrectGuess(){
    
    const span = document.createElement("span");
    const guess = document.createTextNode(letterGuess);
    span.appendChild(guess);

    guessedLetters.appendChild(span);
}

function checkEndOfGame(concealedSpans, guessCount){
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


var playAgain = document.getElementById("play-again");

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