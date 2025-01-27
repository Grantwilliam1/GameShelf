document.addEventListener("DOMContentLoaded", () => {
    const games = [
        { id: "balatro", name: "Balatro", image:"../assets/gameIcons/balatro.webp" },
        { id: "persona5", name: "Persona 5 Royal", image:"../assets/gameIcons/persona5.webp" },
        { id: "pikmin", name: "Pikmin", image:"../assets/gameIcons/pikmin.webp" },
        { id: "pikmin2", name: "Pikmin 2", image:"../assets/gameIcons/pikmin2.webp" }
    ];

    const gameTableBody = document.querySelector("#game-table tbody");

    const loadAndDisplayGames = () => {
        const gameScores = games.map((game) => {
            const scores = JSON.parse(localStorage.getItem(`${game.id}Scores`)) || [];
            const average =
                scores.reduce((sum, score) => sum + score, 0) / (scores.length || 1);
            return { ...game, average: average.toFixed(2) };
        });

        gameScores.sort((a, b) => b.average - a.average);

        gameTableBody.innerHTML = gameScores
            .map(
                (game) => `
                <tr>
                    <td><a href="/games/${game.id}.html"><img src="${game.image}" alt="the cover art for the game ${game.name}" class="game-image"></a></td>
                    <td>${game.name}</td>
                    <td>${game.average}</td>
                </tr>`
            )
            .join("");
    };

    loadAndDisplayGames();
});

