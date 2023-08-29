let header = document.getElementById("header");
let singerImage = document.querySelectorAll("#singerImage");
let singerName = document.querySelectorAll("#singerName");
let sidebar = document.getElementsByClassName("sidebar")[0];
let sidebarBtn = true;
// song api set variable

let trendingSongImage = document.querySelectorAll(".trendingSong #songImage");

let progress = document.getElementById("progress");
let totalDuration = document.getElementById("totalDuration");
let currentTimeOfMugic = document.getElementById("currentTime");
let prev = document.getElementById("prev");
let play = document.querySelectorAll("#play");
let next = document.querySelectorAll("#next");
let logic = document.getElementById('logic');
let logic2 = document.getElementById('logic2');
let miniloader = document.getElementById("miniloader");
let play2 = document.getElementById("play2");
let mugicMainTitle = document.querySelectorAll('#mugicMainTitle');
let singerKaName = document.querySelectorAll("#singerKaName");
let mugicKaImage = document.getElementById("mugicKaImage");
header.onclick = ()=>{
   sidebarToggle()
};// this is for controler slider 



function sidebarToggle(){
   sidebar.classList.toggle('collapse')
    if(sidebarBtn){
        header.classList.replace("fa-bars","fa-xmark")
        sidebarBtn = false
    }else{
        header.classList.replace("fa-xmark","fa-bars")
        sidebarBtn = true
    }
}

let songTypeBox = document.querySelectorAll(".click");


let a = 'bhojpuri_song';
for(let i = 0; i < songTypeBox.length; i++){
   songTypeBox[i].addEventListener('click',(e)=>{
    let fileUrl = e.target.id;

    sidebarToggle()
   //  console.log(fileUrl + "hello")
    document.getElementsByClassName("allSongLoader")[0].style.display = 'flex'

    document.getElementsByClassName("allsong")[0].innerHTML = null;
   
    

    setTimeout(()=>{
      allsong(`${fileUrl}`)
    },100)
    newSongApi(`${fileUrl}`)
    fetch(`${fileUrl}/singersImages.json`).then(response=> response.json())
    .then((singer)=>{

     for(let s = 0; s< singer.length; s++){
        singerImage[s].src = singer[s].singerImages
        singerName[s].textContent = singer[s].singerName
     }

    })

   })
};// this is on click bhojpuri category than call singer images api for display in main box

fetch(`bhojpuri_song/singersImages.json`).then(response=> response.json())
.then((singer)=>{

 for(let s = 0; s< singer.length; s++){
    singerImage[s].src = singer[s].singerImages
    singerName[s].textContent = singer[s].singerName
 }

});// this by default call singerImages api  to display images main box.


let fileUrl = (a??"bhojpuri_song")
let playCtrl = true;
fetch(`${fileUrl}/bhojpuri_trending_song.json`).then((bhojpuri)=>{
    return bhojpuri.json();
}).then((bhoj)=>{

   //  console.log(bhoj);
    //this is trending song's show images
    for(let bh = 0 ; bh<bhoj.length; bh++){
      // this a convertot youtube thambnail to jpg
       let refinedUrl = bhoj[bh].songImageUrl.substr(17,11)
       let songThumbnail = `https://img.youtube.com/vi/${refinedUrl}/mqdefault.jpg`
    //    console.table([songThumbnail])
       trendingSongImage[bh].src = songThumbnail;
    //    trendingSongImage[bh].src = songThumbnail
     // this a convertot youtube thambnail to jpg
        

       document.querySelectorAll('#songTitle')[bh].textContent = bhoj[bh].songName;

    };

     // this is google drive link to convert audio player

     let trendingPlayIcons = document.querySelectorAll(".trplay");
     trendingPlayIcons.forEach((id,index)=>{//this is trendingIcons play system
        id.addEventListener("click",(e)=>{
           let playId = e.target.id.substr(12);

           let driveLink = bhoj[playId].songUrl.substr(32,33);
           let playerLink = `https://drive.google.com/uc?export=download&id=${driveLink}`
           let newRefineUrl = bhoj[playId].songImageUrl.substr(17,11)
           let imageOfSong = `https://img.youtube.com/vi/${newRefineUrl}/mqdefault.jpg`

           let audioSrc = document.getElementById("audioSrc");
           audioSrc.src = playerLink;
           mugicMainTitle[0].innerHTML = bhoj[playId].songName;
           mugicMainTitle[1].textContent = bhoj[playId].songName;
           singerKaName[0].textContent = bhoj[playId].singerName;
           singerKaName[1].textContent = bhoj[playId].singerName;

           mugicKaImage.src = imageOfSong
           miniloader.style.display = "grid";
        // loder ko hide karne ke liye


           trendingPlay();
           //miniPlayer();//this is a mini audio player
        //    andu();
        iconChange("fa-play","fa-pause")
        audioSrc.oncanplay = ()=>{
           miniloader.style.display = "none";
        //makesure you are uncomment mini loader display on at link no. 98
        }
        
        
          
         document.getElementById('play2').onclick = ()=>{
            playPause();
          playPausebutton()

         }
         document.getElementById('play').onclick = ()=>{
            playPause();
          playPausebutton()
         }
         
       


        })
     })
    

  
})//this fetch api closing....


