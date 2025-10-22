document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
      marks: 10,
    },
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
      marks: 20,
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
      marks: 30,
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let answered = [];

  startBtn.addEventListener("click", () => {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  });

  nextBtn.addEventListener("click", () => {
    console.log("next button clicked");
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    for (let i = 0; i < answered.length; i++) {
      answered[i] = false;
    }
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  });

  function showQuestion() {
    nextBtn.classList.add("hidden");
    questionText.textContent = questions[currentQuestionIndex].question;
    choicesList.innerHTML = "";
    questions[currentQuestionIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", (event) => selectAnswer(event, choice));
      li.setAttribute("data-id", `${choice}`);
      choicesList.appendChild(li);
    });
  }

  function selectAnswer(event, choice) {
    console.log(event);
    if (answered[currentQuestionIndex]) return;
    answered[currentQuestionIndex] = true;
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (choice === correctAnswer) {
      score += questions[currentQuestionIndex].marks;
    }
    nextBtn.classList.remove("hidden");
    event.target.classList.add("selected");
  }

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    const max = questions.reduce((sum, curr) => sum + curr.marks, 0);
    scoreDisplay.textContent = `${score} out of ${max}`;
  }
});
