const submitWordToGuess = document.getElementById("word-in");
const submitLetterGuess = document.getElementById("letter-in");
const concealedWordElement = document.getElementById("word-in-play");
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
}

function replaceAtIndex(string, index, newValue) {
    return string.substring(0,index) + newValue + string.substring(index+1);
}

function addIncorrectGuess(){
    const guessedLetters = document.getElementById("guessed-letters");
    
    const span = document.createElement("span");
    const guess = document.createTextNode(letterGuess);
    span.appendChild(guess);

    guessedLetters.appendChild(span);
    
    let guessCount = guessedLetters.querySelectorAll("span").length;

    showBodyPart(guessCount);
}

submitLetterGuess.addEventListener('click', setGuess);

function showBodyPart(guessCount) {

    let bodyParts = ["head-photo", "torso-photo", "right-arm-photo", "left-arm-photo", "right-leg-photo", "chicken-leg-photo"];

   const part = document.getElementById(bodyParts[guessCount - 1]);

    part.classList.remove("invisible");
    part.classList.add("visible");
}