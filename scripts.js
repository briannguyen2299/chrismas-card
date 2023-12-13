const candy = document.querySelector(".candy");
const reindeer = document.querySelector(".reindeer");
const coin = document.querySelector(".coin");
const itemView = document.querySelector(".overlay");
const item = document.querySelector(".overlay .item");
const clsBtn = document.querySelector(".close-icon");
const itemName = document.querySelector("span");
const letter = document.querySelector(".area-3");
const star = document.querySelector(".star");
const once = {once: true};

let count = 1;

const bgdSound = new Audio('assets/sounds/background-sound.mp3');
const rwdSound = new Audio('assets/sounds/christmas-reveal-tones.wav');
const ultSound = new Audio('assets/sounds/complete-reward.wav');

bgdSound.addEventListener("canplaythrough", (event) => {bgdSound.play();});
bgdSound.addEventListener('ended', function() {bgdSound.play();});
candy.addEventListener("click", e => display("candy", e.target), once);
reindeer.addEventListener("click", e => display("reindeer", e.target), once);
coin.addEventListener("click", e => display("coin", e.target), once);
clsBtn.addEventListener("click", () => {
    hide();
    count++;
});
star.addEventListener("click", special, once);

window.onload = applyShake();

function display(name, event) {
    rwdSound.play();
    const itemImg = document.createElement("img");
    switch (name) {
        case "candy":
        event.style.backgroundImage = "url('assets/images/red-3.png')";
        item.src = "assets/images/candy.png";
        itemName.textContent = "Kẹo Giáng Sinh";
        itemImg.setAttribute("src", "assets/images/candy.png");
        candy.appendChild(itemImg);
        break;
    
        case "reindeer":
        event.style.backgroundImage = "url('assets/images/green-3.png')";
        item.src = "assets/images/reindeer.png";
        itemName.textContent = "Thú bông tuần lộc";
        itemImg.setAttribute("src", "assets/images/reindeer.png");
        reindeer.appendChild(itemImg);

        break;
    
        case "coin":
        event.style.backgroundImage = "url('assets/images/blue-3.png')";
        item.src = "assets/images/coin.png";
        itemName.textContent = "10.000đ vào ví Momo";
        itemImg.setAttribute("src", "assets/images/coin.png");
        coin.appendChild(itemImg);
        break;
    }
    itemView.style.display = "block";
    itemImg.style.display = "none";
}

function hide() {
    itemView.style.display = "none";
    let itemImg;
    switch (count) {
        case 1:
            itemImg = document.querySelector(".candy img");
            candy.style.backgroundImage = "url('assets/images/red-4.png')";
            break;
        case 2:
            itemImg = document.querySelector(".reindeer img");
            reindeer.style.backgroundImage = "url('assets/images/green-4.png')";
            break;
        case 3:
            itemImg = document.querySelector(".coin img");
            coin.style.backgroundImage = "url('assets/images/blue-4.png')";
            break;
    }
    itemImg.style.display = "block";
}

function special() {
    ultSound.play();
}

function applyShake() {
    star.classList.add('shaking');
}