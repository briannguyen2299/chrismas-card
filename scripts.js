const candy = document.querySelector(".candy");
const reindeer = document.querySelector(".reindeer");
const coin = document.querySelector(".coin");
const itemView = document.querySelector(".overlay");
const item = document.querySelector(".overlay .item");
const clsBtn = document.querySelector(".close-icon");
const itemName = document.querySelector("span");
const letter = document.querySelector(".area-3");

let bgdSound = new Audio();
let rwdSound = new Audio();
let ultSound = new Audio();

bgdSound.src = 'assets/sounds/background-sound.mp3';
rwdSound.src = 'assets/sounds/christmas-reveal-tones.wav'
ultSound.src = 'assets/sounds/complete-reward.wav';

window.onload = setInterval(playMusic, 1000 / 10); //10fps

candy.addEventListener("click", (e) => {display("candy",e.target)});
reindeer.addEventListener("click", (e) => {display("reindeer",e.target)});
coin.addEventListener("click", (e) => {display("coin",e.target)});
clsBtn.addEventListener("click", hide);

function display(name,event) {
    rwdSound.play();
    switch (name) {
        case "candy":
        event.style.backgroundImage = "url('assets/images/red-3.png')";
        item.src = "assets/images/candy.png";
        itemName.textContent = "Kẹo Giáng Sinh";
        break;
    
        case "reindeer":
        event.style.backgroundImage = "url('assets/images/green-3.png')";
        item.src = "assets/images/reindeer.png";
        itemName.textContent = "Thú bông tuần lộc";
        break;
    
        case "coin":
        event.style.backgroundImage = "url('assets/images/blue-3.png')";
        item.src = "assets/images/coin.png";
        itemName.textContent = "10.000đ vào ví Momo";
        break;
    }
    itemView.style.display = "block";
}

function hide() {
    itemView.style.display = "none";
}

function playMusic() {
    bgdSound.play();
    if (bgdSound.paused == true) {
        bgdSound.play();
    }
}
