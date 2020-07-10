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
	addClassList(_game, 'game_window');
	addClassList(_game, 'flex');
	_game.id = "game_window";
	return _game;
}

function buildBackground(_game){
	addClassList(_game, 'game_background');
}

function buildMenu(_game){
	//build title div
	var _mainMenu = document.createElement('div');
	_mainMenu.id = "main_menu";
	addClassList(_mainMenu, 'game_menu');
	addClassList(_mainMenu, 'flex');
	_game.appendChild(_mainMenu);

	//build title
	var _title = document.createElement('div');
	addClassList(_title, 'game_title')
	_title.id = "game_title"
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
	document.getElementById('main_menu').style.display = 'none';
	runGame();
}

function runGame(){

}