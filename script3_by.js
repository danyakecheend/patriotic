document.addEventListener("DOMContentLoaded", function() {

    if (document.getElementById('consent')) {
        const consentCheckbox = document.getElementById('consent');
        const submitBtn = document.getElementById('submit-btn');

        consentCheckbox.addEventListener('change', function() {
            submitBtn.disabled = !this.checked;
        });
    }
});

var audio = new Audio('images/musicfon.mp3');
audio.loop = true;

document.addEventListener('click', function () {
    audio.play().catch(function(error) {
        console.log("Не атрымалася прайграць аўдыё: " + error);
    });
}, { once: true });

var toggleMusicBtn = document.getElementById('toggle-music-btn');
var isPlaying = true;

toggleMusicBtn.addEventListener('click', function() {
    if (isPlaying) {
        audio.pause();
        toggleMusicBtn.innerHTML = "&#128263;";
        toggleMusicBtn.classList.add('muted');
    } else {
        audio.play();
        toggleMusicBtn.innerHTML = "&#128266;";
        toggleMusicBtn.classList.remove('muted');
    }
    isPlaying = !isPlaying;
});

function launchConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff'];
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillRect(x, y, 10, 10);
    }

    setTimeout(() => {
        document.body.removeChild(canvas);
    }, 2000);
}

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.patriotic-section, .war-section, .container, .modal-content');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});

window.addEventListener('scroll', function() {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(el => {
        let scrollPosition = window.scrollY;
        el.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });
});

if (document.getElementById('particles-js')) {
        particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 100,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": ["#d52b1e", "#00a650", "#fff"]
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
   "retina_detect": true
        });
    }

document.addEventListener('DOMContentLoaded', function () {

    const savedLang = localStorage.getItem('lang') || 'ru';

    const currentPage = window.location.pathname;
    if (currentPage.endsWith('index.html') && savedLang === 'by') {
        window.location.href = 'index_by.html';
    } else if (currentPage.endsWith('index_by.html') && savedLang === 'ru') {
        window.location.href = 'index.html';
    } else if (!currentPage.endsWith('index.html') && !currentPage.endsWith('index_by.html')) {
        const newPage = currentPage.replace(/_(ru|by).html/, `_${savedLang}.html`);
        if (currentPage !== newPage) {
            window.location.href = newPage;
        }
    }

    const toggleButton = document.getElementById('language-toggle');
    toggleButton.addEventListener('click', function () {

        const currentLang = localStorage.getItem('lang') || 'ru';
        const newLang = currentLang === 'ru' ? 'by' : 'ru';

        localStorage.setItem('lang', newLang);

        if (currentPage.endsWith('index.html') || currentPage.endsWith('index_by.html')) {
            window.location.href = newLang === 'ru' ? 'index.html' : 'index_by.html';
        } else {
            const newPage = currentPage.replace(`_${currentLang}.html`, `_${newLang}.html`);
            window.location.href = newPage;
        }
    });

    document.querySelectorAll('a').forEach(link => {
        const currentLang = localStorage.getItem('lang') || 'ru';
        if (link.href.includes('_ru.html') || link.href.includes('_by.html')) {
            const updatedHref = link.href.replace(/_(ru|by).html/, `_${currentLang}.html`);
            link.href = updatedHref;
        } else if (link.href.endsWith('index.html') || link.href.endsWith('index_by.html')) {
            link.href = currentLang === 'ru' ? 'index.html' : 'index_by.html';
        }
    });
});


