const submitGuess = document.getElementById("word-in");
let wordToGuess;

function setWord () {

    const wordToGuessElement = document.getElementById("word-to-guess")
    wordToGuess = wordToGuessElement.value;
    //console.log("in setWord", wordToGuess.length);

    wordToGuessElement.value = '';

    concealWord();
}


submitGuess.addEventListener('click', setWord);
console.log("boo");


function concealWord() {

    const wordLength = wordToGuess.length;

    const letterPlaceholder = "_ "

    let concealedWord = "";

    for(let i = 0; i < wordLength; i++){
        concealedWord += letterPlaceholder;
    }

    console.log("after loop", concealedWord);

    const concealedWordElement = document.getElementById("word-in-play");

    concealedWordElement.innerHTML = concealedWord;
}

// Guessing:  letter present, letter not present
// letter present: change the visual represnation of the word to 
//      display guessed letter
// letter not present: 
//      display letter in letter graveyard
//      display body part


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