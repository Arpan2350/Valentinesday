let player;
let currentMonthIndex = 0;
let slideTimer;
let isPlaying = true;
let currentSlideIndex = 0;

// Full Journey Data (Original - unchanged)
const journey = [
    {
        month: "July 2025",
        story: "In July, we were just two strangers. But then came that first hello that changed my world forever. I still remember the butterflies I felt when I first heard your voice. Little did I know, that was the beginning of my forever.",
        images: ["june1.jpg", "june2.jpg", "july3.jpg"]
    },
    {
        month: "August 2025",
        story: "August was about late-night calls and the realization that I never wanted to stop talking to you. Our conversations flowed like they were meant to be, and with each passing day, I found myself falling deeper.",
        images: ["aug1.jpg", "aug2.jpg", "aug3.jpg"]
    },
    {
        month: "September 2025",
        story: "The rain became more beautiful because I had you to share the silence with. We discovered our shared love for cozy evenings and meaningful conversations that stretched into the early hours.",
        images: ["sept1.jpg", "sept2.jpg", "sept3.jpg", "sept4.jpg", "sept5.jpg", "sept6.jpg"]
    },
    {
        month: "October 2025",
        story: "Every festival and every celebration was just an excuse to see you smile. You brought colors to my world that I never knew existed, and with you, every moment felt like a celebration.",
        images: ["oct1.jpg", "oct2.jpg", "oct3.jpg"]
    },
    {
        month: "November 2025",
        story: "Thankful doesn't even begin to describe how I felt about us this month. Gratitude filled my heart every day for having you in my life. You became my safe place, my comfort, my home.",
        images: ["nov1.jpg", "nov2.jpg", "nov3.jpg"]
    },
    {
        month: "December 2025",
        story: "Closing the year with you was the best gift 2025 gave me. As fireworks lit up the sky, I realized no display could compare to the light you bring into my life. You are my greatest wish come true.",
        images: ["dec1.jpg", "dec2.jpg", "dec3.jpg"]
    },
    {
        month: "January 2026",
        story: "Started the new year with a new promise: To love you more with every passing heartbeat. With you by my side, I faced the new year with hope, joy, and endless possibilities.",
        images: ["jan1.jpg", "jan2.jpg", "jan3.jpg"]
    },
    {
        month: "February 2026",
        story: "And here we are. My favorite person, my favorite story. Every memory we've created is a treasure I hold close to my heart. Happy Valentine's Day, my love. Here's to forever with you.",
        images: ["feb1.jpg"]
    }
];

// YouTube API
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'W1y8blwMLxY',
        playerVars: {
            'autoplay': 0,
            'loop': 1,
            'playlist': 'W1y8blwMLxY',
            'controls': 0,
            'modestbranding': 1,
            'rel': 0
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    event.target.setVolume(50);
    // Music toggle functionality
    document.getElementById('music-toggle').addEventListener('click', function() {
        if (isPlaying) {
            player.pauseVideo();
            this.querySelector('span').textContent = 'Music: Off';
            this.querySelector('i').style.opacity = '0.5';
            isPlaying = false;
        } else {
            player.playVideo();
            this.querySelector('span').textContent = 'Music: On';
            this.querySelector('i').style.opacity = '1';
            isPlaying = true;
        }
    });
    
    // Volume control
    document.getElementById('volume-slider').addEventListener('input', function(e) {
        player.setVolume(e.target.value);
    });
}

function startExperience() {
    document.getElementById('opener').classList.add('hidden');
    document.getElementById('cinema-stage').classList.remove('hidden');
    player.playVideo();
    updateProgressBar();
    generateChapterDots();
    loadChapter();
}

