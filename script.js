const movies = [
    {
        title: 'inception',
        poster: 'Inception.webp',
        hint: 'A mind-bending thriller directed by Christopher Nolan.',
        director: 'Christopher Nolan'
    },
    {
        title: 'avatar',
        poster: 'Avatar.webp',
        hint: 'A sci-fi epic set on the planet Pandora.',
        director: 'James Cameron'
    },
    {
        title: 'titanic',
        poster: 'Titanic.jpg',
        hint: 'A romance that takes place on a doomed ocean liner.',
        director: 'James Cameron'
    }
    // Add more movies as needed
];

let currentMovieIndex = 0;
let score = 0;
let timer;
const timeLimit = 30; // Time limit for each movie in seconds

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startTimer() {
    let timeRemaining = timeLimit;
    document.getElementById('timer').textContent = `Time: ${timeRemaining}s`;

    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById('timer').textContent = `Time: ${timeRemaining}s`;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function loadMovie() {
    if (currentMovieIndex === 0) {
        shuffleArray(movies);
    }
    
    document.getElementById('posterImage').src = movies[currentMovieIndex].poster;
    document.getElementById('guessInput').value = '';
    document.getElementById('result').textContent = '';
    document.getElementById('hint').textContent = '';
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('endSection').style.display = 'none';

    startTimer();
}

function playSound(effect) {
    const audio = new Audio(effect);
    audio.play();
}

function endGame() {
    document.getElementById('finalScore').textContent = `Your total score is: ${score}`;
    document.getElementById('endSection').style.display = 'block';
    document.getElementById('moviePoster').style.display = 'none';
    document.getElementById('guessInput').style.display = 'none';
    document.getElementById('guessButton').style.display = 'none';
    document.getElementById('hintButton').style.display = 'none';
    document.getElementById('score').style.display = 'none';
    document.getElementById('nextButton').style.display = 'none';
}

document.getElementById('guessButton').addEventListener('click', function() {
    const guess = document.getElementById('guessInput').value.toLowerCase();
    const resultText = document.getElementById('result');

    if (guess === movies[currentMovieIndex].title) {
        resultText.textContent = 'Congratulations! You guessed it right!';
        resultText.style.color = 'green';
        score++;
        playSound('correct.mp3'); // Path to your correct guess sound
    } else {
        resultText.textContent = 'Sorry, try again!';
        resultText.style.color = 'red';
        playSound('incorrect.mp3'); // Path to your incorrect guess sound
    }

    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('nextButton').style.display = 'block';
});

document.getElementById('nextButton').addEventListener('click', function() {
    currentMovieIndex++;

    if (currentMovieIndex < movies.length) {
        loadMovie();
    } else {
        endGame();
    }
});

document.getElementById('hintButton').addEventListener('click', function() {
    const hint = `${movies[currentMovieIndex].hint} (Directed by: ${movies[currentMovieIndex].director})`;
    document.getElementById('hint').textContent = hint;
});

document.getElementById('restartButton').addEventListener('click', function() {
    currentMovieIndex = 0;
    score = 0;
    loadMovie();
    document.getElementById('moviePoster').style.display = 'block';
    document.getElementById('guessInput').style.display = 'block';
    document.getElementById('guessButton').style.display = 'block';
    document.getElementById('hintButton').style.display = 'block';
    document.getElementById('score').style.display = 'block';
    document.getElementById('endSection').style.display = 'none';
});

window.onload = loadMovie;
