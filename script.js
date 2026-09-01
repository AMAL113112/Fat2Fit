// ==========================================
// FAT 2 FIT - MAIN JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    initSmoothScrolling();
    initScrollAnimations();
    initActiveNavigation();
    createScrollProgress();

});

// ==========================================
// SMOOTH SCROLL
// ==========================================

function initSmoothScrolling() {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                e.preventDefault();

                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: "smooth"
                });

            }

        });

    });

}

// ==========================================
// SCROLL ANIMATION
// ==========================================

function initScrollAnimations() {

    const elements = document.querySelectorAll(
        ".hero, .about, .trainer, .services, .gallery, .membership, .fitness, .testimonials, .contact"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: 0.15

    });

    elements.forEach(section => {

        section.classList.add("hidden");

        observer.observe(section);

    });

}

// ==========================================
// ACTIVE NAV LINK
// ==========================================

function initActiveNavigation() {

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;
            const height = section.offsetHeight;

            if (pageYOffset >= top) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

}

// ==========================================
// SCROLL PROGRESS BAR
// ==========================================

function createScrollProgress() {

    const progress = document.createElement("div");

    progress.id = "scroll-progress";

    document.body.appendChild(progress);

    window.addEventListener("scroll", () => {

        const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progressWidth =
            (window.scrollY / totalHeight) * 100;

        progress.style.width = progressWidth + "%";

    });

}

// ==========================================
// FITNESS ASSESSMENT
// ==========================================

const calculateBtn = document.getElementById("calculateBtn");

if (calculateBtn) {

    calculateBtn.addEventListener("click", () => {

        const age = parseInt(document.getElementById("age").value);
        const gender = document.getElementById("gender").value;
        const height = parseFloat(document.getElementById("height").value);
        const weight = parseFloat(document.getElementById("weight").value);
        const goal = document.getElementById("goal").value;

        if (!age || !gender || !height || !weight || !goal) {
            alert("Please fill in all the required fields.");
            return;
        }

        // ==========================
        // BMI
        // ==========================

        const bmi = weight / Math.pow(height / 100, 2);

        let bmiStatus = "";

        if (bmi < 18.5) {
            bmiStatus = "Underweight";
        } else if (bmi < 25) {
            bmiStatus = "Normal";
        } else if (bmi < 30) {
            bmiStatus = "Overweight";
        } else {
            bmiStatus = "Obese";
        }

        // ==========================
        // Calories
        // ==========================

        let calories;

        if (gender === "male") {
            calories = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            calories = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }

        if (goal === "loss") {
            calories -= 500;
        } else if (goal === "gain") {
            calories += 300;
        }

        // ==========================
        // Protein
        // ==========================

        let protein;

        if (goal === "loss") {
            protein = weight * 1.8;
        } else if (goal === "gain") {
            protein = weight * 2.2;
        } else {
            protein = weight * 1.6;
        }

        // ==========================
        // Water
        // ==========================

        const water = weight * 0.035;

        // ==========================
        // Display Results
        // ==========================

        document.getElementById("bmiValue").textContent =
            bmi.toFixed(1);

        document.getElementById("bmiStatus").textContent =
            bmiStatus;

        document.getElementById("caloriesValue").textContent =
            Math.round(calories);

        document.getElementById("proteinValue").textContent =
            Math.round(protein);

        document.getElementById("waterValue").textContent =
            water.toFixed(1);

        // ==========================
        // Diet Plan
        // ==========================

        let dietHTML = "";

        if (goal === "loss") {

            dietHTML = `
                <h4>Weight Loss Plan</h4>

                <ul>
                    <li>Breakfast: Oats + Eggs + Banana</li>
                    <li>Lunch: Brown Rice + Chicken + Vegetables</li>
                    <li>Snack: Apple + Almonds</li>
                    <li>Dinner: Grilled Chicken + Salad</li>
                    <li>Drink at least ${water.toFixed(1)}L water daily.</li>
                </ul>
            `;

        } else if (goal === "gain") {

            dietHTML = `
                <h4>Muscle Gain Plan</h4>

                <ul>
                    <li>Breakfast: Eggs + Oats + Milk</li>
                    <li>Lunch: Rice + Chicken + Vegetables</li>
                    <li>Snack: Peanut Butter Sandwich</li>
                    <li>Dinner: Fish/Chicken + Sweet Potato</li>
                    <li>Consume about ${Math.round(protein)}g protein daily.</li>
                </ul>
            `;

        } else {

            dietHTML = `
                <h4>Maintain Weight</h4>

                <ul>
                    <li>Eat balanced meals.</li>
                    <li>Include fruits and vegetables daily.</li>
                    <li>Maintain regular exercise.</li>
                    <li>Drink ${water.toFixed(1)}L water daily.</li>
                </ul>
            `;

        }

        document.getElementById("dietContent").innerHTML = dietHTML;

    });

}

// ==========================================
// CONTACT FORM - WHATSAPP
// ==========================================

function initContactForm() {

    const contactForm = document.getElementById("contactForm");
    const whatsappBtn = document.getElementById("whatsappBtn");

    if (!contactForm || !whatsappBtn) {
        console.error("WhatsApp form elements not found.");
        return;
    }

    whatsappBtn.addEventListener("click", function () {

        // ==========================================
        // GET FORM VALUES
        // ==========================================

        const name =
            contactForm.querySelector('input[name="Name"]').value.trim();

        const email =
            contactForm.querySelector('input[name="Email"]').value.trim();

        const phone =
            contactForm.querySelector('input[name="Phone"]').value.trim();

        const message =
            contactForm.querySelector('textarea[name="Message"]').value.trim();


        // ==========================================
        // VALIDATION
        // ==========================================

        if (!name || !email || !phone || !message) {

            alert("Please fill in all the fields.");

            return;
        }


        // ==========================================
        // CREATE WHATSAPP MESSAGE
        // ==========================================

        const whatsappMessage =
`━━━━━━━━━━━━━━━━━━━━━━
🏋️ FAT2FIT FITNESS CLUB
━━━━━━━━━━━━━━━━━━━━━━

👤 Name
${name}

📧 Email
${email}

📱 Phone
${phone}

💬 Message
${message}

━━━━━━━━━━━━━━━━━━━━━━
Sent from Fat2Fit Website`;


        // ==========================================
        // WHATSAPP NUMBER
        // ==========================================

        const whatsappNumber = "919744421050";


        // ==========================================
        // CREATE URL
        // ==========================================

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;


        // ==========================================
        // OPEN WHATSAPP
        // ==========================================

        console.log("WhatsApp URL:", whatsappURL);

        window.location.href = whatsappURL;

    });

}