function loadChapter() {
    const data = journey[currentMonthIndex];
    
    // Update month display
    document.getElementById('chap-index').innerText = `CHAPTER ${String(currentMonthIndex + 1).padStart(2, '0')}`;
    document.getElementById('month-title').innerText = data.month;
    document.getElementById('month-story').innerText = data.story;
    document.getElementById('story-date').innerText = data.month;
    
    // Update photo container
    const container = document.getElementById('photo-container');
    container.innerHTML = '';
    
    // Create slideshow images
    data.images.forEach((imgSrc, index) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.className = `slide-img ${index === 0 ? 'active' : ''}`;
        img.alt = `Memory from ${data.month} - ${index + 1}`;
        container.appendChild(img);
    });
    
    // Update photo counter
    currentSlideIndex = 0;
    updatePhotoCounter();
    
    // Update chapter dots
    updateChapterDots();
    
    // Update progress bar
    updateProgressBar();
    
    // Update navigation buttons
    updateNavButtons();
    
    // Start slideshow
    startSlideshow();
    
    // Hide final climax when navigating chapters
    document.getElementById('final-climax').classList.add('hidden');
    document.getElementById('chapter-wrap').classList.remove('hidden');
}

function updatePhotoCounter() {
    const currentData = journey[currentMonthIndex];
    const totalPhotos = currentData.images.length;
    document.getElementById('photo-count').textContent = `${currentSlideIndex + 1}/${totalPhotos}`;
}

function updateProgressBar() {
    const progress = ((currentMonthIndex + 1) / journey.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `Chapter ${currentMonthIndex + 1} of ${journey.length}`;
}

function generateChapterDots() {
    const dotsContainer = document.getElementById('chapter-dots');
    dotsContainer.innerHTML = '';
    
    journey.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `chapter-dot ${index === currentMonthIndex ? 'active' : ''}`;
        dot.addEventListener('click', () => {
            currentMonthIndex = index;
            loadChapter();
        });
        dotsContainer.appendChild(dot);
    });
}

