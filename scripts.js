// I. KHAI BÁO BIẾN
const $ = selector => document.querySelector(selector);

// 1. Chọn phần tử trong document
const candy = $(".candy");
const reindeer = $(".reindeer");
const coin = $(".coin");
const presents = document.querySelectorAll(".present");
const itemView = $(".overlay");
const nxtStep = $(".next-step");
const pvsStep = $(".previous-step");
const item = $(".overlay .item");
const clsBtn = $(".close-icon");
const itemName = $(".item-name");
const speech = $(".speech");
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
        console.log("Unable to play the audio, User has not interacted yet.");
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
        {transform: "scale(1) rotate(0deg)"},
        {transform: "scale(1.2) rotate(90deg)"},
        {transform: "scale(1) rotate(180deg)"},
        {transform: "scale(0.8) rotate(270deg)"},
        {transform: "scale(1) rotate(360deg)"},
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
        duration: 5000,
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
        delay: 2000,
        fill: "none"
    }
};

let count = 0;

// II. XỬ LÝ SỰ KIỆN

// 1. Âm thanh
bgdSound.onended = () => bgdSound.play();
rwdSound.onended = () => bgdSound.volume = 1;
ultSound.onended = () => bgdSound.volume = 1;

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

dialogue.addEventListener("click", () => {
    para.classList.replace('visible', 'hidden');
    para.textContent = "Nhập tên của bạn dưới đây:";
    const input = document.createElement("input");
    const btn = document.createElement("button");
    btn.textContent = "Xác nhận";
    input.setAttribute("type","text");
    input.classList.add('hidden');
    btn.classList.add('hidden');
    para.appendChild(input);
    para.appendChild(btn);
    setTimeout(() => {
        para.classList.replace('hidden', 'visible');
        input.classList.replace('hidden', 'visible');
        btn.classList.replace('hidden', 'visible');
    }, 1000);
    nxtBtn.style.display = "none";

    btn.addEventListener("click", () => {
        const namePerson = input.value;
        para.removeChild(input);
        para.removeChild(btn);
        para.classList.replace('visible', 'hidden');
        if (namePerson === "") {
            para.textContent = "Giáng Sinh vui vẻ.";
        } else {
            para.textContent = `${namePerson} thân mến, Giáng Sinh vui vẻ.`;
        }
        setTimeout(() => {
            para.classList.replace('hidden', 'visible');
        }, 1000);
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
    itemView.classList.replace('hidden', 'visible');

    const theEvent = event;
    clsBtn.addEventListener("click", () => {
        itemView.classList.replace('visible', 'hidden');
        itemImg.style.display = "block";
        setTimeout(() => itemView.style.display = "none", 1000);
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
        count++;

        if (count > 2) {
            star.addEventListener("click", special, once);
            speech.style.display = "block";
            setTimeout(() => {
            speech.classList.replace('hidden', 'visible');
            speech.animate(effect.nextIconEffect, timing.nextIconTiming);
            }, 1000);
        }
    }, once);
}

// 
function special() {
    bgdSound.volume = 0.25;
    ultSound.play();
    nxtStep.style.display = "block";
    pvsStep.style.display = "block";
    setTimeout(() => {
        nxtStep.classList.replace('hidden', 'visible');
        nxtStep.addEventListener("click", () => letter.scrollIntoView({ behavior: 'smooth' }));
        nxtStep.animate(effect.nextIconEffect, timing.nextIconTiming);
        letter.style.display = "block";
        letter.scrollIntoView({ behavior: 'smooth' });
        pvsStep.classList.replace('hidden', 'visible');
        pvsStep.addEventListener("click", () => $(".area-1").scrollIntoView({ behavior: 'smooth' }));
        pvsStep.animate(effect.nextIconEffect, timing.nextIconTiming);
    }, 1000);
}

// Giao diện dialog box
function showElement() {
    dialogue.style.visibility = "visible";
    dialogue.animate(effect.dialogueAppear, timing.dialogueTiming).finished
    .then(() => santa.animate(effect.santaSpinning, timing.santaTiming))
    .then(() => {
        setTimeout(() => {
            para.classList.replace('hidden', 'visible');
        }, 3000);
    })
    .then(() => {
        setTimeout(() => {
            nxtBtn.classList.replace('hidden', 'visible');
            nxtBtn.animate(effect.nextIconEffect, timing.nextIconTiming);
        }, 5000);
    })
    .catch(error => console.error(`Error animating: ${error}`));
}