document.addEventListener("DOMContentLoaded", () => {
    const initScoringSystem = (pageId) => {
        const scoreDropdown = document.getElementById("score");
        const submitButton = document.querySelector("#scoreForm button");
        const scoreDisplay = document.querySelector(".score + span");

        let scores = JSON.parse(localStorage.getItem(`${pageId}Scores`)) || [];

        const updateAverageScore = () => {
            const average =
                scores.reduce((sum, score) => sum + score, 0) / (scores.length || 1);
            scoreDisplay.textContent = average.toFixed(2);
        };

        updateAverageScore();

        submitButton.addEventListener("click", (event) => {
            event.preventDefault();

            const selectedScore = parseInt(scoreDropdown.value, 10);

            if (!isNaN(selectedScore)) {
                scores.push(selectedScore);

                localStorage.setItem(`${pageId}Scores`, JSON.stringify(scores));

                updateAverageScore();

                scoreDropdown.value = "";
            } else {
                alert("Please select a valid score before submitting.");
            }
        });
    };

    const pageId = document.body.getAttribute("data-page-id");
    if (pageId) {
        initScoringSystem(pageId);
    }
});