
let previous = document.querySelector('#pre');
let play = document.querySelector('#play1');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume1');
let vol_show = document.querySelector('#vol_show');
let slider = document.querySelector('#dur_slider');
let show_duration = document.querySelector('#show_dur');
let track_image = document.querySelector('#track');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#Artist');
let download = document.querySelector('.download');


let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');


//All songs list
let All_song = [
	{
		name: "Phir-na-Aisi-Raat-Ayegi",
		path: "music/phir.mp3",
		img: "https://tse1.mm.bing.net/th?id=OIP.jhZe5w-7TsnJRK6s8lyYIAHaE8&pid=Api&P=0",
		singer: "Arijit Singh",
		
		
	},

	{
		name: "Heat-Waves",
		path: "music/heatwaves.mp3",
		img: "https://store-images.s-microsoft.com/image/apps.3727.14315883704021901.02fe356b-020f-46e9-8e4f-0ee091c3e939.1f932461-6e6d-45e7-83cc-95d68bf8b07c?mode=scale&q=90&h=1080&w=1920&format=jpg",
		singer: "Glass Animals",
		//down:"https://drive.google.com/uc?export=download&id=1kHhv9RIC_fcNCPzPEUjVMEYs5fDHS6tc"
	},
	{
		name: "Dil-By Shreya Ghoshal",
		path: "music/dil.mp3",
		img: "https://tse3.mm.bing.net/th?id=OIP.W1akON2mp-MUVbZI3SNq5QHaEK&pid=Api&P=0",
		singer: "Shreya Ghoshal",
		//down:""
	},

    
	{
		name: "Mashup",
		path: "music/mashup.mp3",
		img: "https://bestwap4u.com/wp-content/uploads/2022/08/Galliyan-Mashup-Mp3-Song-Download-.jpg",
		singer: "Shreya Ghoshal",
		//down:""
	},


	{
		name: "Asqon Ki Tarah ",
		path: "music/ashqon.mp3",
		img: "https://m.media-amazon.com/images/I/51IM31VqfvL.jpg",
		singer: "Hardik Bhardwaj",
		//down:""
	},
	{
		name: "Dou You Know",
		path: "music/do.mp3",
		img: "https://tse3.mm.bing.net/th?id=OIP.X06J9X8JdMnRegXf6UNMSQAAAA&pid=Api&P=0",
		singer: "Diljit Dosanjh",
		//down:""
	},
	{
		name: "Dillagi",
		path: "music/dillagi.mp3",
		img: "https://images.newsx.com/wp-content/uploads/2016/06/tumhe-dillagi-featuring-huma-and-Vidyut-768x432.jpg",
		singer: "Rahat Fateh Ali Khan",
		//down:""
	},
	{
		name: "Chal Ghar Chale",
		path: "music/no.mp3",
		img: "https://1.bp.blogspot.com/-IIInp8AedmY/X8IUbjQqrkI/AAAAAAAAE00/rYxweLTQzuggIDN4ZMi4kbhrPsW-cCnegCNcBGAsYHQ/s16000/Chal%2BGhar%2BChalen%2BLyrics%2B-%2BMalang%2BArijit%2BSingh.jpg",
		singer: "Mithoon",
		//down:""
	}
];


// All functions


// function load the track
function load_track(index_no) {
	clearInterval(timer);
	reset_slider();
	
	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;
	track_image.src = All_song[index_no].img;
   // download.href=All_song[index_no].down;
	artist.innerHTML = All_song[index_no].singer;

	track.load();

	timer = setInterval(range_slider, 1000);
	total.innerHTML = All_song.length;
	present.innerHTML = index_no + 1;
}

load_track(index_no);

//mute sound function
function mutesound() {
	track.volume = 0;
	volume.value = 0;
	vol_show.innerHTML = 0;
	vol_icon.innerHTML = '<i class="bi bi-volume-mute-fill"></i>'

}


// checking.. the song is playing or not
function justplay() {
	if (Playing_song == false) {
		playsong();

	} else {
		pausesong();
	}
}


// reset song slider
function reset_slider() {
	slider.value = 0;
}

// play song
function playsong() {
	track.play();
	Playing_song = true;
	play.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
}

//pause song
function pausesong() {
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
}


// next song
function next_song() {
	if (index_no < All_song.length - 1) {
		index_no += 1;
		load_track(index_no);
		playsong();
	} else {
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}


// previous song
function pre_song() {
	if (index_no > 0) {
		index_no -= 1;
		load_track(index_no);
		playsong();

	} else {
		index_no = All_song.length;
		load_track(index_no);
		playsong();
	}
}


// change volume
function volume_change() {
	vol_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}

// change slider position 
function change_dur() {
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

// autoplay function
function autoplayy() {
	if (autoplay == 1) {
		autoplay = 0;
		auto_play.style.background = "rgba(255,255,255,0.2)";
	} else {
		autoplay = 1;
		auto_play.style.background = "#FF8A65";
	}
}

function dld(){
alert("Sorry,Download is not available")
}

function range_slider() {
	let position = 0;

	// update slider position
	if (!isNaN(track.duration)) {
		position = track.currentTime * (100 / track.duration);
		slider.value = position;
	}


	// function will run when the song is over
	if (track.ended) {
		play.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
		if (autoplay == 1) {
			index_no += 1;
			load_track(index_no);
			playsong();
		}
	}
}



