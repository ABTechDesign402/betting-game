const timerElement = document.getElementById("timer-prompt");
const winnerPrompt = document.getElementById("winner-prompt");
const betBoxes = document.querySelectorAll(".bet-box");
const startBettingPrompt = document.getElementById("start-betting-prompt");
const stopBettingPrompt = document.getElementById("stop-betting-prompt");
const animationContainer = document.getElementById("animation-container");
const outerBoxes = document.querySelectorAll(".team-box");

let countdown;
const winningSequence = [1, 6, 0, 7, 4, 5, 2, 3];
let sequenceIndex = 0;

function showPrompt(promptElement, text = "") {
    if (text) {
        promptElement.textContent = text;
    }
    promptElement.style.animation = "fadeInOut 2s forwards";
    setTimeout(() => {
        promptElement.style.animation = "";
    }, 2000);
}

function startCountdown() {
    countdown = 10;
    timerElement.textContent = `${countdown}s`;

  
    betBoxes.forEach(box => {
        box.style.backgroundColor = "#FF7043"; 
        box.style.boxShadow = "0px 0px 15px rgba(255, 213, 79, 0.8)"; 
    });

    showPrompt(startBettingPrompt);

    const countdownInterval = setInterval(() => {
        countdown--;
        timerElement.textContent = `${countdown}s`;

        if (countdown === 0) {
            clearInterval(countdownInterval);
            showPrompt(stopBettingPrompt);

            setTimeout(() => {
                startOvalAnimation(() => {
                    declareWinner();
                    setTimeout(() => {
                        startCountdown();
                    }, 5000);
                });
            }, 2000);
        }
    }, 1000);
}

function startOvalAnimation(callback) {
    let loopCount = 0;
    let index = 0;

    const animationInterval = setInterval(() => {
        if (index > 0) {
            outerBoxes[index - 1].style.boxShadow = "inset 0px 0px 15px rgba(255, 213, 79, 0.8)"; 
        } else if (loopCount > 0) {
            outerBoxes[outerBoxes.length - 1].style.boxShadow = "inset 0px 0px 15px rgba(255, 213, 79, 0.8)"; 
        }

 
        outerBoxes[index].style.boxShadow = "inset 0px 0px 30px rgba(0, 255, 255, 1)"; 

        index = (index + 1) % outerBoxes.length;

        if (index === 0) {
            loopCount++;
        }

        if (loopCount === 2) {
            clearInterval(animationInterval);
            outerBoxes.forEach(box => {
                box.style.boxShadow = "inset 0px 0px 15px rgba(255, 213, 79, 0.8)"; 
            });
            if (callback) callback();
        }
    }, 200);
}

function declareWinner() {
    const winnerIndex = winningSequence[sequenceIndex];
    const winningBox = betBoxes[winnerIndex];

    showPrompt(winnerPrompt, `Winner: ${winningBox.textContent}`);
    winningBox.style.backgroundColor = "#AB47BC"; 
    winningBox.style.boxShadow = "0px 0px 25px rgba(171, 71, 188, 0.8)"; 

    sequenceIndex = (sequenceIndex + 1) % winningSequence.length;
}

startCountdown();