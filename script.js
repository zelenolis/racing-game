// -------------- MAIN VARIABLES --------------

const playWindow = document.querySelector('.play__wrapper');	// main game field

let speed = 5;	// game speed
let score = 0;	// game score

let playerName = '';

let player = 'assets/player3.png';	// player car's image, variable

let tops = [];	// array for counting top players

// keys variables

let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRight = false;

// ingame audio

const click = new Audio();
click.src = 'assets/click.mp3'

const menuMusic = new Audio();
menuMusic.src = 'assets/menumusic.mp3';
menuMusic.volume = 0;
const backgroundMusic = new Audio();
backgroundMusic.src = 'assets/Bad Corey - Mash Up.mp3';
backgroundMusic.volume = 0;

const crash = new Audio();
const crashPolice = new Audio();
crash.src = 'assets/crash.mp3'
crashPolice.src = 'assets/crash-police.mp3'
crash.volume = 0.5;
crashPolice.volume = 0.5;

const engine = new Audio();
engine.src = 'assets/player3.mp3'

//const brakes = new Audio();
//brakes.src = 'assets/brakes.mp3'
//const acceleration = new Audio();
//acceleration.src = 'assets/acceleration.mp3'
const rotateRight = new Audio();
const rotateLeft = new Audio();
rotateRight.src = 'assets/brakes.mp3';
rotateLeft.src = 'assets/brakes.mp3';


// -------------- MAIN PAGE, SCORE AND SETTINGS --------------

const settings = document.querySelector('.setings');
const settingsBack = document.querySelector('.main__back');
const scores = document.querySelector('.score__page');
const scoresBack = document.querySelector('.score__back');
settings.addEventListener('click', openSettings);
settingsBack.addEventListener('click', closeSettings);
scores.addEventListener('click', openScores);
scoresBack.addEventListener('click', closeScores);

function openSettings() {
	click.play();
	const mainPage = document.querySelector('.main__first');
	const settingsPage = document.querySelector('.main__second');
	mainPage.style.position = 'fixed';
	mainPage.style.left = '0';
	mainPage.style.width = '0';
	settingsPage.style.position = '';
	settingsPage.style.right = '';
	settingsPage.style.width = '100%';
	carChoose();
	const musicOn = document.querySelector('.main__music_check');
	musicOn.addEventListener('click', musicToggle);
	const soundsOn = document.querySelector('.main__effects_check');
	soundsOn.addEventListener('click', soundsToggle);
}
function closeSettings() {
	click.play();
	const mainPage = document.querySelector('.main__first');
	const settingsPage = document.querySelector('.main__second');
	mainPage.style.position = '';
	mainPage.style.left = '';
	mainPage.style.width = '100%';
	settingsPage.style.position = 'fixed';
	settingsPage.style.right = '0';
	settingsPage.style.width = '0';
	const musicOn = document.querySelector('.main__music_check');
	musicOn.removeEventListener('click', musicToggle);
	const soundsOn = document.querySelector('.main__effects_check');
	soundsOn.removeEventListener('click', soundsToggle);
}

function openScores() {
	click.play();
	const mainPage = document.querySelector('.main__first');
	const settingsPage = document.querySelector('.main__zero');
	mainPage.style.position = 'fixed';
	mainPage.style.right = '0';
	mainPage.style.width = '0';
	settingsPage.style.position = '';
	settingsPage.style.left = '';
	settingsPage.style.width = '100%';
	tops.splice(0, tops.length);	// deleting top players for aftergame new counts
	scoresCount();
}
function closeScores() {
	click.play();
	const mainPage = document.querySelector('.main__first');
	const settingsPage = document.querySelector('.main__zero');
	mainPage.style.position = '';
	mainPage.style.width = '100%';
	settingsPage.style.position = 'fixed';
	settingsPage.style.left = '0';
	settingsPage.style.width = '0';
	setTimeout(() => {
		mainPage.style.right = '';
	}, 999);
	const yourScore = document.querySelector('.main__zero h2');
	yourScore.innerText = 'Top Score'
}

