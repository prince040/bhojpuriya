import { songs } from "./mugicLibrary.js";

let wrapper = document.getElementById("wrapper");


for(let i = 0; i<songs.length; i++){
    let mugicBox = document.createElement("div")
    mugicBox.className = "mugicBox";

    let mugicImg = document.createElement("div")
    mugicImg.className = "mugicImg";

    let img = document.createElement("img");
    img.className = "mugicThambnail"

    
    
    let mugicName = document.createElement("div")
    mugicName.className = "mugicName";


    wrapper.appendChild(mugicBox)
    mugicBox.appendChild(mugicImg)
    mugicBox.appendChild(mugicName)
    mugicImg.appendChild(img)

};
let  mugicName =  document.querySelectorAll(".mugicName");
let  mugicImage =  document.querySelectorAll(".mugicThambnail");
let audio = document.getElementById("audio");
let downloadAudio = document.getElementById("downloadBtn");

for(let a =0; a < mugicName.length; a++){
    mugicName[a].addEventListener("click",(e)=>{
        // alert(e.target.id)
       audio.src = `mugic/${e.target.id}.mp3`
       audio.play()
       console.log(e.target.innerHTML)
       document.getElementById("snName").innerHTML = e.target.innerHTML
       document.getElementById("snImage").src = `images/${e.target.id}.jpg`
       downloadAudio.href = `mugic/${e.target.id}.mp3`
       downloadAudio.download = e.target.id;
    })
   
}
songs.forEach((songname,index)=>{
    mugicName[index].innerHTML = songname.songName;
    mugicImage[index].setAttribute("src",`images/${songname.songImage}.jpg`)
    mugicName[index].setAttribute("id",`${songname.songSrc}`)
    


})

const progress = document.getElementById("range");
const mugicName1 = document.getElementById("snName") ;
const singer = document.getElementById("singer") ;
const snImage = document.getElementById("snImage") ;
const startTime = document.getElementById("startTime") ;
const endTime = document.getElementById("endTime") ;
const prev = document.getElementById("prev") ;
const playBtn = document.getElementById("playBtn") ;
const next = document.getElementById("next") ;
let playIcons = document.getElementsByClassName("playicons")[0]
let downArrow = document.getElementById('down');
let songInfo = document.getElementsByClassName("songInfo")[0];

let hide = document.querySelectorAll('.hide');
let audioUI =  document.getElementsByClassName("audioUI")[0];
let hideCtrl = true;

downArrow.addEventListener("click",()=>{
    if(hideCtrl){
        hide.forEach((hides,ind)=>{
            hide[ind].style.display = "none"
            hideCtrl = false;
        });

        audioUI.style.top = "92.5vh";
        document.getElementsByTagName("header")[0].style.width= "50px"
        document.getElementsByTagName("header")[0].style.padding= "0px"
        document.getElementsByClassName("audioUI")[0].style.background = "rgb(29, 9, 43)"

    }else{
        hide.forEach((hides,ind)=>{
            hide[ind].style.display = "flex"
            hideCtrl = true;
        audioUI.style.top = "0"
    

        })

    
        

        document.getElementsByTagName("header")[0].style.width= "100%"
        document.getElementsByTagName("header")[0].style.padding= "0px 20px"
        document.getElementsByClassName("audioUI")[0].style.background = "";


    }

    audioUI.classList.toggle("resize")
  
  
})





songInfo.onclick = ()=>{
    hide.forEach((hides,ind)=>{
        hide[ind].style.display = "flex"
        hideCtrl = true;
    audioUI.style.top = "0"


    })


    

    document.getElementsByTagName("header")[0].style.width= "100%"
    document.getElementsByTagName("header")[0].style.padding= "0px 20px"
    document.getElementsByClassName("audioUI")[0].style.background = "";




audioUI.classList.toggle("resize")
}
  



let controlBtn = true;


playBtn.addEventListener("click",()=>{

    if(controlBtn){
        audio.play();
        playIcons.classList.replace('fa-play','fa-pause')
     
        controlBtn = false;
    }else{
        audio.pause()
        playIcons.classList.replace('fa-pause','fa-play')
        controlBtn = true;
    }
});

audio.onloadedmetadata = function(){
    progress.max = audio.duration;
    progress.value = audio.currentTime;

    endTime.textContent = (audio.duration/60).toFixed(2);


    let totalDur = audio.duration;

   

    setInterval(()=>{
        if(audio.currentTime === totalDur){
            nextSong();

        }
    },1000)



}


progress.addEventListener("change",()=>{
    audio.play();
    audio.currentTime = progress.value;
    playIcons.classList.replace('fa-play','fa-pause')
  
        controlBtn = false;

})

if(audio.play()){
    setInterval(()=>{
        progress.value = audio.currentTime;
        let auTIme = audio.currentTime;
        startTime.textContent = auTIme.toFixed(0);
    

    },1000);
    playIcons.classList.replace('fa-play','fa-pause')


}

let songsIndex = 0;
function loadsong(songs){

    mugicName1.textContent = songs.songName;
    singer.textContent = songs.singerName;
      audio.src = `mugic/${songs.songSrc}.mp3`
    document.getElementById("snImage").src = `images/${songs.songImage}.jpg`
     
      downloadAudio.href = `mugic/${songs.songSrc}.mp3`
      downloadAudio.download = songs.singerName;
    

} 



let nextSong = () =>{
    songsIndex = (songsIndex + 1)% songs.length;
    loadsong(songs[songsIndex]);
    audio.play()
    // playIcons.classList.replace('fa-play','fa-pause')
    console.clear()


}


let prevSong = () =>{
    songsIndex = (songsIndex - 1+ songs.length) % songs.length ;
    loadsong(songs[songsIndex]);
    audio.play()
    console.clear()

}

next.addEventListener("click",nextSong)
prev.addEventListener("click",prevSong)




// setInterval(()=>{
// let ac = audio.currentTime.toFixed(0);



 

// },1000)






