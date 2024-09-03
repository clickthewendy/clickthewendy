const wendyImage = document.getElementById('wendyImage');
const clickCounter = document.getElementById('clickCounter');
const title = document.querySelector('h1'); 

let clickCount = 0; 
let audio = new Audio('gn.mp3'); 
let winAudio1 = new Audio('Children Yay Sound Effect (HD).mp3'); 
let winAudio2 = new Audio('WENDY 웬디 \'Wish You Hell.mp3'); 

clickCounter.textContent = `Click count: ${clickCount}`;

function playSound(sound) {
    if (!sound.paused) {
        sound.pause();
        sound.currentTime = 0;
    }
    sound.play();
}

function handleClick() {
    if (clickCount < 1000) {
        clickCount++;
        clickCounter.textContent = `Click count: ${clickCount}`;

        if (clickCount < 990) {
            playSound(audio);
        }

        wendyImage.style.transform = 'scale(0.9)';
        setTimeout(() => {
            wendyImage.style.transform = 'scale(1)';
        }, 100);

        if (clickCount >= 1000) {
            win();
        }
    }
}

function win() {
    
    title.style.display = 'none';
    clickCounter.style.display = 'none';
    wendyImage.style.display = 'none';
    
    const winMessage = document.createElement('h1');
    winMessage.textContent = 'You win!';
    winMessage.style.marginTop = '20px';
    document.body.appendChild(winMessage);
    
    const winImage = document.createElement('img');
    winImage.src = 'Screenshot_20240901_190056_Instagram.jpg'; 
    winImage.alt = 'You Win!';
    winImage.style.width = '300px'; 
    winImage.style.marginTop = '20px'; 
    document.body.appendChild(winImage);
    
    playSound(winAudio1);
    playSound(winAudio2);
}

wendyImage.addEventListener('click', handleClick);
