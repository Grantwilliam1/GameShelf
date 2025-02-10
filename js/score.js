document.addEventListener("DOMContentLoaded", () => {
    const pageId = document.body.getAttribute("data-page-id");
    if (!pageId) return;

    const scoreDropdown = document.getElementById("score");
    const progressDropdown = document.getElementById("progress");
    const submitButton = document.querySelector("#scoreForm button");
    const progressForm = document.querySelector("#progressForm");
    const scoreDisplay = document.querySelector(".score + span");

    const gameName = document.querySelector("main h2")?.textContent.trim() || "Unknown Game";
    const gameImage = document.querySelector("aside img")?.getAttribute("src") || ""; // Extract cover image

    let scores = JSON.parse(localStorage.getItem(`${pageId}Scores`)) || [];
    let progressStatus = localStorage.getItem(`${pageId}Progress`) || "Not Set";
    let lastSelectedScore = localStorage.getItem(`${pageId}LastScore`) || ""; // Get last saved score

    const updateAverageScore = () => {
        const average = scores.reduce((sum, score) => sum + score, 0) / (scores.length || 1);
        scoreDisplay.textContent = average.toFixed(2);
    };

    updateAverageScore();

    // Set dropdown to last saved score (if available)
    if (scoreDropdown) {
        scoreDropdown.value = lastSelectedScore ? lastSelectedScore : "";
    }

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        const selectedScore = parseInt(scoreDropdown.value, 10);
        if (!isNaN(selectedScore)) {
            scores.push(selectedScore);
            localStorage.setItem(`${pageId}Scores`, JSON.stringify(scores));
            localStorage.setItem(`${pageId}LastScore`, selectedScore);
            updateAverageScore();

            // Update localStorage
            const gameData = {
                id: pageId,
                name: gameName,
                image: gameImage,
                score: selectedScore,
                progress: progressStatus
            };

            localStorage.setItem(`userGame_${pageId}`, JSON.stringify(gameData));
            alert(`${gameData.name} (Score: ${selectedScore}) added to your list!`);
        } else {
            alert("Please select a valid score before submitting.");
        }
    });

    // Handle Progress Selection
    if (progressDropdown) {
        progressDropdown.value = progressStatus !== "Not Set" ? progressStatus : "";

        progressForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const selectedProgress = progressDropdown.value;
            if (selectedProgress) {
                localStorage.setItem(`${pageId}Progress`, selectedProgress);
                progressStatus = selectedProgress;

                const gameData = JSON.parse(localStorage.getItem(`userGame_${pageId}`)) || {};
                gameData.progress = selectedProgress;
                localStorage.setItem(`userGame_${pageId}`, JSON.stringify(gameData));

                alert(`${gameName} progress updated to: ${selectedProgress}`);
            }
        });
    }
});