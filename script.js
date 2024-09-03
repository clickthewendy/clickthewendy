const wendyImage = document.getElementById('wendyImage');
const clickCounter = document.getElementById('clickCounter');
const nameInput = document.getElementById('nameInput');
const selectButton = document.getElementById('selectButton');
const leaderboardTable = document.getElementById('leaderboardTable');
const errorMessage = document.getElementById('errorMessage');

let clickCount = 0; // Reset click count on page load
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
let audio = new Audio('gn.mp3');

// Initialize click counter display
clickCounter.textContent = `Click count: ${clickCount}`;

function playSound() {
    if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
    }
    audio.play();
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000); // Display for 3 seconds
}

function handleClick() {
    clickCount++;
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
    if (name.length > 0 && name.length <= 16) {
        const index = leaderboard.findIndex(entry => entry.name === name);
        if (index !== -1) {
            showError('You already chose your name.');
            return; // Exit the function if the name already exists
        } else {
            leaderboard.push({ name: name, clicks: clickCount });
        }

        leaderboard.sort((a, b) => b.clicks - a.clicks);
        leaderboard = leaderboard.slice(0, 10);

        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
        updateLeaderboardTable();
    }
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
selectButton.addEventListener('click', updateLeaderboard);

updateLeaderboardTable();
