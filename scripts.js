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
const para = $(".dialogue p");
const nxtBtn = $(".next-icon");
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
}, 2000);

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

    nextIconEffect: {
        transform: [
            "translateY(0)",
            "translateY(-0.2rem)",
            "translateY(0)",
            "translateY(0.2rem)",
            "translateY(0)"
        ],
    },
};

const timing = {
    santaTiming: {
        duration: 2000,
        iterations: 1,
        easing: "cubic-bezier(0.05, 0.5, 0.5, 1.575)",
        delay: 1000,
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
        easing: "ease-out",
        fill: "forwards"
    },

    nextIconTiming: {
        duration: 2000,
        iterations: "Infinity",
        easing: "linear",
        fill: "none"
    }
};

let namePerson;

// II. XỬ LÝ SỰ KIỆN

// 1. Âm thanh
bgdSound.onended = () => bgdSound.play();
rwdSound.onended = () => bgdSound.volume = 1;
ultSound.onended = () => bgdSound.volume = 1;

// 2. Ngôi sao
star.addEventListener("click", special, once);

// 3. Hộp quà
presents.forEach(present => {
    present.addEventListener("mouseenter", (e) => {
        e.target.animate(effect.presentHover, timing.presentTiming);
    });

    present.addEventListener("mouseleave", (e) => {
        e.target.style.animation = 'none';
        e.target.animate(
            {scale: [1.2,1]}, 
            {
            duration: 50,
            iterations: 1,
            easing: "ease-out",
            fill: "forwards"
            }
        );
    });

    present.addEventListener("click", (e) => display(e.target.classList.item(1), e.target), once);
});

nxtBtn.addEventListener("click", () => {
    para.textContent = "Nhập tên của bạn dưới đây:";
    const input = document.createElement("input");
    const btn = document.createElement("button");
    btn.textContent = "Xác nhận";
    input.setAttribute("type","text");
    para.appendChild(input);
    para.appendChild(btn);

    btn.addEventListener("click", () => {
        namePerson = input.value;
        para.removeChild(input);
        para.removeChild(btn);
        para.textContent = `${namePerson} thân mến, chúc mừng giáng sinh.`;
        nxtBtn.style.display = "none";
    }, once);
}, once);

// 4. Khi website tải xong
window.addEventListener("load", () => {
    star.animate(effect.starShaking, timing.starTiming);
    setTimeout(showElement, 1000);
});

// III. ĐỊNH NGHĨA HÀM

// 1. Tạo giao diện hộp quà
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
        break;
    
        case "reindeer":
        event.style.backgroundImage = "url('assets/images/green-3.png')";
        item.src = "assets/images/reindeer.png";
        itemName.textContent = "Thú bông tuần lộc";
        itemImg.setAttribute("src", "assets/images/reindeer.png");
        break;
    
        case "coin":
        event.style.backgroundImage = "url('assets/images/blue-3.png')";
        item.src = "assets/images/coin.png";
        itemName.textContent = "10.000đ vào ví Momo";
        itemImg.setAttribute("src", "assets/images/coin.png");
        break;
    }
    event.appendChild(itemImg);
    itemView.style.display = "block";

    const theEvent = event;
    clsBtn.addEventListener("click", () => {
        itemView.style.display = "none";
        itemImg.style.display = "block";
        switch (name) {
            case "candy":
            theEvent.style.backgroundImage = "url('assets/images/red-4.png')";
            break;
            case "reindeer":
            theEvent.style.backgroundImage = "url('assets/images/green-4.png')";
            break;
            case "coin":
            theEvent.style.backgroundImage = "url('assets/images/blue-4.png')";
            break;
        }
    }, once);
}

// 
function special() {
    bgdSound.volume = 0.25;
    ultSound.play();
}

// Giao diện dialog box
function showElement() {
    dialogue.style.visibility = "visible";
    dialogue.animate(effect.dialogueAppear, timing.dialogueTiming).finished
    .then(() => santa.animate(effect.santaSpinning, timing.santaTiming))
    .then(() => {
        setTimeout(() => {
            para.classList.replace('hidden', 'visible');
        }, 2000);
    })
    .then(() => {
        setTimeout(() => {
            nxtBtn.classList.replace('hidden', 'visible');
            setTimeout(() => {
                nxtBtn.animate(effect.nextIconEffect, timing.nextIconTiming);
            }, 5000);
        }, 5000);
    })
    .catch(error => console.error(`Error animating: ${error}`));
}