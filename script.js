const quizData = [
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4"
    },
    {
        question: "What is the capital of France?",
        options: ["London", "Paris", "Berlin", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Jupiter", "Venus", "Mercury"],
        correctAnswer: "Mars"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Pablo Picasso", "Leonardo da Vinci", "Vincent van Gogh", "Michelangelo"],
        correctAnswer: "Leonardo da Vinci"
    }
];

const quizContainer = document.getElementById("quiz-container");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const submitButton = document.getElementById("submit-btn");
const scoreContainer = document.getElementById("score-container");
const scoreText = scoreContainer.querySelector("#score");
const percentageText = scoreContainer.querySelector("#percentage");

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionText.innerText = currentQuizData.question;

    const optionButtons = document.querySelectorAll('.option-btn');

    for (let i = 0; i < optionButtons.length; i++) {
        optionButtons[i].textContent = currentQuizData.options[i];
        optionButtons[i].value = currentQuizData.options[i];
    }
}

function checkAnswer() {
    const selectedOption = document.querySelector('.option-btn.selected');
    if (!selectedOption) return;

    const answer = selectedOption.value;
    const currentQuizData = quizData[currentQuestion];

    if (answer === currentQuizData.correctAnswer) {
        score++;
    }

    selectedOption.classList.remove('selected');
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

optionsContainer.addEventListener("click", function (event) {
    const clickedOption = event.target;
    if (!clickedOption.classList.contains("option-btn")) return;

    const selectedOption = document.querySelector('.option-btn.selected');
    if (selectedOption) {
        selectedOption.classList.remove('selected');
    }

    clickedOption.classList.add('selected');
});

function showResult() {
    quizContainer.style.display = "none";
    scoreContainer.style.display = "block"; // Show the score container

    const totalQuestions = quizData.length;
    const percentage = (score / totalQuestions) * 100;

    scoreText.innerText = score;
    percentageText.innerText = percentage.toFixed(2);
}

submitButton.addEventListener("click", checkAnswer);

loadQuestion();