document.addEventListener('DOMContentLoaded', function() {

    var map = L.map('map').setView([52.430869, 30.993657], 12);

    L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(map);

    var routeControl;
    var routePanel = document.getElementById('route-panel');
    var routeOptionsContainer = document.getElementById('route-options');
    var closePanelButton = document.getElementById('close-panel');
    var routeBtn = document.getElementById('route-btn');
    var userLocationIcon = L.divIcon({
        html: '<img src="images/location.png" class="rotating-marker" alt="Ваша месцазнаходжанне">',
        className: '',
        iconSize: [48, 48],
        iconAnchor: [24, 24]
    });

    function locateUser() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var userLocation = [position.coords.latitude, position.coords.longitude];
                L.marker(userLocation, { icon: userLocationIcon }).addTo(map)
                    .bindPopup("Ваша месцазнаходжанне").openPopup();

                map.setView(userLocation, 13);
            }, function(error) {
                console.log("Памылка вызначэння месцазнаходжання: " + error.message);
            });
        } else {
            alert("Геалакацыя не падтрымліваецца гэтым браўзэрам.");
        }
    }
    locateUser();

    function createRoute(userLocation, destination) {

        if (routeControl) {
            map.removeControl(routeControl);
        }

        routeControl = L.Routing.control({
            waypoints: [
                L.latLng(userLocation),
                L.latLng(destination)
            ],
            routeWhileDragging: false,
            showAlternatives: true,
            createMarker: function() { return null; },
            lineOptions: {
                styles: [{ color: '#4285f4', opacity: 0.7, weight: 6 }]
            },
            language: 'ru',
            addWaypoints: false
        }).addTo(map);

        addCloseButtonToRoutePanel();
    }

function addCloseButtonToRoutePanel() {

    setTimeout(() => {
        const routeContainer = document.querySelector('.leaflet-routing-container');

        if (routeContainer && !document.querySelector('.close-route')) {
            const closeButton = document.createElement('button');
            closeButton.innerText = 'Закрыць маршрут';
            closeButton.className = 'close-route';

            closeButton.onclick = function() {
                if (routeControl) {
                    map.removeControl(routeControl);
                    routeControl = null;
                }
            };

            routeContainer.appendChild(closeButton);
        }
    }, 500);
}

