        // ============================================
        // EDIT YOUR QUESTIONS HERE!
        // ============================================
        const questions = [
            {
                question: "What is your comfort food?",
                emoji1: "🍕",
                option1: "Pizza",
                emoji2: "🍔", 
                option2: "Burger",
            },
            {
                question: "Morning person or Night owl?",
                emoji1: "🌅",
                option1: "Early Bird",
                emoji2: "🌙",
                option2: "Night Owl"
            },
            {
                question: "Beach vacation or Mountain retreat?",
                emoji1: "🏖️",
                option1: "Beach",
                emoji2: "🏔️",
                option2: "Mountains"
            },
            {
                question: "Coffee or Tea person?",
                emoji1: "☕",
                option1: "Coffee",
                emoji2: "🍵",
                option2: "Tea"
            },
            {
                question: "Netflix night or Outdoor adventure?",
                emoji1: "📺",
                option1: "Cozy Netflix",
                emoji2: "🥾",
                option2: "Outdoor Fun"
            },
            {
                question: "Sweet or Savory snacks?",
                emoji1: "🍫",
                option1: "Sweet Treats",
                emoji2: "🍿",
                option2: "Savory Snacks"
            },
            {
                question: "Text messages or Voice calls?",
                emoji1: "💬",
                option1: "Texting",
                emoji2: "📞",
                option2: "Calling"
            },
            {
                question: "Summer or Winter season?",
                emoji1: "☀️",
                option1: "Summer Vibes",
                emoji2: "❄️",
                option2: "Winter Cozy"
            },
            {
                question: "Dogs or Cats?",
                emoji1: "🐕",
                option1: "Dog Person",
                emoji2: "🐈",
                option2: "Cat Person"
            },
            {
                question: "Spontaneous plans or Planned ahead?",
                emoji1: "🎲",
                option1: "Spontaneous",
                emoji2: "📅",
                option2: "Well Planned"
            }
        ];

        // ============================================
        // GAME LOGIC (No need to edit below)
        // ============================================
        let currentQuestion = 0;
        let answers = [];
        let selectedOption = null;

        // Create floating hearts
        function createHearts() {
            const container = document.getElementById('hearts');
            const heartSymbols = ['💕', '💖', '💗', '💓', '💝'];

            setInterval(() => {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
                heart.style.left = Math.random() * 100 + '%';
                heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
                heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
                container.appendChild(heart);

                setTimeout(() => heart.remove(), 20000);
            }, 1000);
        }

        function startQuiz() {
            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('quizContent').classList.add('show');
            loadQuestion();
            createHearts();
        }

        function loadQuestion() {
            const q = questions[currentQuestion];
            document.getElementById('questionText').textContent = q.question;
            document.getElementById('emoji0').textContent = q.emoji1;
            document.getElementById('text0').textContent = q.option1;
            document.getElementById('emoji1').textContent = q.emoji2;
            document.getElementById('text1').textContent = q.option2;

            document.getElementById('counter').textContent = `Question ${currentQuestion + 1} of ${questions.length}`;

            const progress = ((currentQuestion + 1) / questions.length) * 100;
            document.getElementById('progressBar').style.width = progress + '%';

            // Reset selections
            document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
            selectedOption = null;
            document.getElementById('nextBtn').disabled = true;

            // Restore previous answer if exists
            if (answers[currentQuestion] !== undefined) {
                selectOption(answers[currentQuestion], false);
            }

            document.getElementById('prevBtn').disabled = currentQuestion === 0;
            document.getElementById('nextBtn').textContent = currentQuestion === questions.length - 1 ? 'See Results ✨' : 'Next →';
        }

        function selectOption(index, autoAdvance = true) {
            selectedOption = index;
            answers[currentQuestion] = index;

            document.querySelectorAll('.option').forEach((opt, i) => {
                opt.classList.toggle('selected', i === index);
            });

            document.getElementById('nextBtn').disabled = false;

            if (autoAdvance && currentQuestion < questions.length - 1) {
                setTimeout(nextQuestion, 500);
            }
        }

        function nextQuestion() {
            if (selectedOption === null) return;

            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                loadQuestion();
            } else {
                showResults();
            }
        }

        function previousQuestion() {
            if (currentQuestion > 0) {
                currentQuestion--;
                loadQuestion();
            }
        }

        function showResults() {
            document.getElementById('quizContent').classList.remove('show');
            document.getElementById('resultsScreen').classList.add('show');

            // Calculate "compatibility" (randomized for demo, in real use would compare with partner's answers)
            const score = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
            document.getElementById('score').textContent = score + '%';

            let message = '';
            if (score >= 90) message = "Wow! You two are soulmates! 💑✨";
            else if (score >= 80) message = "Amazing connection! You know them so well! 💕";
            else if (score >= 70) message = "Pretty good! There's always more to learn about each other! 🌟";
            else message = "Time to have some deep conversations! 💭";

            document.getElementById('resultMessage').textContent = message;

            // Show summary
            const summary = document.getElementById('answersSummary');
            summary.innerHTML = '<h3 style="margin-bottom: 15px; color: #333;">Your Answers:</h3>';

            questions.forEach((q, i) => {
                const answer = answers[i] === 0 ? q.option1 : q.option2;
                const emoji = answers[i] === 0 ? q.emoji1 : q.emoji2;
                summary.innerHTML += `
                    <div class="answer-item">
                        <div class="q">${i + 1}. ${q.question}</div>
                        <div class="a">${emoji} ${answer}</div>
                    </div>
                `;
            });

            createConfetti();
        }

        function createConfetti() {
            const colors = ['#ff6b9d', '#c44569', '#f8b500', '#667eea', '#764ba2'];
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.left = Math.random() * 100 + '%';
                    confetti.style.top = '-10px';
                    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                    document.body.appendChild(confetti);
                    setTimeout(() => confetti.remove(), 4000);
                }, i * 50);
            }
        }

        function shareResults() {
            const text = `We scored ${document.getElementById('score').textContent} on the This or That compatibility quiz! 💕 Try it with your partner!`;

            if (navigator.share) {
                navigator.share({
                    title: 'This or That Quiz Results',
                    text: text,
                    url: window.location.href
                });
            } else {
                navigator.clipboard.writeText(text + ' ' + window.location.href);
                alert('Results copied to clipboard! 📋');
            }
        }

        function restartQuiz() {
            currentQuestion = 0;
            answers = [];
            selectedOption = null;
            document.getElementById('resultsScreen').classList.remove('show');
            document.getElementById('startScreen').style.display = 'block';
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!document.getElementById('quizContent').classList.contains('show')) return;

            if (e.key === 'ArrowLeft') selectOption(0);
            if (e.key === 'ArrowRight') selectOption(1);
            if (e.key === 'Enter' && selectedOption !== null) nextQuestion();
        });