function carChoose() {
	const playerCars = document.querySelector('.main__cars');
	playerCars.addEventListener('click', playerCarChoosed);
}

function playerCarChoosed(e) {
	if (e.target.tagName.toLowerCase() !== 'img') {return}
	if (e.target.classList.contains('main__car_choosed')) {return}
	click.play();
	const oldCar = document.querySelector('.main__car_choosed');
	oldCar.classList.remove('main__car_choosed');
	e.target.classList.add('main__car_choosed');
	player = e.target.src;
	engineSound = e.target.src.slice(0, -4) //---------------------------------------------------------------- engines sounds
	engine.src = engineSound + '.mp3'
	//engine.play()
	setTimeout(() => {
		engine.pause();
	}, 300)
}

function musicToggle() {
	const systemVolume = document.querySelector('.volume');
	click.play();
	const musicOn = document.getElementById('music-menu');
	if (musicOn.classList.contains('main__check_hidden')) {
		menuMusic.volume = systemVolume.value / 100;
		backgroundMusic.volume = systemVolume.value / 100;
		menuMusic.play();
	} else {
		menuMusic.volume = 0;
		backgroundMusic.volume = 0;
	}
	musicOn.classList.toggle('main__check_hidden');
}

function soundsToggle() {
	const systemVolume = document.querySelector('.volume');
	click.play();
	const soundsOn = document.getElementById('effect-menu');
	if (soundsOn.classList.contains('main__check_hidden')) {
		click.volume = systemVolume.value / 100;
		engine.volume = systemVolume.value / 100;
		//brakes.volume = systemVolume.value / 100;
		//acceleration.volume = systemVolume.value / 100;
		rotateRight.volume = systemVolume.value / 100;
		rotateLeft.volume = systemVolume.value / 100;
		crash.volume = systemVolume.value / 100;
		crashPolice.volume = systemVolume.value / 100;
	} else {
		click.volume = 0;
		engine.volume = 0;
		//brakes.volume = 0;
		//acceleration.volume = 0;
		rotateRight.volume = 0;
		rotateLeft.volume = 0;
		crash.volume = 0;
		crashPolice.volume = 0;
	}
	soundsOn.classList.toggle('main__check_hidden');
}

const systemVolume = document.querySelector('.volume');
systemVolume.addEventListener('input', volumeRange);

function volumeRange() {
	const volumeValue = document.querySelector('.volume__value');
	const systemVolume = document.querySelector('.volume');
	volumeValue.innerText = systemVolume.value;
	const musicOn = document.getElementById('music-menu');
	const soundsOn = document.getElementById('effect-menu');
	if (!musicOn.classList.contains('main__check_hidden')) { menuMusic.volume = systemVolume.value / 100 }
	if (!musicOn.classList.contains('main__check_hidden')) { backgroundMusic.volume = systemVolume.value / 100 }
	if (!soundsOn.classList.contains('main__check_hidden')) { click.volume = systemVolume.value / 100 }
	if (!soundsOn.classList.contains('main__check_hidden')) { engine.volume = systemVolume.value / 100 }
	if (!soundsOn.classList.contains('main__check_hidden')) { rotateRight.volume = systemVolume.value / 100 }
	if (!soundsOn.classList.contains('main__check_hidden')) { rotateLeft.volume = systemVolume.value / 100 }
	if (!soundsOn.classList.contains('main__check_hidden')) { crash.volume = systemVolume.value / 100 }
	if (!soundsOn.classList.contains('main__check_hidden')) { crashPolice.volume = systemVolume.value / 100 }
}

// -------------- GAME START --------------

const gameStartButton = document.querySelector('.start__game');
gameStartButton.addEventListener('click', gameStart);

function gameStart() {
	clearOldGameField();

	const mainPage = document.querySelector('.main');
	mainPage.style = 'transform: translateY(-100%)';

	const footer = document.querySelector('footer');
	footer.style.height = '0';

	const play = document.querySelector('.play');
	play.style = 'height: 100%';

	score = 0;	// set scores to 0 for new game
	const gameScore = document.querySelector('.score');
	gameScore.innerText = '000000'
	playerName = '';	// set player's name to 0 for new game
	tops.splice(0, tops.length);	// deleting top players for aftergame new counts

	createRoadLines();
	createRoadside();
	createPlayerCar();
	createEnemies();
	const start = document.querySelector('.play__start');
	start.classList.remove('play__start_hide')
}

