document.addEventListener("DOMContentLoaded", () => {
    const gameTableBody = document.querySelector("#user-table tbody");

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
                    <td class="game-title">${game.name}</td>
                    <td class="game-score">${game.score}</td>
                    <td>${game.progress}</td>
                    <td contenteditable="true" class="game-note">${game.note || "Click to edit me"}</td>
                </tr>`;
        });
    };

    loadAndDisplayUserGames();

    // Event listener for live note saving
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
});
