

document.addEventListener("DOMContentLoaded", () => {
    const gameTableBody = document.querySelector("#global-table tbody");

    const fetchGlobalRankings = async () => {
        try {
            let response = await fetch("https://script.google.com/macros/s/AKfycbxZqIvVDkEk3Bu4QoHH3B-9Qz26MGrFnzVrFb96WHCGLx5cvG0bHw1L9eKpqBM7m941UQ/exec?action=getGlobalRankings");
            let rawData = await response.text(); // Fetch as raw text first
            console.log("📌 Raw Data:", rawData);

            // Try parsing JSON (handle cases where response is stringified JSON)
            let data;
            try {
                data = JSON.parse(rawData.trim()); // Ensure proper JSON parsing
                if (typeof data === "string") {
                    data = JSON.parse(data); // Handle double-stringified JSON
                }
            } catch (parseError) {
                console.error("❌ JSON Parse Error:", parseError, "Raw Data:", rawData);
                return;
            }

            if (!Array.isArray(data)) {
                console.error("❌ Error: Data received is not an array. Type:", typeof data, "Content:", data);
                return;
            }

            // Sort by descending averageScore
            data.sort((a, b) => b.averageScore - a.averageScore);

            // Clear the table before adding new data
            gameTableBody.innerHTML = "";

            data.forEach(game => {
                gameTableBody.innerHTML += `
                    <tr>
                        <td><a href="/games/${game.id}.html">
                            <img src="${game.image}" alt="Cover of ${game.title}" class="game-image">
                        </a></td>
                        <td id=game-title>${game.title}</td>
                        <td>${game.averageScore}</td>
                    </tr>`;
            });

            console.log("✅ Rankings successfully displayed!");

        } catch (error) {
            console.error("❌ Error fetching global rankings:", error);
        }
    };

    fetchGlobalRankings();
});






