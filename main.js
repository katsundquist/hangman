const submitWordToGuess = document.getElementById("word-in");
const submitLetterGuess = document.getElementById("letter-in");
const concealedWordElement = document.getElementById("word-in-play");
const guessedLetters = document.getElementById("guessed-letters");
//let concealedSpans = document.querySelectorAll(".word");
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

    // there is a problem in here.  When you reset the page, it goes to the default
    // amount of spaces specified in the reset.  But when you add a new word, it
    // seems to put the empty boxes at the front of the series of boxes

    concealedWord = "";

    const wordLength = wordToGuess.length;

    const letterPlaceholder = "<span class = 'word'></span>"//"_ "

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
            letterIndicies.push(i);
        }
    }

    // get array-like-object of span elements
    let concealedSpans = document.querySelectorAll(".word");

    for(let i = 0; i < letterIndicies.length; i++){
        concealedSpans[letterIndicies[i]].innerHTML = letterGuess;
    
    }

    // check inside spans to see if there is text or not 
    // if there is text in all spans, signal win
    // if not, continue

    let tally = 0;

    //console.log(typeof(concealedSpans), "concealed spans");
    // when if does not include ?, I get this error:
    // main.js:84 Uncaught TypeError: Cannot read properties of undefined (reading 'innerHTML')
    // tried so far:  firstChild, childNodes
    // when if includes ?, it loops in the for loop 100+ times, 
    // but it will eventually hit the check for the win condition
    for(let i = 0; i < wordToGuess.length; i++){

        //console.log(typeof(concealedSpans[i].innerHTML), "in concealed word");
        //console.log(concealedSpans[i].innerHTML, "in concealed word")

        if(concealedSpans[i]?.innerHTML === ""){ // it loops like 100 times in the for
            tally += 1;
            //console.log(typeof(concealedSpans[i]), "in if statement");
            //console.log(typeof(concealedSpans[i].innerHTML), "innerHTML");
           
        }
        console.log(tally, "in for");
    }

    console.log(tally, "outside of for loop");
    if(tally === 0){
        setTimeout(function() {
            window.alert("Hooray!  You win!");
        }, 9)
    }

    // // this no longer works with the spans
    // // checking for a win from here down.  This is gross, and I want to change
    // // it when I refactor because this is disgusting.
    // let tally = 0;
    // for( i = 0; i < concealedWord.length; i++){
    //     if(concealedWord[i] === "_"){
    //         tally += 1;
    //     } 
    // }

    // if(tally === 0){
    //     setTimeout(function() {
    //         window.alert("Hooray!  You win!");
    //       }, 9)
    // }
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


    // this also needs to change

    concealedWordElement.innerHTML = '<span class = "word"></span><span class = "word"></span><span class = "word"></span><span class = "word"></span><span class = "word"></span>';


    wordToGuess = "";


    // this needs changing.
    letters = guessedLetters.querySelectorAll("span");

    letters.forEach(function (letter) {
        letter.remove();
    })

    /*
    concealedSpans.forEach(function (concealedSpan) {
        concealedSpan.remove();
    })

*/

    // hide the body parts
    let bodyPhotos = document.querySelectorAll(".body-photo");

    bodyPhotos.forEach(function (part){
        part.classList.remove("visible");
        part.classList.add("invisible");
        console.log("in here");
    })


}