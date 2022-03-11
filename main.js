const submitWordToGuess = document.getElementById("word-in");
const submitLetterGuess = document.getElementById("letter-in");
const concealedWordElement = document.getElementById("word-in-play");
let wordToGuess;
let letterGuess;
let concealedWord = "";

function setWord () {

    const wordToGuessElement = document.getElementById("word-to-guess");
    wordToGuess = wordToGuessElement.value;
    //console.log("in setWord", wordToGuess.length);

    wordToGuessElement.value = '';

    console.log(wordToGuess);

    concealWord();
}


submitWordToGuess.addEventListener('click', setWord);


function concealWord() {

    const wordLength = wordToGuess.length;

    const letterPlaceholder = "_ "

    for(let i = 0; i < wordLength; i++){
        concealedWord += letterPlaceholder;
    }

    concealedWordElement.innerHTML = concealedWord;
}

// Guessing:  letter present, letter not present
// letter present: change the visual represnation of the word to 
//      display guessed letter
// letter not present: 
//      display letter in letter graveyard
//      display body part

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
        console.log("SPLAT");
    }
}

function addCorrectGuess(){
    console.log(wordToGuess);
    console.log(concealedWord);


    // _ are at even indicies
    let letterIndicies = [];
    for(i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess[i] === letterGuess){
            letterIndicies.push(i * 2);
        }
    }

    console.log(letterIndicies);

    for(i = 0; i < letterIndicies.length; i++){
        concealedWord = replaceAtIndex(concealedWord, letterIndicies[i], letterGuess);
        concealedWordElement.innerHTML = concealedWord;
    }
    console.log(concealedWord);
}

function replaceAtIndex(string, index, newValue) {
    return string.substring(0,index) + newValue + string.substring(index+1);
}



submitLetterGuess.addEventListener('click', setGuess);

let bodyParts = document.querySelectorAll(".body-photo");

bodyParts.forEach(function (part){
    part.addEventListener('click', showBodyPart);
})

function showBodyPart(event) {
   console.log(event);
   const part = event.target;

   console.log(part);

   part.classList.remove("invisible");
   part.classList.add("visible");
}