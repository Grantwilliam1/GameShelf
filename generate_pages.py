# I copied this from ChatGPT so that I can have it save the files I create in Google Sheets manually

import os
import requests
import csv

# 🔹 Google Sheets CSV Link (Replace with your actual link)
SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTb09a9fNiVQRW5Uctk00nFSKsJcoCCQUCiCcOWAxGnW2TL2oGMAlBYaZZW8CRb4UKs1cNxRpMjE4Rv/pub?output=csv"

# 🔹 Function to fetch game data from Google Sheets
def fetch_games():
    response = requests.get(SHEET_URL)
    csv_text = response.text.splitlines()  # Read all lines
    reader = csv.reader(csv_text)  # Use csv.reader to properly handle commas inside quotes

    games = []
    next(reader)  # Skip the header row

    for row in reader:
        if len(row) >= 7:  # Ensure all required columns exist
            games.append({
                "Icon": row[0].strip(),
                "Title": row[1].strip(),
                "Paragraph1": row[2].strip(),
                "Paragraph2": row[3].strip(),
                "Paragraph3": row[4].strip(),
                "Date": row[5].strip(),
                "Platform": row[6].strip()
            })

    return games

# 🔹 Function to generate an HTML file for each game
# 🔹 Function to generate an HTML file for each game
def generate_pages():
    games = fetch_games()
    os.makedirs("games", exist_ok=True)  # Ensure the /games/ folder exists

    for game in games:
        game_slug = game["Title"].lower().replace(" ", "").replace("'", "").replace(":", "").replace(",", "")
        filename = f"games/{game_slug}.html"

        # Skip if the file already exists
        if os.path.exists(filename):
            print(f"Skipping {filename} (already exists)")
            continue

        # Handle individual paragraphs properly
        p1 = f"<p>{game['Paragraph1']}</p>" if game["Paragraph1"] else ""
        p2 = f"<p>{game['Paragraph2']}</p>" if game["Paragraph2"] else ""
        p3 = f"<p>{game['Paragraph3']}</p>" if game["Paragraph3"] else ""

        html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{game["Title"]}</title>
    <link href="../css/gameStyles.css" rel="stylesheet">
</head>
<body data-page-id="{game_slug}">
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
            <h2>{game["Title"]}</h2>
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
                </form>
            </section>
            {p1}
            {p2}
            {p3}
        </main>

        <aside id="aside1">
            <img src="../assets/gameIcons/{game["Icon"]}" alt="The cover art for the Video Game {game["Title"]}">
            <section class="info">
                <p class="release"><strong>Initial Release Date</strong></p>
                <p>{game["Date"]}</p>
                <p class="availible"><strong>Available On</strong></p>
                <p>{game["Platform"]}</p>
            </section>
        </aside>

    </div>
    <script src="../js/score.js"></script>
    <script src="../js/scriptGames.js"></script>
</body>
</html>
"""

        with open(filename, "w") as file:
            file.write(html_content)
            print(f"✅ Created: {filename}")

    print("🎉 All new game pages generated!")

# 🔹 Run the script
if __name__ == "__main__":
    generate_pages()


