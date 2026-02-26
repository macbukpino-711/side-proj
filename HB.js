const inputName = document.getElementById("input-name");
const btn = document.getElementById("btn");
const letterIcon = document.getElementById("letterIcon");
const letterPanel = document.getElementById("letterPanel");
let confettiStarted = false;
let confettiIntervalId = null;

const hoverSound = new Audio("bleep.mp3");
const exSound = new Audio("explosion.mp3");
const tapSound = new Audio("tap.mp3");
const hb = new Audio("HB.mp3");

letterIcon.addEventListener("click", () => {
    tapSound.play();
});

letterIcon.addEventListener("mouseenter", () => {
    hoverSound.play();
});

inputName.addEventListener("mouseenter", () => {
    hoverSound.play();
});

inputName.addEventListener("keydown", () => {
    const tap = new Audio("tap.mp3");
    tap.play();
});

btn.addEventListener("mouseenter", () => {
    hoverSound.play();
});

btn.addEventListener("click", () => {
    tapSound.play();
})

function createConfetti() {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * 100 + "%";

    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ffa500", "#ff1493"];
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];

    const size = Math.random() * 8 + 4;
    confetti.style.width = size + "px";
    confetti.style.height = size + "px";

    const duration = Math.random() * 3 + 2;
    confetti.style.animationDuration = duration + "s";

    confetti.style.animationDelay = Math.random() * 2 + "s";
    confetti.style.opacity = Math.random() * 0.5 + 0.5;

    document.body.appendChild(confetti);

    setTimeout(() => {
        confetti.remove();
    }, (duration + 2) * 1000);
}

function startConfetti() {
    if (confettiStarted) return;

    confettiStarted = true;

    for (let i = 0; i < 50; i++) {
        setTimeout(createConfetti, i * 50);
    }

    confettiIntervalId = setInterval(createConfetti, 10);
}

function checkName() {
    if (inputName.value === "") {
        alert("NHAP DUNG TEN VAO CHO TOII!!");
    } else if (inputName.value.trim() !== "Vu Thi Phuong Anh") {
        alert("SAI TEN ROI. NHAP LAI DII (VD: Vu Thi Phuong Anh)!!!");
    } else {
        document.getElementsByClassName("menu-container")[0].style.display = "none";
        document.getElementById("h2-heading").style.display = "flex";
        document.getElementsByClassName("mess-container")[0].style.display = "flex";
        document.getElementById("title").textContent = "Happy Birthday To Phuong Anh!!!";
        document.getElementById("hb-img").style.display = "flex";
        document.querySelectorAll(".anhtui").forEach((img) => {
            img.style.display = "block";
        });
        document.body.classList.add("snow-bg");
        exSound.play();
        hb.play();
        
        startConfetti();
    }
}

function openLetter() {
    letterPanel.classList.add("show");
}

function closeLetter() {
    letterPanel.classList.remove("show");
}

btn.addEventListener("click", checkName);
letterIcon.addEventListener("click", openLetter);

document.addEventListener("click", (event) => {
    if (!letterPanel.classList.contains("show")) return;

    const clickedInsidePanel = letterPanel.contains(event.target);
    const clickedLetterButton = letterIcon.contains(event.target);
    if (!clickedInsidePanel && !clickedLetterButton) {
        closeLetter();
    }
});
