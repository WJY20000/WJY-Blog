// Clock Functionality
function updateClock() {
    const today = new Date();
    let hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    const formatSwitch = document.querySelector(".format-switch-btn");

    let period = hours >= 12 ? "PM" : "AM";
    if (formatSwitch.getAttribute("data-format") === "12") {
        hours = hours % 12 || 12; // Convert to 12-hour format
    }

    document.querySelector(".hours").textContent = String(hours).padStart(2, "0");
    document.querySelector(".minutes").textContent = String(minutes).padStart(2, "0");
    document.querySelector(".seconds").textContent = String(seconds).padStart(2, "0");
    document.querySelector(".period").textContent = period;
}

// Calendar Functionality
function updateDate() {
    const today = new Date();
    const dayNum = today.getDate();
    const dayName = today.toLocaleString("default", { weekday: "long" });
    const monthName = today.toLocaleString("default", { month: "short" });

    document.querySelector(".month-name").textContent = monthName;
    document.querySelector(".day-name").textContent = dayName;
    document.querySelector(".day-num").textContent = dayNum;
}

// Format Toggle
document.querySelector(".format-switch-btn").addEventListener("click", function () {
    this.classList.toggle("active");
    const currentFormat = this.getAttribute("data-format");
    this.setAttribute("data-format", currentFormat === "12" ? "24" : "12");
});

// Dot Menu Toggle
document.querySelector(".dot-menu-btn").addEventListener("click", () => {
    document.querySelector(".dot-menu").classList.toggle("active");
});

// Fetch Random Image from Pexels API
async function fetchRandomImage() {
    const apiKey = "gzvhicFNUflf4fm3rVjcBPwBMj1Ako9yOjroxZ5poi6xZzMeFvzRrWCO";
    const response = await fetch("https://api.pexels.com/v1/search?query=nature&per_page=1", {
        headers: { Authorization: apiKey }
    });
    const data = await response.json();
    const photo = data.photos[0];

    if (photo) {
        document.getElementById("pexels-image").src = photo.src.original;
        document.getElementById("image-source").innerHTML = `图片来源: <a href="${photo.url}" target="_blank">Pexels</a>`;
    }
}

//
