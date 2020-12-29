const TIME_LIMIT = 15;
var current_time_remaining = TIME_LIMIT;
var correct_answer;
var score = 0;
var isGameOver = false;

window.onload = async() => {
	let data = await promisOfData;
	document.getElementById('visitor_count').innerHTML = "visitor count: " + data.body.body;
	game();
}

const promisOfData = fetch('https://2l10lnusjb.execute-api.us-west-2.amazonaws.com/dev/visitorcount')
.then(response =>{
	return response.json();
})

function addClassList(elem, class_name){
	elem.className += " " + class_name;
}

function addEvent(elem, eventType, handler){
	if(elem.addEventListener){
		elem.addEventListener(eventType, handler, false);
	}
	else if (el.attachEvent){
		elem.attachEvent('on' + eventType, handler);
	}
	else{
		el['on' + eventType] = handler;
	}
}

function game(){
	var _game = buildWindow();
	buildBackground(_game);
	buildMenu(_game);

	document.body.appendChild(_game);
}

function buildWindow(){
	var _game = document.createElement('div');
	_game.id = "game_window";
	addClassList(_game, 'game_window');
	addClassList(_game, 'flex');
	
	return _game;
}

function buildBackground(_game){
	addClassList(_game, 'game_background');
}

function buildMenu(_game){
	//build title div
	var _mainMenu = document.createElement('div');
	_mainMenu.id = "main_menu";
	addClassList(_mainMenu, 'game_canvas');
	addClassList(_mainMenu, 'flex');
	_game.appendChild(_mainMenu);

	//build title
	var _title = document.createElement('div');
	_title.id = "game_title"
	addClassList(_title, 'game_title')
	
	_mainMenu.appendChild(_title);
	var _titleVertOffset = document.createElement('div');
	_titleVertOffset.id = "game_title_vert_offset";
	addClassList(_titleVertOffset,'game_title_vert_offset');
	_mainMenu.appendChild(_titleVertOffset);

	//build options
	var _playButton = document.createElement('div');
	_playButton.id = "play_button";
	addClassList(_playButton, 'play_button');
	addEvent(_playButton, 'click', startGame);
	_mainMenu.appendChild(_playButton);
}

function startGame(){
	isGameOver = false;
	current_time_remaining = TIME_LIMIT;
	score = 0;

	var _mainMenu= document.getElementById('main_menu');
	if(_mainMenu){
		_mainMenu.style.display = 'none';
		_mainMenu.outerHTML = "";
	}
	

	var _mainGame = document.createElement('div');
	_mainGame.id = "main_game";
	addClassList(_mainGame, 'game_canvas');

	var _gameWindow = document.getElementById('game_window');
	_gameWindow.appendChild(_mainGame);
	
	var [_leftChoice, _rightChoice] = buildMainGameWindow(_mainGame);

	runGame(_gameWindow, _leftChoice, _rightChoice);
}

function buildMainGameWindow(_mainGame){
	//build top bar
	var _topBar = document.createElement('div');
	_topBar.id = "top_bar";
	addClassList(_topBar, 'top_bar');
	addClassList(_topBar, 'flex');
	_mainGame.appendChild(_topBar);

	//build timer
	var _timer = document.createElement('div');
	_timer.id = "timer";
	addClassList(_timer, 'timer');
	addClassList(_timer, 'timer_text')
	_timer.innerHTML = current_time_remaining;
	_topBar.appendChild(_timer);

	//build choice container
	var _choiceContainer = document.createElement('div');
	_choiceContainer.id = "choice_container";
	addClassList(_choiceContainer, 'choice_container')
	_mainGame.appendChild(_choiceContainer);

	//build choices
	var _leftChoice = document.createElement('div');
	_leftChoice.id = "left_choice";
	addClassList(_leftChoice, 'choice_button');
	addClassList(_leftChoice, 'flex');
	_choiceContainer.appendChild(_leftChoice);

	var _rightChoice = document.createElement('div');
	_rightChoice.id = "right_choice";
	addClassList(_rightChoice, 'choice_button');
	addClassList(_rightChoice, 'flex');
	_choiceContainer.appendChild(_rightChoice);

	return [_leftChoice, _rightChoice];
}

function runTimer(_timer, setIntervalHandel){
	current_time_remaining -= 1;
	_timer.innerHTML = current_time_remaining;
	if(current_time_remaining <= 0){
		clearInterval(setIntervalHandel);
		isGameOver = true;
		endGame();
	}
}

function runGame(_gameWindow, _leftChoice, _rightChoice){
	var _timer = document.getElementById("timer");
	var setIntervalHandel = setInterval(function(){
		runTimer(_timer, setIntervalHandel);
	}, 1000);

	generateAnswers(_leftChoice, _rightChoice);

	//set answer listeners
	addEvent(_leftChoice, 'click', function(){judgeAnswer(_leftChoice.innerHTML, _leftChoice, _rightChoice)});
	addEvent(_rightChoice, 'click', function(){judgeAnswer(_rightChoice.innerHTML, _leftChoice, _rightChoice)});

}

function generateAnswers( _leftChoice, _rightChoice){
	var answers = [];
	answers.push(Math.floor(Math.random() * 10));
	answers.push(Math.floor(Math.random() * 10));
	while(answers[1] == answers[0]){
		answers[1] = Math.floor(Math.random() * 10);
	}

	var pick = Math.floor(Math.random() * 2);

	_leftChoice.innerHTML = answers[0];
	_rightChoice.innerHTML = answers[1];
	
	correct_answer = answers[pick];
	console.log("correct answer is " + correct_answer)
}

function judgeAnswer(ans, _leftChoice, _rightChoice){
	if(isGameOver){
		return;
	}
	if(correct_answer == parseInt(ans)){
		console.log("right answer");
		score++;
	}
	else{
		console.log("wrong answer");
	}

	console.log("score: " + score);
	generateAnswers(_leftChoice, _rightChoice);
}

function endGame(){
	var _mainGame = document.getElementById('main_game');
	document.getElementById('main_game').innerHTML = "";

	var _scoreScreenContainer = document.createElement('div');
	_scoreScreenContainer.id = "score_screen_container";
	addClassList(_scoreScreenContainer, 'flex');
	addClassList(_scoreScreenContainer, 'game_canvas');

	var _scoreTitle = document.createElement('div');
	_scoreTitle.id = "score_title";
	_scoreTitle.innerHTML = "Your Score:";
	addClassList(_scoreTitle, 'score_title');
	_scoreScreenContainer.appendChild(_scoreTitle);

	var _score = document.createElement('div');
	_score.id = "score";
	_score.innerHTML = score;
	addClassList(_score, 'score');
	_scoreScreenContainer.appendChild(_score);

	var _replayButton = document.createElement('div');
	_replayButton.id = "replay_button";
	addClassList(_replayButton, 'replay_button');
	addEvent(_replayButton, 'click', function(){
		score_screen_container.outerHTML = "";
		_mainGame.outerHTML = "";
		startGame();
	});
	_scoreScreenContainer.appendChild(_replayButton);


	_mainGame.appendChild(_scoreScreenContainer);
	if(score > 30){
		console.log("01110110 01100101 01110011 01110000 01100101 01110010 00100000 01100001 01110010 01100101 00100000 01110010 01101001 01110011 01101001 01101110 01100111");
	}
	else{
		console.log("01110100 01101000 01100101 00100000 00110011 00111001 00100000 01100011 01101100 01110101 01100101 01110011");
	}
	
}