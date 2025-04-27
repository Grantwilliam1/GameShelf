document.addEventListener("DOMContentLoaded", () => {
    const gameTableBody = document.querySelector("#user-table tbody");
    const dummyText = "Click to edit me";

    const loadAndDisplayUserGames = () => {
        gameTableBody.innerHTML = "";

        let userGames = Object.keys(localStorage)
            .filter(key => key.startsWith("userGame_"))
            .map(key => JSON.parse(localStorage.getItem(key)));

        userGames.sort((a, b) => b.score - a.score);

        userGames.forEach(game => {
            gameTableBody.innerHTML += `
                <tr data-game-id="${game.id}">
                    <td><a href="/games/${game.id}.html">
                        <img src="${game.image}" alt="Cover of ${game.name}" class="game-image">
                    </a></td>
                    <td data-label="Title" class="game-title">${game.name}</td>
                    <td data-label="Score" class="game-score">${game.score}</td>
                    <td data-label="Progress" class="game-progress">${game.progress}</td>
                    <td data-label="Notes" contenteditable="true" class="game-note">${game.note || dummyText}</td>
                </tr>`;
        });
    };

    loadAndDisplayUserGames();

    gameTableBody.addEventListener('input', (event) => {
        const target = event.target;
        if (target.classList.contains('game-note')) {
            const tr = target.closest('tr');
            const gameId = tr.getAttribute('data-game-id');
            const storedGameKey = `userGame_${gameId}`;
            const gameData = JSON.parse(localStorage.getItem(storedGameKey));

            gameData.note = target.innerText.trim();
            localStorage.setItem(storedGameKey, JSON.stringify(gameData));
        }
    });

    // Auto-select dummy text on click
    gameTableBody.addEventListener('focusin', (event) => {
        const target = event.target;
        if (target.classList.contains('game-note') && target.innerText.trim() === dummyText) {
            // Select the dummy text
            const range = document.createRange();
            range.selectNodeContents(target);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });
});


