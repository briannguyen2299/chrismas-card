const box1 = document.querySelector(".present.box-1");
const box2 = document.querySelector(".present.box-2");
const box3 = document.querySelector(".present.box-3");

const container = document.querySelector(".area-1");
const itemView1 = document.querySelector("#item-1");
const itemView2 = document.querySelector("#item-2");
const itemView3 = document.querySelector("#item-3");

function checkDisplay(name) {
    switch (name) {
        case "box-1":
        itemView1.style.display = "block";
        box1.style.backgroundImage = "url('assets/images/red-3.png')";
        break;
    
        case "box-2":
        itemView2.style.display = "block";
        box2.style.backgroundImage = "url('assets/images/green-3.png')";
        break;
    
        case "box-3":
        itemView3.style.display = "block";
        box3.style.backgroundImage = "url('assets/images/blue-3.png')";
        break;
    }
}

function removeAndDisplay(name) {
    switch (name) {
        case "item-1":
        container.removeChild(itemView1);
        break;
    
        case "item-2":
        container.removeChild(itemView2);
        break;
    
        case "item-3":
        container.removeChild(itemView3);
        break;
    }
}

window.onload = setInterval(playMusic, 1000 / 10); //10fps

let myAudio = new Audio();

myAudio.src = 'assets/sounds/background-sound.mp3';

function playMusic() {
    myAudio.play();
    if (myAudio.paused == true) {
        myAudio.play();
    }
}