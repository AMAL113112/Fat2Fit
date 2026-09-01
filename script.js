// ==========================================
// FAT 2 FIT - MAIN JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    initSmoothScrolling();
    initScrollAnimations();
    initActiveNavigation();
    createScrollProgress();
    initFitnessAssessment();
    initContactForm();

});


// ==========================================
// SMOOTH SCROLL
// ==========================================

function initSmoothScrolling() {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") {
                return;
            }

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

    if (!elements.length) {
        return;
    }

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

    if (!sections.length || !navLinks.length) {
        return;
    }

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;

            if (window.scrollY >= top) {
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

        if (totalHeight <= 0) {
            return;
        }

        const progressWidth =
            (window.scrollY / totalHeight) * 100;

        progress.style.width = progressWidth + "%";

    });

}


// ==========================================
// FITNESS ASSESSMENT
// ==========================================

function initFitnessAssessment() {

    const calculateBtn =
        document.getElementById("calculateBtn");


    if (!calculateBtn) {

        console.error("Calculate button not found!");

        return;

    }


    calculateBtn.addEventListener("click", () => {

        // ==========================================
        // GET INPUT VALUES
        // ==========================================

        const ageInput =
            document.getElementById("age");

        const genderInput =
            document.getElementById("gender");

        const heightInput =
            document.getElementById("height");

        const weightInput =
            document.getElementById("weight");

        const goalInput =
            document.getElementById("goal");


        if (
            !ageInput ||
            !genderInput ||
            !heightInput ||
            !weightInput ||
            !goalInput
        ) {

            console.error(
                "Fitness assessment fields are missing."
            );

            return;

        }


        const age =
            parseInt(ageInput.value);

        const gender =
            genderInput.value;

        const height =
            parseFloat(heightInput.value);

        const weight =
            parseFloat(weightInput.value);

        const goal =
            goalInput.value;


        // ==========================================
        // VALIDATION
        // ==========================================

        if (
            !age ||
            !gender ||
            !height ||
            !weight ||
            !goal
        ) {

            alert(
                "Please fill in all the required fields."
            );

            return;

        }


        // ==========================================
        // BMI
        // ==========================================

        const bmi =
            weight / Math.pow(height / 100, 2);

        let bmiStatus;


        if (bmi < 18.5) {

            bmiStatus = "Underweight";

        } else if (bmi < 25) {

            bmiStatus = "Normal";

        } else if (bmi < 30) {

            bmiStatus = "Overweight";

        } else {

            bmiStatus = "Obese";

        }


        // ==========================================
        // CALORIES
        // ==========================================

        let calories;


        if (gender === "male") {

            calories =
                (10 * weight) +
                (6.25 * height) -
                (5 * age) +
                5;

        } else {

            calories =
                (10 * weight) +
                (6.25 * height) -
                (5 * age) -
                161;

        }


        if (goal === "loss") {

            calories -= 500;

        } else if (goal === "gain") {

            calories += 300;

        }


        // ==========================================
        // PROTEIN
        // ==========================================

        let protein;


        if (goal === "loss") {

            protein = weight * 1.8;

        } else if (goal === "gain") {

            protein = weight * 2.2;

        } else {

            protein = weight * 1.6;

        }


        // ==========================================
        // WATER
        // ==========================================

        const water =
            weight * 0.035;


        // ==========================================
        // DISPLAY RESULTS
        // ==========================================

        const bmiValue =
            document.getElementById("bmiValue");

        const bmiStatusElement =
            document.getElementById("bmiStatus");

        const caloriesValue =
            document.getElementById("caloriesValue");

        const proteinValue =
            document.getElementById("proteinValue");

        const waterValue =
            document.getElementById("waterValue");

        const dietContent =
            document.getElementById("dietContent");


        if (bmiValue) {

            bmiValue.textContent =
                bmi.toFixed(1);

        }


        if (bmiStatusElement) {

            bmiStatusElement.textContent =
                bmiStatus;

        }


        if (caloriesValue) {

            caloriesValue.textContent =
                Math.round(calories);

        }


        if (proteinValue) {

            proteinValue.textContent =
                Math.round(protein);

        }


        if (waterValue) {

            waterValue.textContent =
                water.toFixed(1);

        }


        // ==========================================
        // DIET PLAN
        // ==========================================

        let dietHTML;


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


        if (dietContent) {

            dietContent.innerHTML =
                dietHTML;

        }

    });

}


// ==========================================
// CONTACT FORM - WHATSAPP
// ==========================================

function initContactForm() {

    const contactForm =
        document.getElementById("contactForm");


    if (!contactForm) {

        console.error("Contact form not found!");

        return;

    }


    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // ==========================================
        // GET FORM VALUES
        // ==========================================

        const name =
            contactForm.elements["Name"].value.trim();

        const email =
            contactForm.elements["Email"].value.trim();

        const phone =
            contactForm.elements["Phone"].value.trim();

        const message =
            contactForm.elements["Message"].value.trim();


        // ==========================================
        // VALIDATION
        // ==========================================

        if (
            !name ||
            !email ||
            !phone ||
            !message
        ) {

            alert(
                "Please fill in all the fields."
            );

            return;

        }


        // ==========================================
        // CREATE WHATSAPP MESSAGE
        // ==========================================

        const whatsappMessage = `
━━━━━━━━━━━━━━━━━━━━━━
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
Sent from Fat2Fit Website
`;


        // ==========================================
        // WHATSAPP NUMBER
        // ==========================================

        const whatsappNumber =
            "919744421050";


        // ==========================================
        // CREATE WHATSAPP URL
        // ==========================================

        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(whatsappMessage);


        // ==========================================
        // DEBUG
        // ==========================================

        console.log(
            "Contact form submitted."
        );

        console.log(
            "WhatsApp URL:",
            whatsappURL
        );


        // ==========================================
        // OPEN WHATSAPP
        // ==========================================

        window.location.href =
            whatsappURL;

    });

}
