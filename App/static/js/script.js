// Select all the elements in the HTML page
// and assign them to a variable

let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

let volume_slider = document.querySelector(".volume_slider");
let volicon = document.getElementById('volicon');
let volbar = document.getElementsByClassName('volbar')[0];
let voldot = document.getElementById('voldot');



let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave');
let download = document.getElementById('download');

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');

// Define the list of tracks that have to be played
let track_list = [
    {
        name: "Winter Blossom",
        artist: "Dept",
        image: "media/images/43.jpg",
        path: "media/audio/Dept_Winter_blossom_feat_Ashley_Alisha_nobody_likes_you_pa.mp3"
    },
    {
        name: "Adrenaline",
        artist: "Aalia",
        image: "media/images/25.jpg",
        path: "media/audio/Aalia - Adrenaline (Italian ver.).mp3"
    },
    {
        name: "I'm Always by Your Side",
        artist: "John Park",
        image: "media/images/29.webp",
        path: "media/audio/John Park - I′m Always by Your Side.mp3"
    },

    {
        name: "What Makes You Beautiful",
        artist: "Zayn Malik",
        image: "media/images/41.jpg",
        path: "media/audio/Dept_Winter_blossom_feat_Ashley_Alisha_nobody_likes_you_pa.mp3"
    },
    {
        name: "Peaches",
        artist: "Justin Bieber",
        image: "media/images/32.jpg",
        path: "media/audio/Peaches.mp3"
    },
    {
        name: "Until I Found You",
        artist: "Stephen Sanchez",
        image: "media/images/38.jpg",
        path: "media/audio/Until_I_Found_You.mp3"
    },
    {
        name: "Make You Mine",
        artist: "Zayn Malik",
        image: "media/images/31.jpg",
        path: "media/audio/Make You Mine.mp3"
    },
    
    {
        name: "Butter",
        artist: "BTS",
        image: "media/images/26.webp",
        path: "media/audio/BTS-Butter.mp3"
    },
    {
        name: "Nothing Gonna Change My Love for You",
        artist: "Stephen Sanchez",
        image: "media/images/42.jpg",
        path: "media/audio/Nothings Gonna Change My Love For You.mp3"
    },
    {
        name: "Closer",
        artist: "Halsey",
        image: "media/images/27.jpg",
        path: "media/audio/Closer.mp3"
    },
    {
        name: "Make It Right",
        artist: "BTS",
        image: "media/images/15.png",
        path: "media/audio/BTS - Make It Right (feat. Lauv).mp3"
    },
    
    {
        name: "Seoul",
        artist: "RM",
        image: "media/images/7.jpg",
        path: "media/audio/RM - seoul (prod. HONNE).mp3"
    },
    {
        name: "Everything Goes",
        artist: "RM",
        image: "media/images/13.jpg",
        path: "media/audio/RM - everythingoes (with Nell).mp3"
    },
    {
        name: "Perfect",
        artist: "Justin Bieber",
        image: "media/images/33.jpg",
        path: "media/audio/Perfect.mp3"
    }
];

        function loadTrack(track_index) {
            // Clear the previous seek timer
            clearInterval(updateTimer);
            resetValues();
            
            // Load a new track
            curr_track.src = track_list[track_index].path;
            curr_track.load();
            
            // Update details of the track
            track_art.src = track_list[track_index].image ;
            track_name.textContent = track_list[track_index].name;
            track_artist.innerHTML = track_list[track_index].artist;
            download.href = track_list[track_index].path;  
            // Set an interval of 1000 milliseconds
            // for updating the seek slider
            updateTimer = setInterval(seekUpdate, 1000);
            
            // Move to the next track if the current finishes playing
            // using the 'ended' event
            curr_track.addEventListener("ended", nextTrack);
            
            }
            
            // Function to reset all values to their default
            function resetValues() {
            curr_time.textContent = "00:00";
            total_duration.textContent = "00:00";
            seek_slider.value = 0;
            }

            function playpauseTrack() {
                // Switch between playing and pausing
                // depending on the current state
                if (!isPlaying) playTrack();
                else pauseTrack();
                }
                
                function playTrack() {
                // Play the loaded track
                curr_track.play();
                isPlaying = true;
                
                // Replace icon with the pause icon
                masterPlay.classList.remove('bi-play-circle');
                masterPlay.classList.add('bi-pause-circle');
                wave.classList.add('active1');
                }
                
                function pauseTrack() {
                // Pause the loaded track
                curr_track.pause();
                isPlaying = false;
                
                // Replace icon with the play icon
                masterPlay.classList.remove('bi-pause-circle');
                masterPlay.classList.add('bi-play-circle');
                wave.classList.remove('active1');
                
                }
                
                function nextTrack() {
                // Go back to the first track if the
                // current one is the last in the track list
                if (track_index < track_list.length - 1)
                    track_index += 1;
                else track_index = 0;
                
                // Load and play the new track
                loadTrack(track_index);
                playTrack();
                }
                
                function prevTrack() {
                // Go back to the last track if the
                // current one is the first in the track list
                if (track_index > 0)
                    track_index -= 1;
                else track_index = track_list.length - 1;
                
                // Load and play the new track
                loadTrack(track_index);
                playTrack();
                }

                const makeAllBackground = () =>{
                    Array.from(document.getElementsByClassName('songitem')).forEach((el)=>{
                        el.style.background = 'rgba(206, 204, 204, 0.0)';
                    })
                }
                const makeAllPlay = () =>{
                    Array.from(document.getElementsByClassName('playlistplay')).forEach((el)=>{
                        el.classList.add('bi-play-circle');
                        el.classList.remove('bi-pause-circle');
                    })
                }
                
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
    
    function seekUpdate() {
    let seekPosition = 0;
    
    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;
    
        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
    
        // Add a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
    
        // Display the updated duration
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;

        let seekbar = parseInt((curr_track.currentTime/curr_track.duration )* 100);
        bar2.style.width = `${seekbar}%`;
        dot.style.left = `${seekbar}%`;    
    }
    };
    
    function seekTo() {
        // Calculate the seek position by the
        // percentage of the seek slider
        // and get the relative duration to the track
        seekto = parseInt(curr_track.duration * (seek_slider.value / 100));
        
        // Set the current track position to the calculated seek position
        bar2.style.width = `${seekto}%`;
        dot.style.left = `${seekto}%`;
        curr_track.currentTime = seekto;

        } 
        


    // Load the first track in the tracklist
    loadTrack(track_index);
    playTrack();


    Array.from(document.getElementsByClassName('playlistplay')).forEach((e)=>{
        e.addEventListener('click',(ele)=>{
            track_index = ele.target.id-1;
            curr_track.src = track_list[track_index].path;
            curr_track.load();
            
            // Update details of the track
            track_art.src = track_list[track_index].image ;
            track_name.textContent = track_list[track_index].name;
            track_artist.innerHTML = track_list[track_index].artist;
            download.href = track_list[track_index].path;
            
            playTrack();

            makeAllBackground();
            Array.from(document.getElementsByClassName('songitem')).style.background[track_index-1] = 'rgba(206, 204, 204, 0.1)';
            });

            makeAllPlay();
            el.target.classList.remove('bi-play-circle');
            el.target.classList.add('bi-pause-circle');
    });

