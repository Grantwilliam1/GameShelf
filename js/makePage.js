async function fetchGamesAndGeneratePages() {
    const sheetURL= "https://docs.google.com/spreadsheets/d/e/2PACX-1vTb09a9fNiVQRW5Uctk00nFSKsJcoCCQUCiCcOWAxGnW2TL2oGMAlBYaZZW8CRb4UKs1cNxRpMjE4Rv/pub?output=csv";
    try {
        const response = await fetch(sheetURL);
        const csvText = await response.text();
        const games = csvToJSON(csvText);
        games.forEach(game => {
            generateGamePage(game.Title, game.Icon);
        });
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
            Title: columns[1].trim(),
            Paragraph1: columns[2].trim(),
            Paragraph2: columns[3].trim(),
            Paragraph3: columns[4].trim(),
            Date: columns[5].trim(),
            Platform: columns[6].trim()
        };
    });
}

function generateGamePage(title, icon) {
    const gameSlug = title.toLowerCase().replace(/[^a-z0-9]/g, "").replace(/\s+/g, "");

    const pageContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <link href="../css/gameStyles.css" rel="stylesheet">
    </head>
    <body data-page-id="${gameSlug}">
        <div class="container">
            <a class="skip-link" href="#main">Skip to main content</a>
    
            <header>
                <div class="logo"><a href="../index.html"><img src="../assets/logoWhite.png" alt="The logo for the website"></a></div>
            </header>
    
            <nav>
                <h2 id="hidden-title">Navigation</h2>
                <ul class="navigation">
                    <li><a href="../global.html"><strong>Top Games</strong></a></li>
                    <li><a href="../userlist.html"><strong>User profile</strong></a></li>
                </ul>
                <form class="search-bar" action="/search" method="GET">
                    <input type="text" name="q" placeholder="Search..." required>
                </form>
            </nav>
            <main>
                <h2>${title}</h2>
                <section class="ranking">
                    <li><strong class="score">Score:</strong> <span>9.3</span></li>
                    <form id="scoreForm">
                        <label for="score">Score (out of 10):</label>
                        <select id="score" required>
                            <option value="" disabled selected>Select your score</option>
                            <option value="10">(10) Perfect</option>
                            <option value="9">(9) Amazing</option>
                            <option value="8">(8) Very Good</option>
                            <option value="7">(7) Good</option>
                            <option value="6">(6) Decent</option>
                            <option value="5">(5) Average</option>
                            <option value="4">(4) Bad</option>
                            <option value="3">(3) Very Bad</option>
                            <option value="2">(2) Awful</option>
                            <option value="1">(1) "Mid"</option>
                        </select>
                        <button type="submit">Submit</button>
                    </form>
                    <form id="progressForm">
                        <label for="progress">Progress:</label>
                        <select id="progress" required>
                            <option value="" disabled selected>User Progress</option>
                            <option value="Playing">Playing</option>
                            <option value="Finished">Finished</option>
                            <option value="On Hold">On Hold</option>
                            <option value="Dropped">Dropped</option>
                            <option value="Plan to Play">Plan to Play</option>
                        </select>
                        <button type="submit">Save</button>
                    </form>
                </section>
                <p>
                    ${paragraph1}
                </p>
                <p>
                    ${paragraph2}
                </p>
                <p>
                    ${paragraph3}
                </p>
            </main>
    
            <aside id="aside1">
                <img src="../assets/gameIcons/${icon}" alt="The cover art for the Video Game ${title}">
                <section class="info">
                    <p class="release"><strong>Initial Release Date</strong></p>
                    <p>${date}</p>
                    <p class="availible"><strong>Availible On</strong></p>
                    <p>${platform}</p>
                </section>
            </aside>
    
        </div>
        <script src="../js/score.js"></script>
        <script src="../js/scriptGames.js"></script>
    </body>
    </html>
`;

savePageToFile(`/games/${gameSlug}.html`, pageContent);
}

function savePageToFile(filename, content) {
    console.log(`Generated page for ${filename}.html`);
}

// Run on page load
document.addEventListener("DOMContentLoaded", fetchGamesAndGeneratePages);