/// this is new api for Normal Songs
/// this is new api for Normal Songs

   function newSongApi(fileUrl) {
    
    fetch(`${fileUrl}/bhojpuri_trending_song.json`).then((bhojpuri)=>{
    return bhojpuri.json();
}).then((bhoj)=>{

    
    //this is trending song's show images
    for(let bh = 0 ; bh<bhoj.length; bh++){
      // this a convertot youtube thambnail to jpg
       let refinedUrl = bhoj[bh].songImageUrl.substr(17,11)
       let songThumbnail = `https://img.youtube.com/vi/${refinedUrl}/mqdefault.jpg`
    //    console.table([songThumbnail])
       trendingSongImage[bh].src = songThumbnail;
    //    trendingSongImage[bh].src = songThumbnail
     // this a convertot youtube thambnail to jpg
        

       document.querySelectorAll('#songTitle')[bh].textContent = bhoj[bh].songName;

    };

     // this is google drive link to convert audio player

    //  let driveLink = bhoj[1].songUrl.substr(32,33);
    //  let playerLink = `https://drive.google.com/uc?export=download&id=${driveLink}`
    //  console.log(playerLink)
     let trendingPlayIcons = document.querySelectorAll(".trplay");
     trendingPlayIcons.forEach((id,index)=>{//this is trendingIcons play system
        id.addEventListener("click",(e)=>{
           let playId = e.target.id.substr(12);

           let driveLink = bhoj[playId].songUrl.substr(32,33);
           let playerLink = `https://drive.google.com/uc?export=download&id=${driveLink}`
        //    console.log(playerLink)

           let audioSrc = document.getElementById("audioSrc");
           audioSrc.src = playerLink;

           let newRefineUrl = bhoj[playId].songImageUrl.substr(17,11)
           let imageOfSong = `https://img.youtube.com/vi/${newRefineUrl}/mqdefault.jpg`

           console.log(imageOfSong)

           mugicMainTitle[0].textContent = bhoj[playId].songName;
           mugicMainTitle[1].textContent = bhoj[playId].songName;
           singerKaName[0].textContent = bhoj[playId].singerName;
           singerKaName[1].textContent = bhoj[playId].singerName;
           mugicKaImage.src = imageOfSong
           miniloader.style.display = "grid";
        // loder ko hide karne ke liye


           trendingPlay();
           //miniPlayer();//this is a mini audio player
        //    andu();
        iconChange("fa-play","fa-pause")
        audioSrc.oncanplay = ()=>{
           miniloader.style.display = "none";
        //makesure you are uncomment mini loader display on at link no. 98
        }
        
        
          
         document.getElementById('play2').onclick = ()=>{
            playPause();
          playPausebutton()

         }
         document.getElementById('play').onclick = ()=>{
            playPause();
          playPausebutton()
         }
         
       


        })
     })
    

  
})}// this is new api close tag




let audioCtrl = true;
// play and Pause Functions
function playPause(){
    if(audioCtrl){
        audioSrc.pause()
        audioCtrl = false
       
      

    }else{
        audioSrc.play()
        audioCtrl = true

    }
}
// icon change Function
function iconChange(ic1,ic2){
    document.getElementsByClassName("fa-play")[0].classList.replace(`${ic1}`,`${ic2}`)
      document.getElementById("play2").classList.replace("fa-play","fa-pause")
}

function trendingPlay(){
    audioSrc.play() 
    miniPlayer();
}


