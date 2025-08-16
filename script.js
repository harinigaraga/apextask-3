const quizData = {
  html: [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language",
        "Hyper Tool Machine Language"
      ],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "Which tag is used to create a link?",
      options: ["&lt;a&gt;", "&lt;link&gt;", "&lt;href&gt;", "&lt;url&gt;"],
      answer: "&lt;a&gt;"
    },
    {
      question: "Which tag inserts a line break?",
      options: ["&lt;br&gt;", "&lt;lb&gt;", "&lt;break&gt;", "&lt;newline&gt;"],
      answer: "&lt;br&gt;"
    },
    {
      question: "Which attribute adds image description?",
      options: ["alt", "title", "src", "id"],
      answer: "alt"
    },
    {
      question: "Which tag defines the largest heading?",
      options: ["&lt;h1&gt;", "&lt;h6&gt;", "&lt;head&gt;", "&lt;header&gt;"],
      answer: "&lt;h1&gt;"
    }
  ],

  css: [
    {
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Colorful Style Syntax",
        "Creative Style Scripts"
      ],
      answer: "Cascading Style Sheets"
    },
    {
      question: "How do you change text color?",
      options: ["color", "text-color", "font-color", "color-text"],
      answer: "color"
    },
    {
      question: "How do you make text bold?",
      options: ["font-weight: bold;", "font: bold;", "bold: true;", "text-style: bold;"],
      answer: "font-weight: bold;"
    },
    {
      question: "Which symbol is used for class selector?",
      options: [".", "#", "*", "!"],
      answer: "."
    },
    {
      question: "Which property is used for background color?",
      options: ["background-color", "bg-color", "background", "color-bg"],
      answer: "background-color"
    }
  ],

  js: [
    {
      question: "Which language is used for web behavior?",
      options: ["JavaScript", "HTML", "CSS", "Python"],
      answer: "JavaScript"
    },
    {
      question: "Which symbol starts a comment in JS?",
      options: ["//", "#", "/*", "--"],
      answer: "//"
    },
    {
      question: "Which keyword is used to declare variables?",
      options: ["var", "let", "const", "All of the above"],
      answer: "All of the above"
    },
    {
      question: "How do you create a function in JavaScript?",
      options: ["function myFunc()", "create myFunc()", "def myFunc()", "function:myFunc()"],
      answer: "function myFunc()"
    },
    {
      question: "Which method parses a JSON string?",
      options: ["JSON.parse()", "JSON.stringify()", "JSON.read()", "JSON.convert()"],
      answer: "JSON.parse()"
    }
  ]
};

// Quiz Logic
const domainSelect = document.getElementById("domainSelect");
const startQuizBtn = document.getElementById("startQuiz");
const quizContainer = document.getElementById("quiz");
const quizSection = document.getElementById("quizSection");
const submitBtn = document.getElementById("submit");
const resultDiv = document.getElementById("result");

let selectedQuiz = [];
let currentQuiz = 0;
let score = 0;

startQuizBtn.addEventListener("click", () => {
  const selectedDomain = domainSelect.value;
  if (!selectedDomain || !quizData[selectedDomain]) {
    alert("Please choose a valid domain.");
    return;
  }

  selectedQuiz = quizData[selectedDomain];
  currentQuiz = 0;
  score = 0;
  resultDiv.innerHTML = "";
  quizSection.style.display = "block";
  submitBtn.style.display = "block";
  loadQuiz();
});

function loadQuiz() {
  const currentData = selectedQuiz[currentQuiz];
  quizContainer.innerHTML = `
    <h3>${currentData.question}</h3>
    ${currentData.options.map(opt => `
      <label><input type="radio" name="answer" value="${opt}">${opt}</label>
    `).join('')}
  `;
}

submitBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    alert("Please select an answer.");
    return;
  }

  if (selected.value === selectedQuiz[currentQuiz].answer) {
    score++;
  }

  currentQuiz++;
  if (currentQuiz < selectedQuiz.length) {
    loadQuiz();
  } else {
    quizContainer.innerHTML = "";
    submitBtn.style.display = "none";
    resultDiv.innerHTML = `✅ You scored <strong>${score}</strong> out of <strong>${selectedQuiz.length}</strong>`;
  }
});

// Joke API Logic
const getJokeBtn = document.getElementById("getJoke");
const jokeDiv = document.getElementById("joke");

getJokeBtn.addEventListener("click", () => {
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then(res => res.json())
    .then(data => {
      jokeDiv.innerHTML = `
        <p><strong>${data.setup}</strong></p>
        <p>${data.punchline}</p>
      `;
    })
    .catch(() => {
      jokeDiv.innerHTML = "Failed to fetch joke. Try again.";
    });
});
