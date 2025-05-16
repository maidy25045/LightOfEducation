// --- Rain Animation ---
const canvas = document.getElementById("rainCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drops = [];

for (let i = 0; i < 500; i++) {
    drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2,
        d: Math.random() * 2
    });
}

function drawRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00e0ff";
    for (let i = 0; i < drops.length; i++) {
        let d = drops[i];
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
    }
    moveRain();
}

function moveRain() {
    for (let i = 0; i < drops.length; i++) {
        drops[i].y += drops[i].d;
        if (drops[i].y > canvas.height) {
            drops[i].y = 0;
            drops[i].x = Math.random() * canvas.width;
        }
    }
}

setInterval(drawRain, 33);

window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

// --- Floating Books ---
const bookContainer = document.getElementById("bookContainer");
const bookImages = [
    "https://i.postimg.cc/Kz3c1ySC/3312020-removebg-preview.png",
    "https://i.postimg.cc/nr8F7wnr/5946-removebg-preview.png",
    "https://i.postimg.cc/nrvH1YLk/6920933-removebg-preview.png",
    "https://i.postimg.cc/6QR1qHbY/f0b54a36-6f45-4e08-93b0-fc7e2a1f9306-removebg-preview.png",
    "https://i.postimg.cc/Gm65c0K4/r2ux-u9bu-220227-removebg-preview.png",
    "https://i.postimg.cc/nrvH1YLk/6920933-removebg-preview.png"
];



function createFloatingBooks(count = 15) {
    for (let i = 0; i < count; i++) {
        const book = document.createElement("img");
        
        // Choose a random book image
        const randomIndex = Math.floor(Math.random() * bookImages.length);
        book.src = bookImages[randomIndex];

        book.classList.add("floating-book-img");

        book.style.top = Math.random() * 100 + "vh";
        book.style.left = Math.random() * 100 + "vw";

        book.style.animationDuration = (10 + Math.random() * 20) + "s";
        book.style.animationDelay = Math.random() * 5 + "s";

        bookContainer.appendChild(book);
    }
}


createFloatingBooks();

// --- Student Movement ---
document.addEventListener("mousemove", (e) => {
    const student1 = document.querySelector(".student1");
    const student2 = document.querySelector(".student2");
    student1.style.transform = `translate(${e.clientX * 0.02}px, ${e.clientY * 0.02}px)`;
    student2.style.transform = `translate(${e.clientX * -0.02}px, ${e.clientY * 0.02}px)`;
});

document.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    document.querySelector(".student1").style.transform += `translateY(${scrollY * 0.05}px)`;
    document.querySelector(".student2").style.transform += `translateY(${scrollY * 0.05}px)`;
});