var murals = [
    {
        coords: [52.442565, 30.997692],
        image: 'images/telegena7.jpg',
        id: "mural1",
        panorama: 'https://i.imgur.com/qcbCuR0.jpeg',
        info: 'Многоквартирное здание на ул. Телегена 7',
        biography: {
            name: 'Многоквартирное здание на ул. Телегена 7',
            bio: 'Торец высотного здания в этом месте идеально подойдет для нового мурала, благодаря тому, что изображение хорошо будет видно с центральной железной дороги.',
            photo: 'images/telegena7vert.jpg'
        }
    },
    {
        coords: [52.449363, 30.991649],
        image: 'images/phedosenko2.jpg',
        id: "mural2",
        panorama: 'https://i.imgur.com/pA8yZBV.jpeg',
        info: 'Новостройка на ул. Федосенко 2',
        biography: {
            name: 'Новое здание на ул. Федосенко 2',
            bio: 'Боковой фасад этого здания виден с одной из центральных улиц города, что делает его идеальным для масштабного мурала, привлекающего внимание водителей.',
            photo: 'images/phedosenko2.jpg'
        }
    },
    {
        coords: [52.453384, 30.992666],
        image: 'images/dindi.jpg',
        id: "mural3",
        panorama: 'https://i.imgur.com/lvSJIDo.jpeg',
        info: 'Девятиэтажное здание на ул. Совесткой 136/2 (около ул.Дынды)',
        biography: {
            name: 'Девятиэтажное здание на ул. Совесткой 136/2 (около ул.Дынды)',
            bio: 'Дом расположен на главной улице города, и мурал станет частью городской инфраструктуры, видимой каждому прохожему.',
            photo: 'images/dindi.jpg'
        }
    },
        {
        coords: [52.466955, 30.977369],
        image: 'images/antoskinagor.jpg',
        id: "mural4",
        panorama: 'https://i.imgur.com/CA2sY7p.jpeg',
        info: 'Здание завода на ул. Антошкина',
        biography: {
            name: 'Здание завода на ул. Антошкина',
            bio: 'Мурал на этом доме будет отлично виден с близлежащей железной дороги, создавая культурную атмосферу для проезжающих.',
            photo: 'images/antoshkinavert.jpg'
        }
    },
        {
        coords: [52.466891, 30.973259],
        image: 'images/efremovagoriz.jpg',
        id: "mural5",
        panorama: 'https://i.imgur.com/H1WNUZd.jpeg',
        info: 'Многоквартирное здание на ул. М.Г.Ефремова 15А',
        biography: {
            name: 'Многоквартирное здание на ул. М.Г.Ефремова 15А',
            bio: 'Мурал здесь будет отлично виден с ближайшей автобусной остановки, оживляя обычный день горожан.',
            photo: 'images/efremova15a.jpg'
        }
    },
        {
        coords: [52.463509, 30.958386],
        image: 'images/karastoyanovagor.jpg',
        id: "mural6",
        panorama: 'https://i.imgur.com/U5lL9yc.jpeg',
        info: 'Девятиэтажное здание на ул. Карастояновой, 4',
        biography: {
            name: 'Девятиэтажное здание на ул. Карастояновой, 4',
            bio: 'Этот дом стоит в окружении зелени, и мурал станет ярким контрастом на фоне природного пейзажа.',
            photo: 'images/karastoyanovavert.jpg'
        }
    },
        {
        coords: [52.455088, 30.976778],
        image: 'images/gorbatovagor.jpg',
        id: "mural7",
        panorama: 'https://i.imgur.com/wIs2YRR.jpeg',
        info: 'Пятиэтажное здание е здание на ул. Горбатова, 35',
        biography: {
            name: 'Пятиэтажное здание на ул. Горбатова, 35',
            bio: 'Мурал на этом доме будет гармонировать с соседними зданиями, создавая единую художественную композицию.',
            photo: 'images/gorbatovavert.jpg'
        }
    },
        {
        coords: [52.478150, 31.016477],
        image: 'images/sviridovagor.jpg',
        id: "mural8",
        panorama: 'https://i.imgur.com/V4ub750.jpeg',
        info: 'Десятиэтажное здание на ул. Свиридова, 1Г',
        biography: {
            name: 'Десятиэтажное здание на ул. Свиридова, 1Г',
            bio: 'Здание находится в районе с высокой плотностью застройки, что сделает мурал заметным с различных точек.',
            photo: 'images/sviridovavert.jpg'
        }
    },
        {
        coords: [52.451552, 31.026693],
        image: 'images/golovachkogor.jpg',
        id: "mural9",
        panorama: 'https://i.imgur.com/XheTIrM.jpeg',
        info: 'Девятиэтажное здание на ул. Мазурова, 59Г (около ул.Головацкого)',
        biography: {
            name: 'Девятиэтажное здание на ул. Мазурова, 59Г (около ул.Головацкого)',
            bio: 'Здание находится рядом с учебным заведением, и мурал может стать источником вдохновения для школьников.',
            photo: 'images/golovachkogovertikalno.jpg'
        }
    },
        {
        coords: [52.420817, 30.957306],
        image: 'images/talalih167agor.jpg',
        id: "mural10",
        panorama: 'https://i.imgur.com/E2Rusqt.jpeg',
        info: 'Пятиэтажное здание на ул. Барыкина 167 (около ул.Талалихина)',
        biography: {
            name: 'Пятиэтажное здание на ул. Барыкина 167 (около ул.Талалихина)',
            bio: 'Большая площадь стены позволяет разместить крупное изображение, которое привлечет внимание жителей соседних домов.',
            photo: 'images/talalih167a.jpg'
        }
    },
        {
        coords: [52.414065, 30.957393],
        image: 'images/zhykovagor.jpg',
        id: "mural11",
        panorama: 'https://i.imgur.com/NS67M3C.jpeg',
        info: 'Новое пятиэтажное здание на ул. Жукова, 2',
        biography: {
            name: 'Новое пятиэтажное здание на ул. Жукова, 2',
            bio: 'Здание расположено на перекрестке оживленных улиц, что гарантирует постоянный поток внимания к муралу.',
            photo: 'images/Zhykovavert.jpg'
        }
    },
        {
        coords: [52.403661, 30.944062],
        image: 'images/lizukovigor.jpg',
        id: "mural12",
        panorama: 'https://i.imgur.com/6HcJQR7.jpeg',
        info: 'Новы дзевяціпавярховы будынак на вул. Братоў Лізюковых, 30А',
        biography: {
            name: 'Новы дзевяціпавярховы будынак на вул. Братоў Лізюковых, 30А',
            bio: 'Фасад дома накіраваны на дзіцячую пляцоўку, дзе мурал можа стаць часткай выхаваўчага працэсу для дзяцей.',
            photo: 'images/lizukovavert.jpg'
        }
    },
        {
        coords: [52.395564, 30.953770],
        image: 'images/denisenkogor.jpg',
        id: "mural13",
        panorama: 'https://i.imgur.com/svL9Ma9.jpeg',
        info: 'Десятиэтажное здание на ул. Григория Денисенко, 82',
        biography: {
            name: 'Десятиэтажное здание на ул. Григория Денисенко, 82',
            bio: 'Этот дом находится напротив крупной транспортной развязки, и мурал будет заметен для всех, проезжающих мимо.',
            photo: 'images/denisenkovert.jpg'
        }
    },
        {
        coords: [52.398513, 30.961272],
        image: 'images/penznyakovagor.jpg',
        id: "mural14",
        panorama: 'https://i.imgur.com/TMjLqmL.jpeg',
        info: 'Девятиэтажное здание на ул. Д.Н.Пенязькова, 21',
        biography: {
            name: 'Девятиэтажное здание на ул. Д.Н.Пенязькова, 21',
            bio: 'Дом расположен в жилом квартале, и мурал оживит пространство, создавая культурную атмосферу для местных жителей.',
            photo: 'images/penzyakova21vert.jpg'
        }
    },
        {
        coords: [52.361339, 31.016931],
        image: 'images/belogogor.jpg',
        id: "mural15",
        panorama: 'https://i.imgur.com/1LTaoCb.jpeg',
        info: 'Десятиэтажное здание на ул. Белого, 52 (около ул. И.Е.Каленикова)',
        biography: {
            name: 'Десятиэтажное здание на ул. Белого, 52 (около ул. И.Е.Каленикова)',
            bio: 'Фасад здания виден с местного велосипедного маршрута, и мурал привлечет внимание активных горожан.',
            photo: 'images/belogovert.jpg'
        }
    },
        {
        coords: [52.357297, 31.047684],
        image: 'images/oskinagor.jpg',
        id: "mural16",
        panorama: 'https://i.imgur.com/2OZfZUA.jpeg',
        info: 'Девятиэтажное здание на ул. Оськина, 4',
        biography: {
            name: 'Девятиэтажное здание на ул. Оськина, 4',
            bio: 'Здание расположено у входа в спальный район, и мурал станет своеобразной "визитной карточкой" этого места.',
            photo: 'images/oskinavert.jpg'
        }
    },
        {
        coords: [52.389346, 31.033258],
        image: 'images/skleznevagor.jpg',
        id: "mural17",
        panorama: 'https://i.imgur.com/FNRPqG6.jpeg',
        info: 'Пятиэтажное здание на ул. Склезнева, 4',
        biography: {
            name: 'Пятиэтажное здание на ул. Склезнева, 4',
            bio: 'Торец дома выходит на проезжую часть, где ежедневно большой трафик автомобилей, едущих из-за города, гарантирует постоянную видимость мурала.',
            photo: 'images/skleznevavert.jpg'
        }
    },
    {
        coords: [52.392993, 31.031725],
        image: 'images/gercenagor.jpg',
        id: "mural18",
        panorama: 'https://i.imgur.com/Z6PkbTj.jpeg',
        info: 'Двеятиэтажное здание на ул. Герцена, 8 (около ул. Шандалова)',
        biography: {
            name: 'Двеятиэтажное здание на ул. Герцена, 8 (около ул. Шандалова)',
            bio: 'Здание расположено напротив популярного кафе и кинотеатра, поэтому мурал будет заметен посетителям, сидящим на летних террасах.',
            photo: 'images/gecenavert.jpg'
        }
    },

];