function playPausebutton(){
    if(playCtrl){
        play2.classList.replace('fa-pause','fa-play');
        play[0].classList.replace('fa-pause','fa-play');
        playCtrl = false;
    }else{
        play2.classList.replace('fa-play','fa-pause');
        play[0].classList.replace('fa-play','fa-pause');
        playCtrl = true;
    }
}
function miniaudioPlay(){
    document.getElementsByClassName("mpl")[0].style.border = 'block';
    document.getElementsByClassName("mpl")[0].style.animation = 'block';
    document.getElementsByClassName("innerloader")[0].style.color = 'transparent';
}









function miniPlayer(){
    document.getElementsByClassName("miniPlayer")[0].style.display = "flex";

}


let miniBotton = document.getElementsByClassName('miniBotton')[0];
let minimize = document.getElementsByClassName("minimize")[0];
miniBotton.onclick = ()=>{
    logic2.classList.toggle("hide")
     logic.style.display = "block"
}

minimize.onclick = ()=>{
    logic2.classList.toggle("hide")

    logic.style.display = "none"
    
}


// all audio song 
// all audio song 
// all audio song 
let allSongDiv = document.getElementsByClassName('allsong')[0];
allsong('bhojpuri_song')//this is a bhojpuri song call cetegory
function allsong(songs){
   fetch(`${songs}/songs.json`).then(responseSong => responseSong.json())
   .then((songResult)=>{
     let allSongs =  songResult;
     for(let i = 0; i<allSongs.length; i++){
      let refinedUrl = allSongs[i].songImageUrl.substr(17,11)
      let songThumbnail1 = `https://img.youtube.com/vi/${refinedUrl}/mqdefault.jpg`
     
      let mainSongsV = document.createElement("div");
      mainSongsV.classList = "mainSongs";

      let mainImageBoxV = document.createElement("div");
      mainImageBoxV.className = "mainImageBox";

      let img = document.createElement("img");
      img.id = "mainSongImg";
      img.setAttribute("src",`${songThumbnail1}`)

      let paragraph = document.createElement("p");
      paragraph.id = 'mainSongTitle';

      let mainTitleBoxV = document.createElement("div");
      mainTitleBoxV.className = "mainTitleBox";

      let clicker = document.createElement('div');
      clicker.id = `mainSongId${i}`
      clicker.className = "clickerBox";

     
      mainSongsV.appendChild(mainImageBoxV)
      mainImageBoxV.appendChild(img)
      mainSongsV.appendChild(mainTitleBoxV)
      mainTitleBoxV.appendChild(paragraph)

      allSongDiv.appendChild(mainSongsV)
      mainSongsV.appendChild(clicker)

      mainTitleBoxV.innerHTML = allSongs[i].songName;
      


   }// in thor for loop create songBox

   let mainSongIdBox = document.querySelectorAll(".clickerBox");

 
      document.getElementsByClassName("allSongLoader")[0].style.display = 'none'

 mainSongIdBox.forEach((boxId,index)=>{
   boxId.addEventListener("click",(e)=>{
      // console.log(e.target.id)
      let playId2 = e.target.id.substr(10)


     let songUrl = allSongs[`${playId2}`].songUrl;
     let songImageUrl =  allSongs[`${playId2}`].songImageUrl;
     let songTitle =  allSongs[`${playId2}`].songName;
     let singerName =  allSongs[`${playId2}`].singerName


      let driveLink = allSongs[playId2].songUrl.substr(32,33);
      let playerLink = `https://drive.google.com/uc?export=download&id=${driveLink}`
      let newRefineUrl = allSongs[playId2].songImageUrl.substr(17,11)
      let imageOfSong = `https://img.youtube.com/vi/${newRefineUrl}/mqdefault.jpg`

      let audioSrc = document.getElementById("audioSrc");
      audioSrc.src = playerLink;
      mugicMainTitle[0].innerHTML = songTitle;
      mugicMainTitle[1].textContent = songTitle;
      singerKaName[0].textContent = singerName;
      singerKaName[1].textContent = singerName;

      mugicKaImage.src = imageOfSong
      miniloader.style.display = "grid";
   // loder ko hide karne ke liye


      trendingPlay();
      //miniPlayer();//this is a mini audio player
   //    andu();
   iconChange("fa-play","fa-pause")
   audioSrc.oncanplay = ()=>{
      miniloader.style.display = "none";
   //makesure you are uncomment mini loader display on at link no. 98
   }
   
   
     
    document.getElementById('play2').onclick = ()=>{
       playPause();
     playPausebutton()

    }
    document.getElementById('play').onclick = ()=>{
       playPause();
     playPausebutton()
    }

















      

   })
 })
  




   })//this is allsong close tag
}// that is function close tag for understand some time...




