async function fetchFromSheet(){
    const sheetURL= "https://docs.google.com/spreadsheets/d/e/2PACX-1vTb09a9fNiVQRW5Uctk00nFSKsJcoCCQUCiCcOWAxGnW2TL2oGMAlBYaZZW8CRb4UKs1cNxRpMjE4Rv/pub?output=csv";
    try {
        const response = await fetch(sheetURL);
        const csvText = await response.text();
        const games = csvToJSON(csvText);
        updateGameTable(games);
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

function updateGameTable(games) {
    const table = document.getElementById("gamesTable");
    table.innerHTML = "";

    let row = null;

    games.forEach((game, index) => {
        // Create a new row every 8 games
        if (index % 8 === 0) { 
            row = document.createElement("tr"); 
            table.appendChild(row);
        }

        const cell = document.createElement("td");
        cell.style.width = "12.5%"; // 8 columns per row
        const gameSlug = game.Title.toLowerCase().replace(/[^a-z0-9()]/g, "").replace(/\s+/g, "");

        cell.innerHTML = `
            <figure>
                <div class="slide">
                    <a href="games/${gameSlug}.html">
                        <img src="assets/gameIcons/${game.Icon}" alt="The cover art for ${game.Title}">
                    </a>
                </div>
                <figcaption>${game.Title}</figcaption>
            </figure>
        `;

        row.appendChild(cell);
    });

    console.log("Game table updated:", table.innerHTML);
}


document.addEventListener("DOMContentLoaded", fetchFromSheet);