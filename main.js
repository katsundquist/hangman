const submitWordToGuess = document.getElementById("word-in");
const submitLetterGuess = document.getElementById("letter-in");
const concealedWordElement = document.getElementById("word-in-play");
const guessedLetters = document.getElementById("guessed-letters");
let wordToGuess;
let letterGuess;
let concealedWord = "";

function setWord () {

    const wordToGuessElement = document.getElementById("word-to-guess");
    wordToGuess = wordToGuessElement.value;

    wordToGuessElement.value = '';

    console.log(wordToGuess);

    concealWord();
}

submitWordToGuess.addEventListener('click', setWord);

function concealWord() {

    // so this stuff will make things complicated in the case of multiple word plays
    // at 11:45 before I leave at 12 for the weekend, I wondered to myself,
    // surely, I can use CSS to add space between the letters.
    // I fired up a codepen and of course, it turns out to be true.
    // so that is somehting to look into and consider further down the road.
    const wordLength = wordToGuess.length;

    const letterPlaceholder = "_ "

    for(let i = 0; i < wordLength; i++){
        concealedWord += letterPlaceholder;
    }

    concealedWordElement.innerHTML = concealedWord;
}

function setGuess() {
    const letterGuessElement = document.getElementById("guess");
    letterGuess = letterGuessElement.value;

    letterGuessElement.value = '';

    compareGuess();
}

function compareGuess(){

    letterGuess = letterGuess.toLowerCase();
    console.log(letterGuess);

    if(wordToGuess.includes(letterGuess)){
        addCorrectGuess();
    } else {
        addIncorrectGuess();
    }
}

function addCorrectGuess(){

    let letterIndicies = [];
    for(i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess[i] === letterGuess){
            letterIndicies.push(i * 2);
        }
    }

    for(i = 0; i < letterIndicies.length; i++){
        concealedWord = replaceAtIndex(concealedWord, letterIndicies[i], letterGuess);
        concealedWordElement.innerHTML = concealedWord;
    }

    // checking for a win from here down.  This is gross, and I want to change
    // it when I refactor because this is disgusting.
    let tally = 0;
    for( i = 0; i < concealedWord.length; i++){
        if(concealedWord[i] === "_"){
            tally += 1;
        } 
    }

    if(tally === 0){
        setTimeout(function() {
            window.alert("Hooray!  You win!");
          }, 9)
    }
}

function replaceAtIndex(string, index, newValue) {
    return string.substring(0,index) + newValue + string.substring(index+1);
}

function addIncorrectGuess(){
    
    
    const span = document.createElement("span");
    const guess = document.createTextNode(letterGuess);
    span.appendChild(guess);

    guessedLetters.appendChild(span);
    
    let guessCount = guessedLetters.querySelectorAll("span").length;

    showBodyPart(guessCount);

    if (guessCount >= 6){
        setTimeout(function() {
            window.alert("You Lose :(");
          }, 9)
    }
}

submitLetterGuess.addEventListener('click', setGuess);

function showBodyPart(guessCount) {

    let bodyParts = ["head-photo", "torso-photo", "right-arm-photo", "left-arm-photo", "right-leg-photo", "chicken-leg-photo"];

   const part = document.getElementById(bodyParts[guessCount - 1]);

    part.classList.remove("invisible");
    part.classList.add("visible");
}


var playAgain = document.getElementById("play-again");

playAgain.onclick = function () {

  
    concealedWordElement.innerHTML = "_ _ _ _ _ _";
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


//   // changes the squares background color to white
//   squareList.forEach(function (square) {
//     square.style.backgroundColor = "white";
//     square.innerHTML = "";
//   })
//   single.disabled = false;
//   multi.disabled = false;

}