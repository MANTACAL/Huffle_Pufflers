document.addEventListener("DOMContentLoaded", () => {
    
    /* --- 1. THE LUMOS / NOX SPELL (Light/Dark Mode) --- */
    const spellBtn = document.getElementById("lumos-toggle");
    const spellText = document.getElementById("spell-text");
    const body = document.body;

    spellBtn.addEventListener("click", () => {
        body.classList.toggle("lumos-active");
        
        if (body.classList.contains("lumos-active")) {
            spellText.innerText = "NOX";
            spellBtn.style.background = "linear-gradient(135deg, #111, #333)";
            spellBtn.style.color = "#FFC500";
            spellBtn.style.boxShadow = "0 0 15px rgba(0,0,0,0.6)";
        } else {
            spellText.innerText = "LUMOS";
            spellBtn.style.background = "";
            spellBtn.style.color = "";
            spellBtn.style.boxShadow = "";
        }
    });

    /* --- 2. HOWLER WAND VOTING SYSTEM --- */
    const wandButtons = document.querySelectorAll(".wand-btn.upvote");

    wandButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            const countSpan = this.querySelector(".count");
            let currentVotes = parseInt(countSpan.innerText);

            if (!this.classList.contains("voted")) {
                this.classList.add("voted");
                countSpan.innerText = currentVotes + 1;
                this.innerHTML += ' <i class="fa-solid fa-sparkles" style="color:yellow;"></i>';
            } else {
                this.classList.remove("voted");
                countSpan.innerText = currentVotes - 1;
                const sparkles = this.querySelector(".fa-sparkles");
                if(sparkles) sparkles.remove();
            }
        });
    });

    /* --- 3. WIZARDING WIRELESS AUDIO PLAYER & PENSIEVE SYNC --- */
    const masterPlayBtn = document.getElementById("master-play");
    const audioTrack = document.getElementById("anthem-audio");
    const pensieveSwirl = document.querySelector(".magic-swirl");
    const waveBars = document.querySelectorAll(".sound-wave span");
    let isPlaying = false;
    let simInterval;

    masterPlayBtn.addEventListener("click", () => {
        if (!isPlaying) {
            // Attempt to play user's file, fallback to visual simulation if no mp3 dropped yet
            audioTrack.play().catch(() => console.log("No audio source loaded yet. Running simulation."));
            
            masterPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            pensieveSwirl.style.animationDuration = "2.5s"; // Spin water faster!
            
            // Randomize equalizer bars
            simInterval = setInterval(() => {
                waveBars.forEach(bar => {
                    bar.style.height = Math.floor(Math.random() * 25) + 5 + "px";
                });
            }, 120);

            isPlaying = true;
        } else {
            audioTrack.pause();
            masterPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            pensieveSwirl.style.animationDuration = "10s"; // Slow back down
            clearInterval(simInterval);
            waveBars.forEach(bar => bar.style.height = "5px"); // Flatten equalizer

            isPlaying = false;
        }
    });

    audioTrack.addEventListener("ended", () => {
        masterPlayBtn.click(); // Auto reset UI when song ends
    });
});