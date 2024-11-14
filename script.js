const questions = [
    {
        question: "Which is largest animal in the world?",
        answers:[
            {text: "Shark" ,correct:false},
            {text: "Elephant" ,correct:true},
            {text: "Tiger" ,correct:false},
            {text: "Lion" ,correct:false},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers:[
            {text: "Dubai", correct:false},
            {text: "Latvia", correct:true},
            {text: "America", correct:false},
            {text: "Russia", correct:false},
        ]
    },
{
question: "Which is the largest dessert in the world?",
answers:[
    {text:"Gobi", correct:false},
    {text:"Sahara", correct:false},
    {text:"Antarctica", correct:false},
    {text:"Kalahari", correct:false},
]
},
];
const questionElem = document.getElementById("question");
const buttons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("nextBtn");
let currentQuestionIndex = 0;
let score = 0;


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElem.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        buttons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
       button.addEventListener("click", selectAnswer);
    })
}
function resetState(){
    nextBtn.style.display = "none";
    while(buttons.firstChild){
        buttons.removeChild(buttons.firstChild);
    }

}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true' ;
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(buttons.children).forEach(button=>{
        if(button.dataset.correct === 'true'){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextBtn.style.display = "block";
}
nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
})
function showScore(){
    resetState();
    questionElem.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play again";
   nextBtn.style.display = "block";
}
function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

startQuiz();