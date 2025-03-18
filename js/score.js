const userId = localStorage.getItem("userId") || `guest_${Math.random().toString(36).substr(2, 9)}`;
localStorage.setItem("userId", userId);

console.log("Assigned User ID:", userId);

const SHEETS_API_URL = "https://script.google.com/macros/s/AKfycbyumYdRic9PaAylIxbqyHoOWIKbaUdlSQd3fqkUiUS73b8c8HUJdN7hX6bxn3SHsg0OaQ/exec";

document.addEventListener("DOMContentLoaded", () => {
    const pageId = document.body.getAttribute("data-page-id");
    if (!pageId) return;

    const scoreDropdown = document.getElementById("score");
    const progressDropdown = document.getElementById("progress");
    const progressForm = document.getElementById("progressForm");
    const scoreDisplay = document.querySelector(".score + span");

    const gameName = document.querySelector("main h2")?.textContent.trim() || "Unknown Game";
    const gameImage = document.querySelector("aside img")?.getAttribute("src") || "";

    let progressStatus = localStorage.getItem(`${pageId}Progress`) || "Not Set";
    let lastSelectedScore = localStorage.getItem(`${pageId}LastScore`) || "";

    function fetchGlobalScore() {
        fetch(`${SHEETS_API_URL}?action=getAverage&gameId=${pageId}`)
            .then(response => response.text())
            .then(data => {
                scoreDisplay.textContent = data;
            })
            .catch(error => console.error("Error fetching global score:", error));
    }

    if (scoreDropdown) {
        scoreDropdown.value = lastSelectedScore ? lastSelectedScore : "";
        scoreDropdown.addEventListener("change", () => {
            const selectedScore = parseInt(scoreDropdown.value, 10);
            if (!isNaN(selectedScore)) {
                fetch(`${SHEETS_API_URL}?action=submit&gameId=${pageId}&score=${selectedScore}&userId=${userId}`)
                    .then(response => response.text())
                    .then(data => {
                        alert(`Score submitted: ${selectedScore}`);
                        fetchGlobalScore();

                        // Update local storage with game data
                        const gameData = JSON.parse(localStorage.getItem(`userGame_${pageId}`)) || {};
                        gameData.id = pageId;
                        gameData.name = gameName;
                        gameData.image = gameImage;
                        gameData.score = selectedScore;
                        gameData.progress = gameData.progress || progressStatus;
                        localStorage.setItem(`userGame_${pageId}`, JSON.stringify(gameData));

                        localStorage.setItem(`${pageId}LastScore`, selectedScore);
                        alert(`${gameName} (Score: ${selectedScore}) added to your list!`);
                    })
                    .catch(error => console.error("Error submitting score:", error));
            }
        });
    }

    if (progressDropdown && progressForm) {
        progressDropdown.value = progressStatus !== "Not Set" ? progressStatus : "";

        progressForm.addEventListener("change", (event) => {
            const selectedProgress = progressDropdown.value;
            if (selectedProgress) {
                localStorage.setItem(`${pageId}Progress`, selectedProgress);
                progressStatus = selectedProgress;

                const gameData = JSON.parse(localStorage.getItem(`userGame_${pageId}`)) || {};
                gameData.id = pageId;
                gameData.name = gameName;
                gameData.image = gameImage;
                gameData.progress = selectedProgress;
                gameData.score = gameData.score || lastSelectedScore;
                localStorage.setItem(`userGame_${pageId}`, JSON.stringify(gameData));

                alert(`${gameName} progress updated to: ${selectedProgress}`);
            }
        });
    }
    
    fetchGlobalScore();
});