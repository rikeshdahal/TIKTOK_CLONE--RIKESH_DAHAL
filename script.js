const prev = document.querySelector(".prev i"),
next = document.querySelector(".next i"),
video = document.querySelector(".video__player"),
play_pause = document.querySelector(".play_pause"),
text_name = document.querySelector(".videoFooter__text"),
img_box = document.querySelector(".img");

prev.addEventListener("click", (e) =>{
    prevTrack();
    backwrd();
});
next.addEventListener("click", (e) =>{
    nextTrack();
    fwrd();
});
// Specify globally used value
let track_index = 0;
let isPlaying = false;

// Create the video element for the player
let curr_track = document.createElement('video');
let track_list = [
    {
        path: "https://v16-webapp.tiktok.com/feee2af51a86db6353818de9f08dbc5d/62966c77/video/tos/useast2a/tos-useast2a-pve-0037-aiso/41491a33f5e147749b08e7262e6217d5/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=2146&bt=1073&btag=80000&cs=0&ds=3&ft=eXd.6HFJMyq8Z-SGvwe2Nplhml7Gb&mime_type=video_mp4&qs=0&rc=NmQ1aDc8PDhlPDxkM2hkM0BpM3ZmO2k6ZmlqPDMzZjczM0AwNjQuL19eNl4xMmEzLWItYSNocG1ncjRnMV5gLS1kMWNzcw%3D%3D&l=2022053113284401024524311827310A01"
	},
	{
        path: "https://v16-webapp.tiktok.com/0592a45769552d3bbe4c42d0853618c1/62966413/video/tos/useast2a/tos-useast2a-pve-0037c001-aiso/4303f87604f54523b965de1f97280ffa/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=1740&bt=870&btag=80000&cs=0&ds=3&ft=eXd.6HFJMyq8ZJlYvwe2NfWQml7Gb&mime_type=video_mp4&qs=0&rc=NzU5M2c4O2UzMzM2aDw5N0Bpanl5NzM6ZnZnZDMzZjczM0A2Li00NWIyXjUxLTIvYGExYSMtMzRvcjQwZDFgLS1kMWNzcw%3D%3D&l=20220531125257010245043153062A8B97"
	},
	{
        path: "https://v16-webapp.tiktok.com/edf5a33196923f69106a6e6860b18dfa/62966418/video/tos/useast2a/tos-useast2a-pve-0037c001-aiso/50eb9bf176a042e2a8626cb4f83f4ede/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=2230&bt=1115&btag=80000&cs=0&ds=3&ft=eXd.6HFJMyq8ZJlYvwe2NfWQml7Gb&mime_type=video_mp4&qs=0&rc=NmRlaTs5Omc5MzNkZTk3Z0BpMzxkaWk6ZnF5ZDMzZjczM0AuNDBeYjUuXi8xLjIyMzY0YSNucmVxcjRfby1gLS1kMWNzcw%3D%3D&l=20220531125257010245043153062A8B97"
	},
	{
        path: "https://v16-webapp.tiktok.com/c652798472f22cfd3577679e8df0dcd4/62966419/video/tos/useast2a/tos-useast2a-pve-0037-aiso/1c590f8762684f34bdb88c02e3c6a8b5/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=1618&bt=809&btag=80000&cs=0&ds=3&ft=eXd.6HFJMyq8ZJlYvwe2NfWQml7Gb&mime_type=video_mp4&qs=0&rc=OTc6NmRnPGdnNzM4OjRpO0Bpajl1bDg6Zmh2ZDMzZjczM0A2NTJjYS81NjQxX2I0XmMtYSNkaGNocjQwYC1gLS1kMWNzcw%3D%3D&l=20220531125257010245043153062A8B97"
	},
	{
        path: "https://v16-webapp.tiktok.com/5949c6f9ab430baf03ad0dd7a60457d0/6296642d/video/tos/useast2a/tos-useast2a-pve-0037-aiso/dd3331a51aa24f50ad73e3a0ce7d2c66/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=2110&bt=1055&btag=80000&cs=0&ds=3&ft=eXd.6HFJMyq8ZJlYvwe2NfWQml7Gb&mime_type=video_mp4&qs=0&rc=Omg0OmQ3ODQ8OTVnOjtmZ0BpM3BvOjs6ZjdoPDMzZjczM0BeLS4vLTE1NjUxYmM0YS1jYSNvZ2wxcjRnNG5gLS1kMWNzcw%3D%3D&l=20220531125257010245043153062A8B97"
	},
	
];
let track = [
    "https://v16-webapp.tiktok.com/755f2eda5849d8084d00f838ebd9c3e4/629668d7/video/tos/useast2a/tos-useast2a-pve-0037-aiso/89b8a4e0d4af42508e0047a33b646dbc/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=2546&bt=1273&btag=80000&cs=0&ds=3&ft=eXd.6HFJMyq8Z_BGvwe2NzXQml7Gb&mime_type=video_mp4&qs=0&rc=NDs5Zzc3ZmRlNWRoOWQzM0BpamRlNjY6ZjU0PDMzZjczM0BfLjVgLjFeNjQxMi9hLjIxYSM2b28wcjRnXy1gLS1kMWNzcw%3D%3D&l=20220531131312010245057184222D2276",
    "https://v16-webapp.tiktok.com/0592a45769552d3bbe4c42d0853618c1/62966413/video/tos/useast2a/tos-useast2a-pve-0037c001-aiso/4303f87604f54523b965de1f97280ffa/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=1740&bt=870&btag=80000&cs=0&ds=3&ft=eXd.6HFJMyq8ZJlYvwe2NfWQml7Gb&mime_type=video_mp4&qs=0&rc=NzU5M2c4O2UzMzM2aDw5N0Bpanl5NzM6ZnZnZDMzZjczM0A2Li00NWIyXjUxLTIvYGExYSMtMzRvcjQwZDFgLS1kMWNzcw%3D%3D&l=20220531125257010245043153062A8B97",
    "https://v16-webapp.tiktok.com/edf5a33196923f69106a6e6860b18dfa/62966418/video/tos/useast2a/tos-useast2a-pve-0037c001-aiso/50eb9bf176a042e2a8626cb4f83f4ede/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=2230&bt=1115&btag=80000&cs=0&ds=3&ft=eXd.6HFJMyq8ZJlYvwe2NfWQml7Gb&mime_type=video_mp4&qs=0&rc=NmRlaTs5Omc5MzNkZTk3Z0BpMzxkaWk6ZnF5ZDMzZjczM0AuNDBeYjUuXi8xLjIyMzY0YSNucmVxcjRfby1gLS1kMWNzcw%3D%3D&l=20220531125257010245043153062A8B97",
    "https://v16-webapp.tiktok.com/c652798472f22cfd3577679e8df0dcd4/62966419/video/tos/useast2a/tos-useast2a-pve-0037-aiso/1c590f8762684f34bdb88c02e3c6a8b5/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=1618&bt=809&btag=80000&cs=0&ds=3&ft=eXd.6HFJMyq8ZJlYvwe2NfWQml7Gb&mime_type=video_mp4&qs=0&rc=OTc6NmRnPGdnNzM4OjRpO0Bpajl1bDg6Zmh2ZDMzZjczM0A2NTJjYS81NjQxX2I0XmMtYSNkaGNocjQwYC1gLS1kMWNzcw%3D%3D&l=20220531125257010245043153062A8B97",
    "https://v16-webapp.tiktok.com/5949c6f9ab430baf03ad0dd7a60457d0/6296642d/video/tos/useast2a/tos-useast2a-pve-0037-aiso/dd3331a51aa24f50ad73e3a0ce7d2c66/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=2110&bt=1055&btag=80000&cs=0&ds=3&ft=eXd.6HFJMyq8ZJlYvwe2NfWQml7Gb&mime_type=video_mp4&qs=0&rc=Omg0OmQ3ODQ8OTVnOjtmZ0BpM3BvOjs6ZjdoPDMzZjczM0BeLS4vLTE1NjUxYmM0YS1jYSNvZ2wxcjRnNG5gLS1kMWNzcw%3D%3D&l=20220531125257010245043153062A8B97",
]
let radome_track = track[Math.floor(Math.random()*track.length)]; //sorting items one-by-one and picking them randomly
window.onload = (e)=>{
    video.src = radome_track;
}
// Load the first track in the tracklist
loadTrack(track_index);

