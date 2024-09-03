const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

let leaderboard = []; 

app.get('/leaderboard', (req, res) => {
    res.json(leaderboard);
});

app.post('/leaderboard', (req, res) => {
    const { name, clicks } = req.body;

    if (name && typeof clicks === 'number') {
        const index = leaderboard.findIndex(entry => entry.name === name);
        if (index === -1) {
            leaderboard.push({ name, clicks });
        } else {
            leaderboard[index].clicks = clicks;
        }

        leaderboard.sort((a, b) => b.clicks - a.clicks);
        leaderboard = leaderboard.slice(0, 10); 
        res.status(200).json(leaderboard);
    } else {
        res.status(400).json({ error: 'Invalid data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});