const form = document.getElementById('scoreForm');
        const averageScoreDisplay = document.getElementById('averageScore');
    
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const score = document.getElementById('score').value;
    
            try {
                const response = await fetch('http://localhost:3000/submit-score', {
                    method: 'POST',               
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ score: Number(score) })
                });
    
                if (!response.ok) {
                    throw new Error(`Failed to submit score: ${response.statusText}`);
                }
    
                await loadAverageScore();
            } catch (error) {
                console.error('Error submitting score:', error);
            }
        });
    
        async function loadAverageScore() {
            try {
                const response = await fetch('http://localhost:3000/get-average-score', {
                    method: 'GET'                 
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch average score');
                }
                const data = await response.json();
                averageScoreDisplay.textContent = data.averageScore.toFixed(2);
            } catch (error) {
                console.error('Error loading average score:', error);
            }
        }