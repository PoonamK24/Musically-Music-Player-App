let audio = document.querySelector("audio");
let playpause_btn = document.querySelector(".playpause-track");

let masterPlay = document.getElementById('masterPlay');

let seek_slider = document.querySelector(".seek_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

let track_index = document.getElementById('sid');
let isPlaying = false;
let updateTimer;

  // Update details of the track 
  // Set an interval of 1000 milliseconds
  // for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);
  
  // Move to the next track if the current finishes playing
  // using the 'ended' event
  
  // Function to reset all values to their default
  function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
  }

function toggleAudio () {
  if (audio.paused) {
    audio.play();
    masterPlay.classList.remove('bi-play-circle');
    masterPlay.classList.add('bi-pause-circle');
  } else {
    audio.pause();
    masterPlay.classList.remove('bi-pause-circle');
    masterPlay.classList.add('bi-play-circle');              
  }
}

function seekUpdate() {
  let seekPosition = 0;
  
  // Check if the current track duration is a legible number
  if (!isNaN(audio.duration)) {
      seekPosition = audio.currentTime * (100 / audio.duration);
      seek_slider.value = seekPosition;
  
      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(audio.currentTime / 60);
      let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(audio.duration / 60);
      let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);
  
      // Add a zero to the single digit time values
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
  
      // Display the updated duration
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;

      let seekbar = parseInt((audio.currentTime/audio.duration )* 100);
      bar2.style.width = `${seekbar}%`;
      dot.style.left = `${seekbar}%`;    
  }
  };
  
function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
    seekto = parseInt(audio.duration * (seek_slider.value / 100));
    
    // Set the current track position to the calculated seek position
    bar2.style.width = `${seekto}%`;
    dot.style.left = `${seekto}%`;
    audio.currentTime = seekto;

    } 

function audioEnded () {
  masterPlay.classList.remove('bi-pause-circle');
  masterPlay.classList.add('bi-play-circle');
}


let volume_slider = document.querySelector(".volume_slider");
let volicon = document.getElementById('volicon');
let volbar = document.getElementsByClassName('volbar')[0];
let voldot = document.getElementById('voldot');

function setVolume() {

    if(volume_slider.value == 0){
        volicon.classList.remove('bi-volume-up-fill');
        volicon.classList.remove('bi-volume-down-fill');
        volicon.classList.add('bi-volume-off-fill');
    }

    if(volume_slider.value > 0){
        volicon.classList.remove('bi-volume-up-fill');
        volicon.classList.add('bi-volume-down-fill');
        volicon.classList.remove('bi-volume-off-fill');
    }

    if(volume_slider.value > 50){
        volicon.classList.add('bi-volume-up-fill');
        volicon.classList.remove('bi-volume-down-fill');
        volicon.classList.remove('bi-volume-off-fill');
    }

    // Set the volume according to the
    // percentage of the volume slider set
    let vol = volume_slider.value

    volbar.style.width = `${vol}%`;
    voldot.style.left = `${vol}%`;
    curr_track.volume =  vol / 100;
}

audio.ontimeupdate = seekUpdate();
audio.onended = audioEnded;