// calling the loadTrack function
function loadTrack(track_index) {
    // Load new track
    video.src = track_list[track_index].path;
    curr_track.load(); //loading the firsr track
    curr_track.addEventListener("ended", nextTrack);
}
function playpauseTrack() {
    // Switch between playing and pausing
    // depending on the current state
    if(!isPlaying) playTrack();
    else pauseTrack();
}
video.addEventListener("click", e => {
    pauseTrack();
    console.log(e);
});
// function to pause track
// function pauseTrack() {
//     // pause the loaded track
//     video.pause();
//     isPlaying = false;
//     play_pause.classList.add("show");
//     play_pause.innerHTML = "<i class='bx bx-play' ></i>";

//     setTimeout(()=>{
//         video.play();
//         isPlaying = true;
//         play_pause.innerHTML = "<i class='bx bx-pause' ></i>";
//     },100);

//     setTimeout(()=>{
//         play_pause.classList.remove("show");
//     }, 10000);
// }
function nextTrack() {
    // Go forward to the next track if the
	// current one is the last in the track list
    if(track_index < track_list.length - 1)
    track_index += 1;
    else track_index = 0;

    // Load and play the new track
    loadTrack(track_index);
    playTrack();
}
function prevTrack() {
    // Go back to the last track if the
	// current one is the first in the track list
    if(track_index > 0)
    track_index -= 1;
    else track_index = track_list.length;

    // Load and play the new track
    loadTrack(track_index);
    playTrack();
}
function playTrack() {
	// play the loaded track
	curr_track.play();
	isPlaying = true;
}
function backwrd() {
    // storing username in an array
    idArray = new Array()
    idArray [1] = "R A S H I L A❤️🙏"
    idArray [2] = "MR.MAD_HACKER😎"
    idArray [3] = "RIKESH HACKER🥺"
    idArray [4] = "💫RIKESH💫"
    idArray [5] = "RASU❤️"
  
    randomParagraph = Math.floor(Math.random()*5);
  
    text_name.innerHTML = idArray[randomParagraph + 1] + "<i class='bx bxs-check-circle' style='color: #24eff2'></i>";
}
function fwrd() {
    // storing username in an array
    idArray = new Array()
    idArray [1] = "R A S H I L A❤️🙏"
    idArray [2] = "MR.MAD_HACKER😎"
    idArray [3] = "RIKESH HACKER🥺"
    idArray [4] = "💫RIKESH💫"
    idArray [5] = "RASU❤️"
  
    randomParagraph = Math.floor(Math.random()*5);
  
    text_name.innerHTML = idArray[randomParagraph + 1] + "<i class='bx bxs-check-circle' style='color: #24eff2'></i>";
}
img_box.addEventListener("click", (e) => {
    console.log(e);
    img_box.classList.add("followed");

    setTimeout(()=>{
        img_box.classList.add("fade");
    },1400);
});