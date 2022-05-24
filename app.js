// ответы
const option1 = document.querySelector('.option1'),
    option2 = document.querySelector('.option2'),
    option3 = document.querySelector('.option3'),
    option4 = document.querySelector('.option4')

const optionElements = document.querySelectorAll('.option')

const question = document.querySelector('#question'),
    numberOfQuestion = document.querySelector('#number-of-question'),
    numberOfAllQuestions = document.querySelector('#number-of-all-questions'),
    answerTracker = document.querySelector('#answers-tracker'),
    btn = document.querySelector('#btn-next')


let indexOfQuestion = 0,
    indexOfPage = 0,
    score = 0 // result

// модалка
const correctAnswer = document.querySelector('#correct-answer')
numberOfAllQuestions2 = document.querySelector('#number-of-all-questions-2')
btnTryAgain = document.querySelector('#btn-try-again')

const questions = [{
        question: 'Как называется еврейский Новый год?',
        option: [
            'Ханука',
            'Йом Кипур',
            'Кванза',
            'Рош ха-Шана'
        ],
        rightAnswer: 3
    },
    {
        question: 'Сколько синих полос на флаге США?',
        option: [
            '6',
            '7',
            '13',
            '50'
        ],
        rightAnswer: 2
    },
    {
        question: 'Кто из этих персонажей не дружит с Гарри Поттером?',
        option: [
            'Рон Уизли',
            'Невилл Лонгботтом',
            'Драко Малфой',
            'Гермиона Грейнджер'
        ],
        rightAnswer: 2
    }
]
correctAnswer.innerHTML = '0*'

numberOfAllQuestions.innerHTML = questions.length // количествое всех вопросов
numberOfAllQuestions2.innerHTML = '0*'

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question
    option1.innerHTML = questions[indexOfQuestion].option[0]
    option2.innerHTML = questions[indexOfQuestion].option[1]
    option3.innerHTML = questions[indexOfQuestion].option[2]
    option4.innerHTML = questions[indexOfQuestion].option[3]

    numberOfQuestion.innerHTML = indexOfPage + 1 // номер текущей страницы
    indexOfPage++
}
let completedAnswers = []

const randomQuestion = () => { //рендомный вопрос
    let randomNumber = Math.floor(Math.random() * questions.length)
    let hitDuplicate = false

    if (indexOfPage == questions.length) {
        quizOver()
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if (item == randomNumber) {
                    hitDuplicate = true
                }
            });
            if (hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        };
        if (completedAnswers == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    };
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = elem => {
    if (elem.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        elem.target.classList.add('correct')
        updateAnswerTracker('correct')
        score++
    } else {
        elem.target.classList.add('wrong')
        updateAnswerTracker('wrong')
    }
    disabledOptions()
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled')
        if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct')
        }
    })
}

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong')
    })
}

const tracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div')
        div.classList.add('tracker')
        answerTracker.appendChild(div)
    })
}

const updateAnswerTracker = (status) => {
    answerTracker.children[indexOfPage-1].classList.add(`${status}`)
}

const validate = () => {
    if (!optionElements[0].classList.contains('disabled')) {
        alert('Выберите какой-то из вариантов ответа')
    } else {
        randomQuestion()
        enableOptions()
    }
}
btn.addEventListener('click', validate)

for (opt of optionElements) {
    opt.addEventListener('click', e => checkAnswer(e))
}


const quizOver = () => {
    document.querySelector('.quiz-over-modal').style.display = 'block'
    document.querySelector('.quiz-container').style.display = 'none'
    correctAnswer.innerHTML = score
    numberOfAllQuestions2.innerHTML = questions.length
}

const tryAgain = () => {
    window.location.reload()
}

btnTryAgain.addEventListener('click', tryAgain)

window.addEventListener('load', () => {
    randomQuestion()
    tracker()
})