function clearOldGameField() {
	const gamover = document.querySelector('.play__gamover');
	gamover.classList.add('play__gamover_hide');
	playWindow.classList.remove('black__white');
	const tempnodes = document.querySelectorAll('.tempnodes');
	tempnodes.forEach((e) => e.remove())
}


// -------------- CREATING GAME ELEMENTS --------------

function createRoadLines() {
	const playFrame = (window.innerHeight * 0.95);
	const linesLenght = Math.floor(playFrame / 50) + 2;	// 50 - is a road line's height in px

	for (let i = 0; i < linesLenght; i++) {
		let roadDiv = document.createElement('div');
		roadDiv.classList.add('roadline','tempnodes');
		roadDiv.style.top = `${0 + (i * 50)}px`;
		playWindow.appendChild(roadDiv);
	}
}

function createPlayerCar() {
	let playFrame = (window.innerHeight * 0.95);
	if (playFrame > 730) { playFrame = 730 }
	const playerCar = document.createElement('img');
	playerCar.src = player;
	playerCar.classList.add('player__car','tempnodes');
	playerCar.style.top = playFrame - 142 + 'px';
	playerCar.style.left = 350 + 'px';
	playWindow.appendChild(playerCar);
}

function createRoadside() {
	//const playFrame = (window.innerHeight * 0.95);
	//const roadsideLenght = Math.floor(playFrame / 740) + 2;	// 740 - is a roadsede background image's height in px
	const roadsides = document.createDocumentFragment();
	const leftRoadside = document.createElement('div');
	/*
	for (let i = 0; i < roadsideLenght; i++) {
		let roadsideEl = roadsideElement(`left_${i + 1}`);
	}
	*/
	const roadside1 = document.createElement('img');
	const roadside2 = document.createElement('img');
	roadside1.src = 'assets/grass2.png';
	roadside2.src = 'assets/grass2.png';
	roadside1.classList.add('roadside__left_1');
	roadside2.classList.add('roadside__left_2');
	roadside2.style.top = '-740px'
	leftRoadside.classList.add('roadside__left','tempnodes');
	leftRoadside.appendChild(roadside1);
	leftRoadside.appendChild(roadside2);

	const rightRoadside = document.createElement('div');
	const roadside3 = document.createElement('img');
	const roadside4 = document.createElement('img');
	roadside3.src = 'assets/grass2.png';
	roadside4.src = 'assets/grass2.png';
	roadside3.classList.add('roadside__right_1');
	roadside4.classList.add('roadside__right_2');
	roadside4.style.top = '-740px'
	rightRoadside.classList.add('roadside__right','tempnodes');
	rightRoadside.appendChild(roadside3);
	rightRoadside.appendChild(roadside4);


	roadsides.appendChild(leftRoadside);
	roadsides.appendChild(rightRoadside);

	playWindow.appendChild(roadsides);
}

/*
function roadsideElement(num) {
	const roadsideEl = document.createElement('img');
	roadsideEl.src = 'assets/grass2.png';
	roadsideEl.classList.add(`roadside__${num}`);
	return roadsideEl;
}
*/

function createEnemies() {
	const enemies = document.createDocumentFragment();

	// 120 - is a enemy car height in pixels !!! 

	let enemiesNumber = 1 + Math.floor((window.innerHeight * 0.95) / 120);
	if (enemiesNumber > 7) { enemiesNumber = 7 }

	for (let i = 1; i < enemiesNumber; i++) {
		const enemy = createNode();
		enemy.src = `assets/car${i}.png`;
		enemy.style.top = `-${(160 * i) + getRandomHeight()}px`;
		enemy.style.left = getRandomWidth() + 'px';
		enemies.appendChild(enemy);
	}

	playWindow.appendChild(enemies);
}