function updateChapterDots() {
    const dots = document.querySelectorAll('.chapter-dot');
    dots.forEach((dot, index) => {
        if (index === currentMonthIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function updateNavButtons() {
    const prevBtn = document.getElementById('prev-chapter-btn');
    const nextBtn = document.getElementById('next-chapter-btn');
    
    prevBtn.disabled = currentMonthIndex === 0;
    nextBtn.disabled = currentMonthIndex === journey.length - 1;
}

function startSlideshow() {
    clearInterval(slideTimer);
    
    const slides = document.querySelectorAll('.slide-img');
    if (slides.length > 1) {
        slideTimer = setInterval(() => {
            slides[currentSlideIndex].classList.remove('active');
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            slides[currentSlideIndex].classList.add('active');
            updatePhotoCounter();
        }, 4000); // Change every 4 seconds
    }
}

function nextChapter() {
    if (currentMonthIndex < journey.length - 1) {
        currentMonthIndex++;
        loadChapter();
        
        // Smooth scroll to top on mobile
        if (window.innerWidth < 768) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } else {
        // Reached the end (Chapter 8) - Show final climax AND Valentine popup
        document.getElementById('chapter-wrap').classList.add('hidden');
        document.getElementById('final-climax').classList.remove('hidden');
        
        // NEW: Show Valentine popup after a short delay
        setTimeout(() => {
            showValentinePopup();
        }, 1000);
    }
}

function prevChapter() {
    if (currentMonthIndex > 0) {
        currentMonthIndex--;
        loadChapter();
        
        // Smooth scroll to top on mobile
        if (window.innerWidth < 768) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}

// Original claimGift function (preserved)
function claimGift() {
    const giftBtn = document.getElementById('amazon-btn');
    const giftContainer = document.querySelector('.gift-container');
    const giftIcon = document.querySelector('.gift-icon i');
    
    // Disable multiple clicks
    giftContainer.style.pointerEvents = 'none';
    
    // Change gift icon
    if (giftIcon) {
        giftIcon.className = 'fas fa-gift';
        giftIcon.style.animation = 'spin 1s linear 3';
    }
    
    // Update text
    const giftHint = giftContainer.querySelector('.gift-hint');
    if (giftHint) {
        giftHint.textContent = 'Opening your surprise...';
    }
    
    // Countdown effect
    let count = 3;
    const countdown = setInterval(() => {
        if (giftHint) {
            giftHint.textContent = `Opening in ${count}...`;
        }
        count--;
        
        if (count < 0) {
            clearInterval(countdown);
            
            // Show the gift with celebration
            if (giftBtn) giftBtn.classList.remove('hidden');
            if (giftHint) giftHint.textContent = 'Surprise revealed!';
            if (giftIcon) giftIcon.style.color = '#FF9900'; // Amazon orange
            
            // Add celebration effects
            createConfetti();
            
            // Make gift link pulse
            if (giftBtn) giftBtn.style.animation = 'pulse 1s infinite';
        }
    }, 1000);
}

// Original createConfetti function (preserved)
function createConfetti() {
    const colors = ['#ff4d6d', '#ffd166', '#FF9900', '#06d6a0', '#118ab2'];
    const container = document.querySelector('.final-content');
    
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -20px;
            left: ${Math.random() * 100}%;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: fall ${Math.random() * 3 + 2}s linear forwards;
            z-index: 1000;
        `;
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
}

// NEW: Show Valentine Popup
function showValentinePopup() {
    const popup = document.getElementById('valentine-popup');
    popup.classList.remove('hidden');
    
    // Setup Yes button
    document.getElementById('yes-btn').onclick = function() {
        // Hide popup
        popup.classList.add('hidden');
        
        // Show dancing dog and emojis
        showCelebration();
        
        // Create extra confetti
        createConfetti();
    };
    
    // Setup No button - it runs away!
    const noBtn = document.getElementById('no-btn');
    noBtn.onmouseover = function() {
        // Random movement when hovered
        const maxX = window.innerWidth - this.offsetWidth - 100;
        const maxY = window.innerHeight - this.offsetHeight - 100;
        
        const randomX = Math.max(10, Math.min(maxX, Math.random() * maxX));
        const randomY = Math.max(10, Math.min(maxY, Math.random() * maxY));
        
        this.style.position = 'fixed';
        this.style.left = randomX + 'px';
        this.style.top = randomY + 'px';
        this.style.transform = 'scale(1.2)';
    };
    
    noBtn.onclick = function(e) {
        e.preventDefault();
        // Move away when clicked too
        const maxX = window.innerWidth - this.offsetWidth - 100;
        const maxY = window.innerHeight - this.offsetHeight - 100;
        
        this.style.position = 'fixed';
        this.style.left = Math.random() * maxX + 'px';
        this.style.top = Math.random() * maxY + 'px';
    };
}

// NEW: Show Celebration (Dancing Dog + Happy Emojis)
function showCelebration() {
    const dogContainer = document.getElementById('dancing-dog-container');
    dogContainer.classList.remove('hidden');
    
    // Add dancing animation to the dog
    const dog = document.querySelector('.dog-emoji');
    setInterval(() => {
        dog.style.transform = 'scale(1.2) rotate(10deg)';
        setTimeout(() => {
            dog.style.transform = 'scale(1) rotate(-10deg)';
        }, 200);
    }, 400);
    
    // Auto-hide after 30 seconds (or keep forever, your choice)
    setTimeout(() => {
        dogContainer.classList.add('hidden');
    }, 30000);
}

function replayJourney() {
    currentMonthIndex = 0;
    document.getElementById('final-climax').classList.add('hidden');
    document.getElementById('chapter-wrap').classList.remove('hidden');
    document.getElementById('valentine-popup').classList.add('hidden');
    document.getElementById('dancing-dog-container').classList.add('hidden');
    loadChapter();
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Touch support for mobile slideshow
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('photo-container').addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('photo-container').addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next slide
        const slides = document.querySelectorAll('.slide-img');
        if (slides.length > 1) {
            clearInterval(slideTimer);
            slides[currentSlideIndex].classList.remove('active');
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            slides[currentSlideIndex].classList.add('active');
            updatePhotoCounter();
            startSlideshow();
        }
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous slide
        const slides = document.querySelectorAll('.slide-img');
        if (slides.length > 1) {
            clearInterval(slideTimer);
            slides[currentSlideIndex].classList.remove('active');
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            slides[currentSlideIndex].classList.add('active');
            updatePhotoCounter();
            startSlideshow();
        }
    }
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    // Add image error handling
    document.addEventListener('error', function(e) {
        if (e.target.tagName.toLowerCase() === 'img') {
            e.target.src = 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80';
            e.target.alt = 'Beautiful memory placeholder';
        }
    }, true);
    
    // Add CSS animation for confetti fall if not exists
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to { transform: translateY(100vh) rotate(360deg); }
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    `;
    document.head.appendChild(style);

});