var modal = document.getElementById("muralModal");
var modalTitle = document.getElementById("modal-title");
var modalImage = document.getElementById("modal-image");
var modalDescription = document.getElementById("modal-description");
var modalBio = document.getElementById("modal-bio");
var closeModal = document.getElementsByClassName("close")[0];
var panoramaContainer = document.getElementById("panorama-container");
var panoramaElement = document.getElementById("panorama");

closeModal.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

var audio = new Audio('images/musicfon.mp3');
audio.loop = true;

document.addEventListener('click', function () {
    audio.play().catch(function(error) {
        console.log("Не удалось воспроизвести аудио: " + error);
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

murals.forEach(function (mural) {
    var marker = L.marker(mural.coords).addTo(map);
    marker.bindTooltip(mural.info, { permanent: false });

        var tableRow = document.getElementById(mural.id);
        if (tableRow) {
            tableRow.addEventListener('click', function() {
                map.setView(mural.coords, 16);
                marker.openTooltip(); 

    document.getElementById('mural-map-section').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
            });
    });
        }

       marker.bindTooltip(`<img src="${mural.image}" alt="Мурал" style="width: 150px; height: auto;"><br>${mural.info}`, {
            permanent: false,
            direction: 'top',
            offset: [0, -10]
        });

        marker.on('click', function() {

            document.getElementById('modal-title').innerText = mural.biography.name;
            document.getElementById('modal-image').src = mural.biography.photo;
            document.getElementById('modal-description').innerText = mural.info;
            document.getElementById('modal-bio').innerText = mural.biography.bio;
            document.getElementById('muralModal').style.display = "block";

            document.getElementById('route-btn').onclick = function() {
                navigator.geolocation.getCurrentPosition(function(position) {
                    const userLocation = [position.coords.latitude, position.coords.longitude];
                    createRoute(userLocation, mural.coords);
                    document.getElementById('muralModal').style.display = "none";
                }, function(error) {
                    console.log("Памылка атрымання месцазнаходжання: " + error.message);
                });
            };

    document.querySelector('.close').onclick = function() {
        document.getElementById('muralModal').style.display = "none";
    };

        marker.setIcon(L.icon({
            iconUrl: 'images/markered.png',
            iconSize: [40, 40],
            iconAnchor: [20, 40]
        }));

        modalTitle.innerText = mural.biography.name;
        modalImage.src = mural.biography.photo;
        modalDescription.innerText = mural.info;
        modalBio.innerText = mural.biography.bio;

        pannellum.viewer('panorama', {
            type: 'equirectangular',
            panorama: mural.panorama, 
            autoLoad: true,
            showZoomCtrl: false
        });

        modal.style.display = "block";
        console.log('Панарама павінна загрузіцца:', mural.panorama);
    });
});


closeModal.onclick = function() {
    modal.style.display = "none";
};


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

});

document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.transform = 'scale(1.05)';
    });

    card.addEventListener('mouseout', () => {
        card.style.transform = 'scale(1)';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // 1. Определяем текущий язык (по умолчанию — русский)
    const savedLang = localStorage.getItem('lang') || 'ru';

    // 2. Если пользователь не на своей языковой версии, перенаправляем его
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