function createNode() {
	const enemy = document.createElement('img');
	enemy.classList.add('enemy__car','tempnodes');
	return enemy;
}

// -------------- ANIMATIONS AND INGAME CHECKS --------------

function moveRoadLines() {
	const frame = playWindow.getBoundingClientRect();
	const roadLines = document.querySelectorAll('.roadline');

	//roadside block

	const roadsideLeft1 = document.querySelector('.roadside__left_1');
	const roadsideLeft2 = document.querySelector('.roadside__left_2');
	const roadsideRight1 = document.querySelector('.roadside__right_1');
	const roadsideRight2 = document.querySelector('.roadside__right_2');
	let roadsideLeft1Height = roadsideLeft1.getBoundingClientRect();
	let roadsideLeft2Height = roadsideLeft2.getBoundingClientRect();
	let roadsideRight1Height = roadsideRight1.getBoundingClientRect();
	let roadsideRight2Height = roadsideRight2.getBoundingClientRect();
	roadsideLeft1.style.top = `${roadsideLeft1Height.top - frame.top + speed}px`;
	roadsideLeft2.style.top = `${roadsideLeft2Height.top - frame.top + speed}px`;
	roadsideRight1.style.top = `${roadsideRight1Height.top - frame.top + speed}px`;
	roadsideRight2.style.top = `${roadsideRight2Height.top - frame.top + speed}px`;
	if (roadsideLeft1Height.top + frame.top > 740) {roadsideLeft1.style.top = '-740px'}
	if (roadsideLeft2Height.top + frame.top > 740) {roadsideLeft2.style.top = '-740px'}
	if (roadsideRight1Height.top + frame.top > 740) {roadsideRight1.style.top = '-740px'}
	if (roadsideRight2Height.top + frame.top > 740) {roadsideRight2.style.top = '-740px'}

	// enemy cars block

	const enemyCars = document.querySelectorAll('.enemy__car');
	for (let k = 0; k < enemyCars.length; k++) {
		let enemyCarsHeight = enemyCars[k].getBoundingClientRect();
		enemyCars[k].style.top = `${enemyCarsHeight.top - frame.top + speed / 1.5}px`
		if ((enemyCarsHeight.top - frame.top + speed / 1.5) > frame.bottom) {
			enemyCars[k].style.top = `-${190}px`;
			enemyCars[k].style.left = getRandomWidth() + 'px';
		}
	}

	// player car move block

	const leftRoad = document.querySelector('.roadside__left');
	const rightRoad = document.querySelector('.roadside__left');
	const playerLeft = leftRoad.getBoundingClientRect();
	const playerRight = rightRoad.getBoundingClientRect();

	const car = document.querySelector('.player__car');
	const carFrame = car.getBoundingClientRect();
	const up = Number(car.style.top.slice(0, -2));
	const left = Number(car.style.left.slice(0, -2));
	if (moveUp && up > 0) {
		car.style.top = up - speed + 'px';
		//acceleration.play(); //-------------------------------------------------------------- speedy sound
	} else {
		//acceleration.pause();
	}
	if (moveDown && up < frame.height - carFrame.height) {
		car.style.top = up + speed + 'px';
		//brakes.play();
	} else {
		//brakes.pause();
	}
	if (moveLeft && left > playerLeft.width) {
		car.style.left = left - speed + 'px'
		rotateRight.play();
	} else {
		rotateRight.pause();
	}
	if (moveRight && left < frame.width - playerRight.width - carFrame.width) {
		car.style.left = left + speed + 'px'
		rotateLeft.play();
	} else {
		rotateLeft.pause();
	}

	//score block

	const gameScore = document.querySelector('.score');
	score += 0.5;
	if (score % 10 === 0) {
		let scoreStr = String(score);
		for (let p = scoreStr.length; p < 6; p++) {
			scoreStr = '0' + scoreStr;
		}
		gameScore.innerText = scoreStr;
	}

	//road lines block

	for (let i = 0; i < roadLines.length; i++) {
		let roadLineHeight = roadLines[i].getBoundingClientRect();

		roadLines[i].style.top = `${roadLineHeight.top - frame.top + speed}px`

		if (roadLineHeight.top > (frame.bottom + 30)) {
			roadLines[i].style.top = `-40px`;
		}
	}

	if (carsCollision()) {
		gameover();
		return
	} else {
		window.requestAnimationFrame(moveRoadLines);
	}
}

