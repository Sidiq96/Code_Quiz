document.addEventListener('DOMContentLoaded', function (){
    const highScoresList = document.getElementById('highscores');

    // Retrieve the scores from the local storage 
    const scores = JSON.parse(localStorage.getItem('scores')) || [];

    // displays scores in a list in the highscore page 
    scores.forEach(function (score) {
        const listItem = document.createElement('li');
        listItem.textContent = `${score.initials}: ${score.score}`;
        highScoresList.appendChild(listItem);
    });
});