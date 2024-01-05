const questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers:[
            {text: "js", correct:false},
            {text: "scripting", correct:false},
            {text: "script", correct:true},
            {text: "javascript", correct:false},
        ]
    },
    {
        question: "CSS stands for?",
        answers:[
            {text: "Cast StyleSheet", correct:false},
            {text: "Cascading Style Sheet", correct:true},
            {text: "Cascade Sheets", correct:false},
            {text: "Castcode Style Sheet", correct:false},
        ]
    },
    {
        question: "JavaScript used for?",
        answers:[
            {text: "To style the web page", correct:false},
            {text: "to attach database", correct:false},
            {text: "to make web pages interactive", correct:true},
            {text: "None", correct:false},
        ]
    },
    {
        question: "Javascript is an _______ language?",
        answers:[
            {text: "Object-Based", correct:false},
            {text: "Procedural", correct:false},
            {text: "Object-oriented", correct:true},
            {text: "None of Above", correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("ans-btn");
const nextButton = document.getElementById("next-btn");

let currentQueIndex = 0;
let score = 0;

function startQuiz(){
    currentQueIndex=0;
    score=0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();

    let currentQuestion = questions[currentQueIndex];
    let questionNo = currentQueIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play Again!";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQueIndex++;
    if(currentQueIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQueIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})


startQuiz();