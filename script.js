// =====================================================
// LUCIDE ICONS
// =====================================================

if (window.lucide) {
    lucide.createIcons();
}



// =====================================================
// MOBILE MENU
// =====================================================

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");


if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("open");

    });


    document.querySelectorAll(".nav-link")
        .forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

            });

        });

}



// =====================================================
// ACTIVE NAVIGATION
// =====================================================

const sections =
    document.querySelectorAll("main section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");


function updateNavigation() {

    let currentSection = "home";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href")
            === "#" + currentSection
        ) {
            link.classList.add("active");
        }

    });

}


window.addEventListener(
    "scroll",
    updateNavigation
);

updateNavigation();



// =====================================================
// REVEAL ANIMATION
// =====================================================

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    observer.observe(element);

});



// =====================================================
// VIDEO CONTROLS
// =====================================================

const video =
    document.getElementById("processVideo");

const playButton =
    document.getElementById("playVideo");

const pauseButton =
    document.getElementById("pauseVideo");


if (video && playButton) {

    playButton.addEventListener(
        "click",
        () => {

            video.play();

        }
    );

}


if (video && pauseButton) {

    pauseButton.addEventListener(
        "click",
        () => {

            video.pause();

        }
    );

}



// =====================================================
// QUIZ
// =====================================================

const questions = [

    {
        question:
            "What is the first major stage of the preparation process?",

        options: [
            "Ingredient Preparation",
            "Packaging",
            "Marketing",
            "Transportation"
        ],

        answer: 0
    },


    {
        question:
            "Which stage comes after heating?",

        options: [
            "Stirring and Mixing",
            "Packaging",
            "Transportation",
            "Marketing"
        ],

        answer: 0
    },


    {
        question:
            "What happens after cooling?",

        options: [
            "Filtration",
            "Marketing",
            "Packaging",
            "Transportation"
        ],

        answer: 0
    },


    {
        question:
            "What is obtained after filtration?",

        options: [
            "Liquid Soap",
            "Oil",
            "Salt",
            "Distilled Water"
        ],

        answer: 0
    }

];


let currentQuestion = 0;


const questionNumber =
    document.getElementById("questionNumber");

const questionText =
    document.getElementById("question");

const quizOptions =
    document.getElementById("quizOptions");

const quizResult =
    document.getElementById("quizResult");

const nextQuestion =
    document.getElementById("nextQuestion");



function loadQuestion() {

    const q =
        questions[currentQuestion];


    questionNumber.textContent =
        `Question ${currentQuestion + 1}`;


    questionText.textContent =
        q.question;


    quizOptions.innerHTML = "";


    quizResult.textContent = "";


    q.options.forEach(
        (option, index) => {

            const button =
                document.createElement("button");


            button.textContent =
                option;


            button.addEventListener(
                "click",
                () => {

                    checkAnswer(
                        index,
                        button
                    );

                }
            );


            quizOptions.appendChild(button);

        }
    );

}


function checkAnswer(
    selectedIndex,
    selectedButton
) {

    const correctIndex =
        questions[currentQuestion].answer;


    const buttons =
        quizOptions.querySelectorAll("button");


    buttons.forEach(button => {

        button.disabled = true;

    });


    if (selectedIndex === correctIndex) {

        selectedButton.classList.add("correct");

        quizResult.textContent =
            "✓ Correct answer!";

    } else {

        selectedButton.classList.add("wrong");

        buttons[correctIndex]
            .classList.add("correct");

        quizResult.textContent =
            "✗ Incorrect. The highlighted answer is correct.";

    }

}


if (nextQuestion) {

    nextQuestion.addEventListener(
        "click",
        () => {

            currentQuestion++;

            if (
                currentQuestion
                >= questions.length
            ) {

                currentQuestion = 0;

            }

            loadQuestion();

        }
    );

}


loadQuestion();



// =====================================================
// BACK TO TOP
// =====================================================

const backToTop =
    document.getElementById("backToTop");


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 500) {

            backToTop.classList.add(
                "visible"
            );

        } else {

            backToTop.classList.remove(
                "visible"
            );

        }

    }
);


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);



// =====================================================
// IMAGE ERROR DEBUGGING
// =====================================================

document
    .querySelectorAll("img")
    .forEach(img => {

        img.addEventListener(
            "error",
            () => {

                console.error(
                    "IMAGE NOT FOUND:",
                    img.src
                );

            }
        );

        img.addEventListener("copy", async event => {
            if (!navigator.clipboard || !window.ClipboardItem) {
                return;
            }

            event.preventDefault();

            try {
                const response = await fetch(img.currentSrc || img.src);
                const blob = await response.blob();
                await navigator.clipboard.write([
                    new ClipboardItem({ [blob.type || "image/png"]: blob })
                ]);
            } catch (error) {
                console.error("IMAGE COPY FAILED:", error);
            }
        });

    });



// =====================================================
// DIAGRAM LIGHTBOX MODAL
// =====================================================

const lightbox = document.getElementById("diagramLightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

if (lightbox && lightboxImg && lightboxClose) {
    document.querySelectorAll(".clickable-diagram").forEach(img => {
        img.addEventListener("click", () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            if (lightboxCaption) {
                lightboxCaption.textContent = img.alt || "Diagram Preview";
            }
            lightbox.classList.add("open");
            document.body.style.overflow = "hidden";
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove("open");
        document.body.style.overflow = "";
    };

    lightboxClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.classList.contains("open")) {
            closeLightbox();
        }
    });
}

if (window.lucide) {
    lucide.createIcons();
}