let shuffle = document.getElementsByClassName('shuffle')[0];

shuffle.addEventListener('click',()=>{
let a = shuffle.innerHTML;

switch(a){
case 'next':           
shuffle.classList.remove('bi-repeat-1');
shuffle.classList.remove('bi-shuffle');
shuffle.classList.add('bi-repeat');
shuffle.innerHTML = 'repeat';
break;

case 'repeat':
shuffle.classList.remove('bi-repeat');
shuffle.classList.remove('bi-repeat-1');
shuffle.classList.add('bi-shuffle');           
shuffle.innerHTML = 'random';
break;

case 'random':
shuffle.classList.remove('bi-repeat');
shuffle.classList.remove('bi-shuffle');
shuffle.classList.add('bi-repeat-1');
shuffle.innerHTML = 'next';
break;
} ;
});


const nextmusic = ()=>{
    if(track_index == track_list.length){
        track_index = 1;
    }
    else{
        track_index ++;
    }

    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
    // Update details of the track
    track_art.src = track_list[track_index].image ;
    track_name.textContent = track_list[track_index].name;
    track_artist.innerHTML = track_list[track_index].artist;
    download.href = track_list[track_index].path;
    
    playTrack();
    makebackground();        
    Array.from(document.getElementsByClassName('songitem'))[track_index-1].style.background = 'rgba(206, 204, 204, 0.1)';
    makeplay();
    el.target.classList.remove(bi-play-circle);
    el.target.classList.add(bi-pause-circle);
}

const repeatmusic = ()=>{
    track_index;
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
    // Update details of the track
    track_art.src = track_list[track_index].image ;
    track_name.textContent = track_list[track_index].name;
    track_artist.innerHTML = track_list[track_index].artist;
    download.href = track_list[track_index].path;
    
    playTrack();
    makebackground();
            
    Array.from(document.getElementsByClassName('songitem'))[track_index-1].style.background = 'rgba(206, 204, 204,  0.1)';
    
    makeplay();
    el.target.classList.remove(bi-play-circle);
    el.target.classList.add(bi-pause-circle);
}

const randommusic = ()=>{
    if(track_index == track_list.length){
        track_index = 1;
    }
    else{
        track_index = Math.floor((Math.random() * songs.length) + 1);
    }

    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
    // Update details of the track
    track_art.src = track_list[track_index].image ;
    track_name.textContent = track_list[track_index].name;
    track_artist.innerHTML = track_list[track_index].artist;
    download.href = track_list[track_index].path;
    
    playTrack();
    makebackground();
            
    Array.from(document.getElementsByClassName('songitem'))[track_index-1].style.background = 'rgba(206, 204, 204, .1)';
    
    makeplay();
    el.target.classList.remove(bi-play-circle);
    el.target.classList.add(bi-pause-circle);
    wave.classList.add('active1');
}

curr_track.addEventListener('ended',()=>{
    let b = shuffle.innerHTML;
    switch(b){
        case 'repeat':
            repeatmusic();
            break;

        case 'random':
            randommusic();
            break;

        case 'next':
            nextmusic();
            break;
    }
});