function carsCollision() {
	const enemyCars = document.querySelectorAll('.enemy__car');
	const car = document.querySelector('.player__car');
	const carFrame = car.getBoundingClientRect();
	const gap = 5;	// collision pixels gap for clear visuality 

	for (let z = 0; z < enemyCars.length; z++) {
		let enemyCarsFrame = enemyCars[z].getBoundingClientRect();

		if (carFrame.top < enemyCarsFrame.bottom - gap && carFrame.top > enemyCarsFrame.top && 
			carFrame.right > enemyCarsFrame.left + gap && carFrame.right < enemyCarsFrame.right) {
			return true;
		} else if (carFrame.top < enemyCarsFrame.bottom - gap && carFrame.top > enemyCarsFrame.top && 
			carFrame.left < enemyCarsFrame.right - gap && carFrame.left > enemyCarsFrame.left) {
			return true
		} else if (carFrame.bottom > enemyCarsFrame.top + gap && carFrame.bottom < enemyCarsFrame.bottom 
			&& carFrame.right > enemyCarsFrame.left + gap && carFrame.right < enemyCarsFrame.right) {
			return true
		} else if (carFrame.bottom > enemyCarsFrame.top + gap && carFrame.bottom < enemyCarsFrame.bottom 
			&& carFrame.left < enemyCarsFrame.right - gap && carFrame.left > enemyCarsFrame.left) {
			return true
		}
	}
	return false;
}

function getRandomWidth() {
	const frame = playWindow.getBoundingClientRect();
	return frame.width * 0.25 + Math.floor(Math.random() * (frame.width * 0.5 - 50));
}

function getRandomHeight() {
	return Math.floor(Math.random() * 50);
}


// -------------- CHOOSE DIFFICULT AND DRIVING START --------------

const start = document.querySelector('.play__start');
start.addEventListener('click', animationStarts);

function animationStarts(event) {
	const start = document.querySelector('.play__start');
	if (event.target.classList.contains('easy')) {
		start.classList.add('play__start_hide');
		speed = 5;
		audioGameStart();
		window.requestAnimationFrame(moveRoadLines);
	}
	if (event.target.classList.contains('normal')) {
		start.classList.add('play__start_hide');
		speed = 7;
		audioGameStart();
		window.requestAnimationFrame(moveRoadLines);
	}
	if (event.target.classList.contains('hard')) {
		start.classList.add('play__start_hide');
		speed = 10;
		audioGameStart();
		window.requestAnimationFrame(moveRoadLines);
	}
}

function audioGameStart() {
	menuMusic.pause();
	backgroundMusic.play();
	backgroundMusic.loop = true;
	engine.play();
	engine.loop = true;
}


document.addEventListener('keydown', (e) => {
	if (e.keyCode == 38) {moveUp = true}
	if (e.keyCode == 40) {moveDown = true}
	if (e.keyCode == 37) {moveLeft = true}
	if (e.keyCode == 39) {moveRight = true}
});

document.addEventListener('keyup', (e) => {
	if (e.keyCode == 38) {moveUp = false}
	if (e.keyCode == 40) {moveDown = false}
	if (e.keyCode == 37) {moveLeft = false}
	if (e.keyCode == 39) {moveRight = false}
});



