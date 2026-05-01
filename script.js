// ---------------- DARK MODE ----------------
const toggleBtn = document.getElementById("darkModeToggle");

if (toggleBtn) {
    // Load saved mode
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark");
    }

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });
}

// ---------------- CONTACT FORM ----------------
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // STOP page reload

        let firstName = document.getElementById("firstname").value.trim();
        let lastName = document.getElementById("lastname").value.trim();
        let email = document.getElementById("email").value.trim();
        let message = document.getElementById("message").value.trim();

        // Validation
        if (firstName === "" || lastName === "" || email === "" || message === "") {
            alert("Please fill all required fields!");
            return;
        }

        if (!email.includes("@")) {
            alert("Enter a valid email!");
            return;
        }


        alert("✅ Message Sent Successfully!");

        contactForm.reset();
    });
}
// ---------------- TICKET Booking ----------------

let selectedPrice = 20000;
let selectedPlace = "Paris";

function selectDestination(el, place, price) {
    document.querySelectorAll(".dest-card").forEach(c => c.classList.remove("active"));
    el.classList.add("active");

    selectedPlace = place;
    selectedPrice = price;

    updatePrice();
}

function updatePrice() {
    let days = document.getElementById("days").value || 1;
    let people = document.getElementById("people").value || 1;

    let base = selectedPrice;
    let calc = base * days * people;
    let tax = calc * 0.05;
    let total = calc + tax;

    document.getElementById("rate").innerText = "₹" + base;
    document.getElementById("calc").innerText = "₹" + calc;
    document.getElementById("tax").innerText = "₹" + tax;
    document.getElementById("total").innerText = "₹" + total;
}

document.getElementById("days").addEventListener("input", updatePrice);
document.getElementById("people").addEventListener("input", updatePrice);

document.getElementById("ticketForm").addEventListener("submit", function(e){
    e.preventDefault();

    let name = document.getElementById("userName").value;

    document.getElementById("confirmation").innerHTML = `
    <h3>✅ Booking Confirmed</h3>
    <p>${name}</p>
    <p>${selectedPlace}</p>
    <p>Total Paid: ${document.getElementById("total").innerText}</p>
    `;

    let plans = {
        Paris: ["Eiffel Tower","Louvre","Seine Cruise","Shopping","Dinner"],
        Santorini: ["Beach","Sunset","Boat","Wine","Walk"],
        Tokyo: ["Shibuya","Temple","Anime","Food","Shopping"],
        China: ["Great Wall","City Tour","Market","Temple","Food"]
    };

    let days = document.getElementById("days").value;

    let html = "<h3>📍 Your Tour Plan</h3><ul>";
    for(let i=0;i<days;i++){
        html += `<li>Day ${i+1}: ${plans[selectedPlace][i % 5]}</li>`;
    }
    html += "</ul>";

    document.getElementById("itinerary").innerHTML = html;
});