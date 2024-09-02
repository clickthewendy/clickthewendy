const wendyImage = document.getElementById('wendyImage');
const clickCounter = document.getElementById('clickCounter');
const nameInput = document.getElementById('nameInput');
const leaderboardTable = document.getElementById('leaderboardTable');

let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
let audio = new Audio('gn.mp3'); // Create an Audio object

clickCounter.textContent = `Click count: ${clickCount}`;

function playSound() {
    if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0; // Reset audio to the beginning
    }
    audio.play(); // Play the sound
}

function handleClick() {
    clickCount++;
    localStorage.setItem('clickCount', clickCount);
    clickCounter.textContent = `Click count: ${clickCount}`;

    playSound();

    wendyImage.style.transform = 'scale(0.9)';
    setTimeout(() => {
        wendyImage.style.transform = 'scale(1)';
    }, 100);

    updateLeaderboard();
}

function updateLeaderboard() {
    const name = nameInput.value.trim();
    if (name.length > 0 && name.length <= 16) { // Ensure a valid name is provided
        const index = leaderboard.findIndex(entry => entry.name === name);
        if (index !== -1) {
            leaderboard[index].clicks = clickCount;
        } else {
            leaderboard.push({ name: name, clicks: clickCount });
        }

        leaderboard.sort((a, b) => b.clicks - a.clicks);
        leaderboard = leaderboard.slice(0, 10);

        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    } else {
        // Remove any leaderboard entry with a blank name or invalid length
        leaderboard = leaderboard.filter(entry => entry.name.length > 0 && entry.name.length <= 16);

        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    }
    updateLeaderboardTable(); // Always update the leaderboard table
}

function updateLeaderboardTable() {
    leaderboardTable.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Clicks</th>
        </tr>
    `;
    leaderboard.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${entry.name}</td><td>${entry.clicks}</td>`;
        leaderboardTable.appendChild(row);
    });
}

wendyImage.addEventListener('click', handleClick);

updateLeaderboardTable();
