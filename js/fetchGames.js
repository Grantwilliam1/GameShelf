async function fetchFromSheet() {
    const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTb09a9fNiVQRW5Uctk00nFSKsJcoCCQUCiCcOWAxGnW2TL2oGMAlBYaZZW8CRb4UKs1cNxRpMjE4Rv/pub?output=csv";
    try {
        const response = await fetch(sheetURL);
        const csvText = await response.text();
        const games = csvToJSON(csvText);
        updateGameGrid(games);
    } catch (error) {
        console.error("Error fetching games:", error);
    }
}

function csvToJSON(csv) {
    const rows = csv.split("\n").slice(1);
    return rows.map(row => {
        const columns = row.split(",");
        return {
            Icon: columns[0].trim(),
            Title: columns[1].trim()
        };
    });
}

const manualSlugMap = {
    "persona 5 royal": "persona5royal",
    "halo: combat evolved": "halocombatevolved",
    "the last of us": "lastofus",
    "the legend of zelda breath of the wild": "legendofzeldabreathofthewild",
    "god of war ragnarok": "godofwarragnarok",
    "civilization 6": "civilizationvi" // Add on as needed :)
};

const aliasMap = {
    "civilization6": "civilization vi",
    "finalfantasy7remake": "final fantasy vii remake",
    "finalfantasy7rebirth": "final fantasy vii rebirth",
    "dragonquest11s": "dragon quest xi s",
  };

window.isGameSearchReady = false;
window.gameSearchMap = {};

function updateGameGrid(games) {
    const grid = document.getElementById("gamesGrid");

    games.forEach(game => {
        const rawTitle = game.Title.toLowerCase().trim();
        const gameSlug = manualSlugMap[rawTitle] || rawTitle.replace(/[^a-z0-9]/g, '');
        const cleanedKey = rawTitle.replace(/[^a-z0-9]/g, '');

        console.log(`Mapped "${game.Title}" → ${gameSlug}`);
        window.gameSearchMap[cleanedKey] = `/games/${gameSlug}.html`;

        if (grid) {
            const figure = document.createElement("figure");
            figure.innerHTML = `
                <a href="/games/${gameSlug}.html">
                    <img src="assets/gameIcons/${game.Icon}" alt="The cover art for ${game.Title}">
                    <figcaption>${game.Title}</figcaption>
                </a>
            `;
            grid.appendChild(figure);
        }
    });

    Object.entries(aliasMap).forEach(([aliasKey, originalTitle]) => {
        const originalCleaned = originalTitle.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (window.gameSearchMap[originalCleaned]) {
            window.gameSearchMap[aliasKey] = window.gameSearchMap[originalCleaned];
        }
    });

    window.isGameSearchReady = true;
}



document.addEventListener("DOMContentLoaded", fetchFromSheet);



window.gameSearchMap = {};