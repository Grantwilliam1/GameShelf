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
                <tr>
                    <td><a href="/games/${game.id}.html">
                        <img src="${game.image}" alt="Cover of ${game.name}" class="game-image">
                    </a></td>
                    <td>${game.name}</td>
                    <td>${game.score}</td>
                    <td>${game.progress}</td>
                    <td></td> <!-- Placeholder for notes -->
                </tr>`;
        });
    };

    loadAndDisplayUserGames();
});