function gameover() {
	const gamover = document.querySelector('.play__gamover');
	gamover.classList.remove('play__gamover_hide');
	playWindow.classList.add('black__white');
	backgroundMusic.pause();
	engine.pause();
	//brakes.pause();
	//acceleration.pause();
	rotateRight.pause();
	rotateLeft.pause();

	crash.play();
	crashPolice.play();

	setTimeout(() => {
		crash.pause();
		crashPolice.pause();
		menuMusic.currentTime = 0;
		menuMusic.play();
	}, 8000);
	
	setTimeout(() => {
		const play = document.querySelector('.play');
		play.style = 'height: 0';

		const endgame = document.querySelector('.endgame');
		endgame.style = 'height: 100%';

		const nameInput = document.getElementById('nickname');
		nameInput.focus();
		nameInput.addEventListener('input', inputWidth);
		nameInput.addEventListener('keyup', sendingScore);
		nameInput.addEventListener('keydown', inputSound);
		window.addEventListener('click', inputFocus);

		const endgameInput = document.querySelector('.engame__input p');
		endgameInput.addEventListener('click', sendingScoreFromClick);

		const footer = document.querySelector('footer');
		footer.style.height = '50px';
	}, 3000);
}

function inputFocus() {
	const nameInput = document.getElementById('nickname');
	nameInput.focus();
}

function inputWidth() {
	this.style.width = (this.value.length * 1.5) + 'vw';
}

function inputSound() {
	click.play();
}

function sendingScore(e) {
	if (e.key !== 'Enter') {return}

	window.removeEventListener('click', inputFocus);
	const endgameInput = document.querySelector('.engame__input p');
	endgameInput.removeEventListener('click', sendingScoreFromClick);

	const nameInput = document.getElementById('nickname');
	playerName = nameInput.value;
	if (playerName === '') { playerName = 'incognito' }
	nameInput.removeEventListener('input', inputWidth);
	nameInput.removeEventListener('keyup', sendingScore);
	nameInput.removeEventListener('keydown', inputSound);
	nameInput.value = '';
	nameInput.style.width = '0';

	pushGameResult();

	const endgame = document.querySelector('.endgame');
	endgame.style = 'height: 0';

	const mainPage = document.querySelector('.main');
	mainPage.style = 'transform: none';
	openScores();
}

function sendingScoreFromClick() {
	window.removeEventListener('click', inputFocus);
	const endgameInput = document.querySelector('.engame__input p');
	endgameInput.removeEventListener('click', sendingScoreFromClick);

	const nameInput = document.getElementById('nickname');
	playerName = nameInput.value;
	if (playerName === '') { playerName = 'incognito' }
	nameInput.removeEventListener('input', inputWidth);
	nameInput.removeEventListener('keyup', sendingScore);
	nameInput.removeEventListener('keydown', inputSound);
	nameInput.value = '';
	nameInput.style.width = '0';

	pushGameResult();

	const endgame = document.querySelector('.endgame');
	endgame.style = 'height: 0';

	const mainPage = document.querySelector('.main');
	mainPage.style = 'transform: none';
	openScores();
}

// adding current scores

function pushGameResult() {
	const yourScore = document.querySelector('.main__zero h2');
	yourScore.innerText = `Your score, ${playerName}: ${Math.round(score)}`

	let currentPlayer = {};

	currentPlayer.name = playerName;
	currentPlayer.scored = Math.round(score);
	tops.push(currentPlayer);

	scoresCount();
	localSaving();
}

function scoresCount() {
	const topName = document.querySelectorAll('.scores__name');
	const topScore = document.querySelectorAll('.scores__scores');

	// get data from local storage
	// tops0, tops2, tops2... is names of player, number is a position in table

	for (let num = 0; num < topName.length; num++) {
		let topPlayer = {};
		if (localStorage.getItem("tops" + num)) {
			topPlayer.name = localStorage.getItem("tops" + num);
			topPlayer.scored = +(localStorage.getItem("topscore" + num));
			tops.push(topPlayer);
		} else {
			topPlayer.name = 'nobody here';
			topPlayer.scored = 0;
			tops.push(topPlayer);
		}
	}

	// sorting array

	tops.sort((a, b) => b.scored - a.scored);

	// creating table

	for (let i = 0; i < topName.length; i++) {
		topName[i].innerText = tops[i].name;
		topScore[i].innerText = tops[i].scored;
	}
}

function localSaving() {
	for (let i = 0; i < 10; i++) {
		localStorage.setItem("tops" + i, tops[i].name);
		localStorage.setItem("topscore" + i, tops[i].scored);
	}
}