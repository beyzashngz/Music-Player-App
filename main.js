const prevButton = document.getElementById("prev")

const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playListButton = document.getElementById('playlist')

const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton = document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')

let index

let loop = true

let isShuffleActive = false

const songsList = [
    {
        name: "Bang Bang (My Baby Shot me Down)",
        link: "assest/bang.mp3",
        artist: "Nancy Sinatra",
        image: "assest/bang.jpg"
    },
    {
        name: "Rock The Cashbah",
        link: "assest/cashbah.mp3",
        artist: "The Clash ",
        image: "assest/cashbah.jpg"
    },
    {
        name: "Far From Anyroad",
        link: "assest/detective.mp3",
        artist: "The Handsome Family",
        image: "assest/detective.jpg"
    },
    {
        name: "Deniz Üstü Köpürür",
        link: "assest/karaca.mp3",
        artist: "Cem Karaca",
        image: "assest/karaca.jpg"
    },
    {
        name: "Lovers Rock",
        link: "assest/lovers.mp3",
        artist: "TV Girl",
        image: "assest/lovers.jpg"
    },
    {
        name: "Serseri",
        link: "assest/serseri.mp3",
        artist: "Teoman",
        image: "assest/serseri.jpg"
    },
    {
        name: "Soldier Of Fortune",
        link: "assest/soldier.mp3",
        artist: "Deep Purple",
        image: "assest/soldier.jpg"
    },
    {
        name: "Starman",
        link: "assest/starman.mp3",
        artist: "David Bowie",
        image: "assest/starman.jpg"
    },
    {
        name: "Summer Wine",
        link: "assest/summer.mp3",
        artist: "NAnacy Sinatra",
        image: "assest/summer.jpg"
    }
]

//Listeyi Açma-Kapama
playListButton.addEventListener('click', () => {
    playListContainer.classList.remove('hide')
})

closeButton.addEventListener('click', () => {
    playListContainer.classList.add('hide')
})

// Şarkıyı Çalma
const playAudio = () => {
    console.log("playAudio")
    audio.play()
    pauseButton.classList.remove("hide")
    playButton.classList.add("hide")
}
// Şarkıyı Durdurma
const pauseAudio = () => {
    audio.pause()
    pauseButton.classList.add("hide")
    playButton.classList.remove("hide")
}

// zaman formatınnı ayarlama
const timeFormatter = (timeInput) => {
    let minute = Math.floor(timeInput / 60)
    minute = minute < 10 ? '0' + minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 10 ? '0' + second : second
    return `${minute}:${second}`
}

setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
    currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%"
}, 1000);

//Tıklanıldığında Şarkıda istenilen Yere Gidilmesi
progressBar.addEventListener("click", (event) => {
    let coordStart = progressBar.getBoundingClientRect().left

    let coordEnd = event.clientX
    let progress = (coordEnd - coordStart) / progressBar.offsetWidth

    currentProgress.style.width = progressBar * 100 + "%"

    audio.currentTime = progress * audio.duration
    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')
})

//Şarkı Atama
const setSong = (arrayIndex) => {
    if (loop == true && isShuffleActive == true) {
        arrayIndex = Math.floor(Math.random() * 100) % 5
    }
    console.log(arrayIndex + isShuffleActive)//karıştırıcı

    let { name, link, artist, image } = songsList[arrayIndex];
    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image

    audio.onloadedmetadata = () => {
        maxDuration.innerText = timeFormatter(audio.duration);
    }
    playListContainer.classList.add("hide")
    playAudio()
}
setSong(0)



//Sıradakini Çal
const nextSong = () => {
    if (loop) {
        if (index == (songsList.length - 1)) {
            index = 0
        } else {
            index += 1
        }
        setSong(index)
    } else {
        let randIndex = Math.floor(Math.random() * songsList.length)
        setSong(randIndex)
    }
}

//Öncekini Çal
const previousSong = () => {
    console.log('index')
    if (index > 0) {
        index -= 1
    } else {
        index = songsList.length - 1
    }
    setSong(index)
    playAudio()
}

const initializePlaylist = () => {
    for (let i in songsList) {
        playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
        <div class="playlist-image-container"> 
          <img src="${songsList[i].image}"/>
        </div>
        <div class="playlist-song-details">
          <span id="playlist-song-name">
            ${songsList[i].name}
          </span>
          <span id="playlist-song-artist-album">
            ${songsList[i].artist}
          </span>
        </div>
        </li>`
    }
}

//Tıklama Yakalama
nextButton.addEventListener('click', nextSong)
prevButton.addEventListener('click', previousSong)
pauseButton.addEventListener('click', pauseAudio)
playButton.addEventListener('click', playAudio)

/* yukardaki gibi ismini tanıtıp sonra o ismi açarak da tanıtabiliriz, aşağıdaki gibi direkt olarak da tanıtabiliriz */

//Tekrarla
repeatButton.addEventListener("click", () => {
    if (repeatButton.classList.contains("active")) {
        repeatButton.classList.remove('active');
        audio.loop = false
        console.log('tekrar kapatıldı')
    } else {
        repeatButton.classList.add('active');
        audio.loop = true
        console.log('tekrar açıldı')
    }
})

//Karıştır
shuffleButton.addEventListener("click", () => {
    if (shuffleButton.classList.contains("active")) {
        shuffleButton.classList.remove('active');
        audio.loop = true
        console.log('karıştırıcı kapatıldı')
    } else {
        shuffleButton.classList.add('active');
        audio.loop = false
        console.log('karıştırıcı açıldı')
    }
})
// Şarkının Bitişi
audio.onended = () => {
    nextSong()
}

audio.addEventListener('timeupdate', () => {
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})


// Ekran Yüklendiğinde
window.onload = () => {
    index = 0
    setSong(index)
    //durdur ve şarkı listesi oluştur

    pauseAudio()
    initializePlaylist()
}