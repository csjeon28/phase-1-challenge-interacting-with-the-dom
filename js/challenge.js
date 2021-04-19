//inputs
const counter = document.getElementById('counter')
const minusBtn = document.getElementById('minus')
const plusBtn = document.getElementById('plus')
const heartBtn = document.getElementById('heart')
const pauseBtn = document.getElementById('pause')
const commentBtn = document.getElementById('submit')
const commentForm = document.getElementById("comment-form")
const commentList = document.getElementById('list')
const heartLikes = document.querySelector('ul.likes')

let counterString = counter.innerText;
let counterValue = parseInt(counterString,10);
let ourLikedValue = 0;

//function that allows counter to increment every second
function runCounter() {
    intervalId = setInterval(incrementCounter, 1000); 
}
runCounter();

//functions to increment, decrement, pause counter
function incrementCounter() {
    counterValue++;
    counter.innerText = counterValue;
    // console.log(counterValue);
}

function decrementCounter() {
    counterValue--;
    counter.innerText = counterValue;
}

function pauseCounter() {
    if (pauseBtn.innerText === "pause") {
        clearInterval(intervalId);
        pauseBtn.innerText = "resume"
    } else {
        runCounter();
        pauseBtn.innerText = "pause"
    }
}

const likesTracker = [];

function addLike() {
    ourLikedValue = counterValue;
    let likedValueFound = false;
    for (const likeObj of likesTracker) {
        if (likeObj.likedValue === ourLikedValue) {
            likeObj.likedCount++;
            likedValueFound = true;
            break;
        } 
    } 
    if (likedValueFound === false) {
        likesTracker.push({likedValue: ourLikedValue, likedCount: 1})
    }
    createLikedEntry(); 
}

function createLikedEntry() {
    heartLikes.innerHTML = ""
    console.log(likesTracker)
    for (const likeObj of likesTracker) {
        const li = document.createElement("li")
        if (likeObj.likedCount === 1) {
            li.innerText = `${likeObj.likedValue} has been liked ${likeObj.likedCount} time.`
        } else {
            li.innerText = `${likeObj.likedValue} has been liked ${likeObj.likedCount} times.`
        } 
        heartLikes.append(li)
    } 
    console.log(heartLikes)
}

// event listeners
minusBtn.addEventListener("click", decrementCounter);
plusBtn.addEventListener("click", incrementCounter);
pauseBtn.addEventListener("click", pauseCounter);
heartBtn.addEventListener("click", addLike);
commentForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const comment = document.getElementById("comment-input").value
    const li = document.createElement("li")
    li.innerText = comment
    commentList.append(li)
    e.target.reset()
})

