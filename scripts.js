// I. KHAI BÁO BIẾN
const $ = selector => document.querySelector(selector);

// 1. Chọn phần tử trong document
const candy = $(".candy");
const reindeer = $(".reindeer");
const coin = $(".coin");
const presents = document.querySelectorAll(".present");
const itemView = $(".overlay");
const item = $(".overlay .item");
const clsBtn = $(".close-icon");
const itemName = $("span");
const dialogue = $(".area-2");
const santa = $(".santa img");
const letter = $(".area-3");
const star = $(".star");

// 2. Tạo audio
const bgdSound = new Audio('assets/sounds/background-sound.mp3');
const rwdSound = new Audio('assets/sounds/christmas-reveal-tones.wav');
const ultSound = new Audio('assets/sounds/complete-reward.wav');
const once = {once: true};

// 3. Tự động chơi nhạc nền
let playAttempt = setInterval(() => {
    bgdSound
      .play()
      .then(() => {
        clearInterval(playAttempt);
      })
      .catch((error) => {
        console.log("Unable to play the video, User has not interacted yet.");
      });
}, 3000);

// 4. Biến dùng cho animation
const effect = {
    santaSpinning: [
        { transform: "translate(0) rotate(0)", opacity: 0 },
        { transform: "translate(70%) rotate(25deg)", opacity: 1}
    ],

    dialogueAppear: [
        { transform: "translate(-110%)" },
        { transform: "translate(0)" }
    ],

    starShaking: [
        {transform: "rotate(0deg)"},
        {transform: "rotate(-10deg)"},
        {transform: "rotate(0deg)"},
        {transform: "rotate(10deg)"},
        {transform: "rotate(0deg)"},
    ],

    presentHover: {
        scale: [1,1.2],
        transform: [
            "rotate(0deg)",
            "rotate(-10deg)",
            "rotate(0deg)",
            "rotate(10deg)",
            "rotate(0deg)"
        ],
    },
};

const timing = {
    santaTiming: {
        duration: 3000,
        iterations: 1,
        easing: "cubic-bezier(0.05, 0.5, 0.5, 1.575)",
        fill: "forwards",
    },

    dialogueTiming: {
        duration: 500,
        iterations: 1,
        easing: "ease-out",
        fill: "forwards"
    },

    starTiming: {
        duration: 1000,
        iterations: "Infinity",
        easing: "linear",
        fill: "none"
    },

    presentTiming: {
        duration: 500,
        iterations: 1,
        easing: "linear",
        fill: "forwards"
    },
};

// 5. Các biến khác
let count = 1;

// II. XỬ LÝ SỰ KIỆN

// 1. Hiệu ứng âm thanh
bgdSound.onended = () => bgdSound.play();
rwdSound.onended = () => bgdSound.volume = 1;
ultSound.onended = () => bgdSound.volume = 1;

// 2. Click vào hộp quà
candy.addEventListener("click", e => display("candy", e.target), once);
reindeer.addEventListener("click", e => display("reindeer", e.target), once);
coin.addEventListener("click", e => display("coin", e.target), once);
star.addEventListener("click", special, once);

// 3. Đóng giao diện hộp quà
clsBtn.addEventListener("click", () => {
    hide();
    count++;
});

// 4. Hiệu ứng khi hover vào hộp quà
presents.forEach(present => {
    present.addEventListener("mouseenter", (e) => {
        e.target.animate(effect.presentHover, timing.presentTiming);
    });

    present.addEventListener("mouseleave", (e) => {
        e.target.style.animation = 'none';
        e.target.animate(
            {scale: [1.2,1]}, 
            {
            duration: 100,
            iterations: 1,
            easing: "linear",
            fill: "forwards"
            }
        );
    });
});

// 5. Code chạy sau khi trang tải xong
window.addEventListener("load", () => {
    star.animate(effect.starShaking, timing.starTiming);
    setTimeout(showElement, 1000);
});

// III. ĐỊNH NGHĨA HÀM

// 1. Hiện giao diện hộp quà
function display(name, event) {
    bgdSound.volume = 0.25;
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

// 1. Đóng giao diện hộp quà
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
// 
function special() {
    bgdSound.volume = 0.25;
    ultSound.play();
}

// Hiệu ứng xuất hiện
function showElement() {
    dialogue.style.display = "block";
    dialogue.animate(effect.dialogueAppear, timing.dialogueTiming);
    setTimeout(() => {
        santa.animate(effect.santaSpinning, timing.santaTiming);
    }, 2000);
}