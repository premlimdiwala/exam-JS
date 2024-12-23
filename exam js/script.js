
        const questions = [
            {
                question: "10+10",
                option: ["20", "10", "30", "40"],
                answer: "20"
            },
            {
                question: "20-10",
                option: ["10", "20", "30", "40"],
                answer: "10"
            },
            {
                question: "30*3",
                option: ["90", "30", "60", "90"],
                answer: "90"
            },
            {
                question: "40/4",
                option: ["10", "20", "30", "40"],
                answer: "10"
            },
            {
                question: "50-20",
                option: ["30", "40", "50", "60"],
                answer: "30"
            }
        ];

        let currentQuestionIndex = 0;
        let score = 0;
        let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        let questionElem = document.getElementById('ques');
        let optionElem = document.getElementById('options');
        let nextBtn = document.getElementById('next');
        let resultElem = document.getElementById('result');
        let scoreElem = document.getElementById('score');
        let restartBtn = document.getElementById('restart');
        let board = document.getElementById('leaderboard');
        let rank = document.getElementById('rank');
        let backBtn = document.getElementById('back');
        let viewLeaderboardBtn = document.getElementById('viewLeaderboard');

        function loading() {
            const currentQuestion = questions[currentQuestionIndex];
            questionElem.textContent = currentQuestion.question;
            optionElem.innerHTML = '';
            currentQuestion.option.forEach(opt => {
                let button = document.createElement('button');
                button.textContent = opt;
                button.onclick = () => checkAnswer(opt);
                optionElem.appendChild(button);
            });
        }

        function checkAnswer(selectedAnswer) {
            const currentQuestion = questions[currentQuestionIndex];
            if (selectedAnswer === currentQuestion.answer) {
                score++;
            }
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loading();
            } else {
                showResult();
            }
        }

        function showResult() {
            document.getElementById('quiz').style.display = 'none';
            resultElem.style.display = 'block';
            scoreElem.textContent = score;
            leaderboard.push(score);
            localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
        }

        function showLeaderboard() {
            board.style.display = 'block';
            resultElem.style.display = 'none';
            rank.innerHTML = '';
            leaderboard.forEach((score, index) => {
                const li = document.createElement('li');
                li.textContent = `Player ${index + 1}: ${score} points`;
                rank.appendChild(li);
            });
        }

        function resetQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            document.getElementById('quiz').style.display = 'block';
            resultElem.style.display = 'none';
            loading();
        }

        function backToQuiz() {
            board.style.display = 'none';
            document.getElementById('quiz').style.display = 'block';
        }

        nextBtn.addEventListener('click', () => {
            if (currentQuestionIndex < questions.length) {
                loading();
            } else {
                showResult(); // Show result if all questions are answered
            }
        });

        restartBtn.addEventListener('click', resetQuiz);
        backBtn.addEventListener('click', backToQuiz);
        viewLeaderboardBtn.addEventListener('click', showLeaderboard);

        document.addEventListener('DOMContentLoaded', loading);
   