// ответы
const option1 = document.querySelector('.option1'),
    option2 = document.querySelector('.option2'),
    option3 = document.querySelector('.option3'),
    option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

const question = document.querySelector('#question'),
    numberOfQuestion = document.querySelector('#number-of-question'),
    numberOfAllQuestions = document.querySelector('#number-of-all-questions'),
    answerTracker = document.querySelector('#answers-tracker'),
    btn = document.querySelector('#btn-next');

let indexOfQuestion = 0,
    indexOfPage = 0,
    score = 0; // result
// модалка
const correctAnswer = document.querySelector('#correct-answer');
numberOfAllQuestions2 = document.querySelector('#number-of-all-questions-2');
btnTryAgain = document.querySelector('#btn-try-again');
// GET
const sendRequest = (url) => {
    return fetch(url)
        .then(response => {
            return response.json();
        });
};
//загрузка вопросов
const load = (q) => {
    question.innerHTML = q[indexOfQuestion].question;
    option1.innerHTML = q[indexOfQuestion].option[0];
    option2.innerHTML = q[indexOfQuestion].option[1];
    option3.innerHTML = q[indexOfQuestion].option[2];
    option4.innerHTML = q[indexOfQuestion].option[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; // номер текущей страницы
    indexOfPage++;
};

let completedAnswers = [];
//рендомный вопрос
const randomQuestion = (q) => { 
    let randomNumber = Math.floor(Math.random() * q.length);
    let hitDuplicate = false;

    if (indexOfPage == q.length) {
        quizOver(q);
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if (item == randomNumber) {
                    hitDuplicate = true;
                };
            });
            if (hitDuplicate) {
                randomQuestion(q);
            } else {
                indexOfQuestion = randomNumber;
                load(q);
            };
        };
        if (completedAnswers == 0) {
            indexOfQuestion = randomNumber;
            load(q);
        };
    };
    completedAnswers.push(indexOfQuestion);
};
//проверка ответов+
const checkAnswer = (elem, q) => {
    if (elem.target.dataset.id == q[indexOfQuestion].rightAnswer) {
        elem.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        elem.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    };
    disabledOptions(q);
};
//подсветка правильного вопроса+
const disabledOptions = (q) => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if (item.dataset.id == q[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        };
    });
};
//очистить все классы
const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    });
};
//добавление трекера
const tracker = (q) => {
    q.forEach(() => {
        const div = document.createElement('div');
        div.classList.add('tracker');
        answerTracker.appendChild(div);
    });
};
//обновление трекера
const updateAnswerTracker = (status) => {
    answerTracker.children[indexOfPage - 1].classList.add(`${status}`);
};
//проверка выбран ли ответ
const validate = (q) => {
    if (!optionElements[0].classList.contains('disabled')) {
        alert('Выберите какой-то из вариантов ответа');
    } else {
        randomQuestion(q);
        enableOptions();
    };
};
// появление модалки 
const quizOver = (q) => {
    document.querySelector('.quiz-over-modal').style.display = 'block';
    document.querySelector('.quiz-container').style.display = 'none';
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = q.length;
};
// рестарт игры
const tryAgain = () => {
    window.location.reload();
}
//получение вопросов с файла
sendRequest('./questions.json')
    .then(q => {
        numberOfAllQuestions.innerHTML = q.length;

        btn.addEventListener('click', () => {
            validate(q);
        });

        for (opt of optionElements) {
            opt.addEventListener('click', e => checkAnswer(e, q));
        };
        btnTryAgain.addEventListener('click', tryAgain);

        // загрузка вопроса
        window.addEventListener('load', () => {
            randomQuestion(q);
            tracker(q);
        });
    });
