// script.js - Optimisé et commenté
'use strict';

// Configuration globale
const CONFIG = {
    visitorCount: 21234,
    bioText: "Passionate developer specializing in game development and reverse engineering. Always exploring new technologies and creating innovative solutions.",
    skillLevels: {
        python: 87,
        cpp: 75,
        csharp: 80
    },
    themes: {
        tiktok: { primary: '#00CED1', secondary: '#FF6B9E' },
        home: { primary: '#22C55E', secondary: '#2DD4BF' },
        hacker: { primary: '#22C55E', secondary: '#10B981' },
        rain: { primary: '#3B82F6', secondary: '#60A5FA' },
        anime: { primary: '#DC2626', secondary: '#F87171' },
        car: { primary: '#EAB308', secondary: '#FACC15' }
    }
};

// Éléments DOM avec cache
let elements = {};
let currentTheme = 'tiktok';
let isSkillsVisible = false;
let isMusicPlaying = false;
let cursorTrails = [];
let lastMousePos = { x: 0, y: 0 };
let mouseVelocity = { x: 0, y: 0 };

// Initialisation
function initMedia() {
    cacheElements();
    setupEventListeners();
    setupGSAPAnimations();
    initializeProfile();
    checkIfTouchDevice();
    startIntroAnimation();
    
    // Initialiser Web Audio API pour meilleur contrôle audio
    initAudioContext();
    
    // Observer pour les animations d'intersection
    setupIntersectionObserver();
    
    // Initialiser le compteur de visiteurs
    updateVisitorCount();
    
    // Optimiser pour les performances
    optimizePerformance();
}

function cacheElements() {
    elements = {
        startScreen: document.getElementById('start-screen'),
        startText: document.getElementById('start-text'),
        profileBlock: document.getElementById('profile-block'),
        skillsBlock: document.getElementById('skills-block'),
        profileName: document.getElementById('profile-name'),
        profileBio: document.getElementById('profile-bio'),
        profilePic: document.querySelector('.profile-picture'),
        profileContainer: document.querySelector('.profile-container'),
        visitorCount: document.getElementById('visitor-count'),
        backgroundMusic: document.getElementById('background-music'),
        backgroundVideo: document.getElementById('background'),
        glitchOverlay: document.querySelector('.glitch-overlay'),
        customCursor: document.querySelector('.custom-cursor'),
        volumeSlider: document.getElementById('volume-slider'),
        volumeIcon: document.getElementById('volume-icon'),
        transparencySlider: document.getElementById('transparency-slider'),
        resultsButton: document.getElementById('results-theme'),
        resultsHint: document.getElementById('results-hint'),
        resultsContainer: document.getElementById('results-button-container'),
        themeButtons: {
            tiktok: document.getElementById('tiktok-theme'),
            home: document.getElementById('home-theme'),
            hacker: document.getElementById('hacker-theme'),
            rain: document.getElementById('rain-theme'),
            anime: document.getElementById('anime-theme'),
            car: document.getElementById('car-theme')
        },
        skillBars: {
            python: document.getElementById('python-bar'),
            cpp: document.getElementById('cpp-bar'),
            csharp: document.getElementById('csharp-bar')
        }
    };
}

function setupEventListeners() {
    // Écrans et navigation
    elements.startScreen.addEventListener('click', handleStartClick);
    elements.profilePic.addEventListener('click', handleProfileClick);
    elements.resultsButton.addEventListener('click', toggleSkillsView);
    
    // Contrôles de thème
    Object.keys(elements.themeButtons).forEach(theme => {
        if (elements.themeButtons[theme]) {
            elements.themeButtons[theme].addEventListener('click', () => switchTheme(theme));
        }
    });
    
    // Contrôles audio et transparence
    elements.volumeSlider.addEventListener('input', handleVolumeChange);
    elements.transparencySlider.addEventListener('input', handleTransparencyChange);
    
    // Gestion du curseur
    if (!document.body.classList.contains('touch-device')) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
    }
    
    // Gestion du clavier
    document.addEventListener('keydown', handleKeyDown);
    
    // Optimisation du scroll
    document.addEventListener('scroll', throttle(handleScroll, 100), { passive: true });
    
    // Prévention du menu contextuel sur les éléments interactifs
    document.querySelectorAll('.theme-button, .social-icon, .badge-container').forEach(el => {
        el.addEventListener('contextmenu', e => e.preventDefault());
    });
    
    // Gestion de la visibilité de la page
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

function setupGSAPAnimations() {
    // Animation d'entrée du profil
    gsap.registerEffect({
        name: "slideIn",
        effect: (targets, config) => {
            return gsap.fromTo(targets,
                { opacity: 0, y: 50, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
            );
        }
    });
    
    // Animation des barres de compétences
    gsap.registerEffect({
        name: "skillBarFill",
        effect: (targets, config) => {
            return gsap.to(targets, {
                width: `${config.percent}%`,
                duration: 1.5,
                ease: "power2.out",
                delay: config.delay || 0
            });
        }
    });
}

function initializeProfile() {
    // Définir la bio
    elements.profileBio.textContent = CONFIG.bioText;
    
    // Appliquer le thème initial
    switchTheme('tiktok');
    
    // Initialiser les barres de compétences (cachées au début)
    Object.keys(CONFIG.skillLevels).forEach(skill => {
        if (elements.skillBars[skill]) {
            elements.skillBars[skill].style.width = '0%';
        }
    });
}

function startIntroAnimation() {
    // Animation de texte d'introduction
    const introText = "Welcome to D3M0N's Profile";
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < introText.length) {
            elements.startText.textContent += introText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        } else {
            elements.startText.style.animation = "pulse 2s infinite";
        }
    }
    
    typeWriter();
}

function handleStartClick() {
    // Animation de sortie de l'écran de démarrage
    gsap.to(elements.startScreen, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
            elements.startScreen.style.display = 'none';
            showProfile();
        }
    });
}

function showProfile() {
    // Afficher le profil avec animation
    elements.profileBlock.classList.add('profile-appear');
    elements.profileBlock.style.opacity = '1';
    elements.resultsContainer.classList.remove('hidden');
    
    // Jouer la musique de fond
    playBackgroundMusic();
}

function handleProfileClick() {
    // Animation du clic sur la photo de profil
    elements.profileContainer.classList.add('fast-orbit');
    setTimeout(() => {
        elements.profileContainer.classList.remove('fast-orbit');
    }, 500);
    
    // Effet glitch
    triggerGlitchEffect();
}

function triggerGlitchEffect() {
    elements.glitchOverlay.style.opacity = '0.5';
    elements.profileBlock.classList.add('glitch');
    
    setTimeout(() => {
        elements.glitchOverlay.style.opacity = '0';
        elements.profileBlock.classList.remove('glitch');
    }, 200);
}

function switchTheme(theme) {
    // Mettre à jour le thème actuel
    currentTheme = theme;
    
    // Mettre à jour les classes du body
    document.body.className = `${theme}-theme`;
    
    // Mettre à jour les couleurs CSS
    updateThemeColors();
    
    // Effet de transition
    gsap.to(document.body, {
        duration: 0.5,
        backgroundColor: CONFIG.themes[theme].primary + '10',
        ease: "power2.out"
    });
    
    // Mettre à jour le curseur
    updateCursorColor();
    
    // Jouer un son de transition (optionnel)
    playTransitionSound();
}

function updateThemeColors() {
    const theme = CONFIG.themes[currentTheme];
    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--secondary-color', theme.secondary);
}

function updateCursorColor() {
    const hueMap = {
        tiktok: '180deg',
        home: '120deg',
        hacker: '140deg',
        rain: '220deg',
        anime: '0deg',
        car: '50deg'
    };
    
    document.documentElement.style.setProperty('--cursor-hue', hueMap[currentTheme] || '180deg');
}

function toggleSkillsView() {
    if (!isSkillsVisible) {
        // Afficher les compétences
        elements.profileBlock.classList.add('hidden');
        elements.skillsBlock.classList.remove('hidden');
        elements.resultsButton.textContent = 'Back to Profile';
        elements.resultsHint.classList.add('show');
        
        // Animer les barres de compétences
        setTimeout(() => {
            Object.keys(CONFIG.skillLevels).forEach((skill, index) => {
                if (elements.skillBars[skill]) {
                    gsap.effects.skillBarFill(elements.skillBars[skill], {
                        percent: CONFIG.skillLevels[skill],
                        delay: index * 0.2
                    });
                }
            });
        }, 300);
    } else {
        // Revenir au profil
        elements.skillsBlock.classList.add('hidden');
        elements.profileBlock.classList.remove('hidden');
        elements.resultsButton.textContent = 'View Results';
        elements.resultsHint.classList.remove('show');
    }
    
    isSkillsVisible = !isSkillsVisible;
    
    // Cacher le hint après 3 secondes
    if (isSkillsVisible) {
        setTimeout(() => {
            elements.resultsHint.classList.remove('show');
        }, 3000);
    }
}

function initAudioContext() {
    try {
        // Créer un contexte audio pour un meilleur contrôle
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            const audioContext = new AudioContext();
            const source = audioContext.createMediaElementSource(elements.backgroundMusic);
            const gainNode = audioContext.createGain();
            
            source.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Sauvegarder le gainNode pour contrôle ultérieur
            elements.gainNode = gainNode;
            
            // Reprendre le contexte audio sur interaction utilisateur
            document.addEventListener('click', () => {
                if (audioContext.state === 'suspended') {
                    audioContext.resume();
                }
            }, { once: true });
        }
    } catch (error) {
        console.warn('Web Audio API not supported:', error);
    }
}

function playBackgroundMusic() {
    if (elements.backgroundMusic && !isMusicPlaying) {
        elements.backgroundMusic.volume = elements.volumeSlider.value;
        elements.backgroundMusic.play().then(() => {
            isMusicPlaying = true;
            updateVolumeIcon();
        }).catch(error => {
            console.warn('Audio playback failed:', error);
            // La lecture automatique peut être bloquée, on attend une interaction
            document.addEventListener('click', () => {
                if (!isMusicPlaying) {
                    elements.backgroundMusic.play();
                    isMusicPlaying = true;
                    updateVolumeIcon();
                }
            }, { once: true });
        });
    }
}

function handleVolumeChange() {
    const volume = elements.volumeSlider.value;
    
    if (elements.gainNode) {
        elements.gainNode.gain.value = volume;
    } else {
        elements.backgroundMusic.volume = volume;
    }
    
    updateVolumeIcon();
    
    // Sauvegarder le volume dans localStorage
    localStorage.setItem('profileVolume', volume);
}

function updateVolumeIcon() {
    const volume = parseFloat(elements.volumeSlider.value);
    const path = elements.volumeIcon.querySelector('path');
    
    if (volume === 0) {
        // Icône muet
        path.setAttribute('d', 'M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z');
    } else if (volume < 0.5) {
        // Icône volume bas
        path.setAttribute('d', 'M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z');
    } else {
        // Icône volume haut
        path.setAttribute('d', 'M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z');
    }
}

function handleTransparencyChange() {
    const transparency = elements.transparencySlider.value;
    elements.profileBlock.style.opacity = transparency;
    elements.skillsBlock.style.opacity = transparency;
    
    // Sauvegarder la transparence dans localStorage
    localStorage.setItem('profileTransparency', transparency);
}

function handleMouseMove(event) {
    const { clientX: x, clientY: y } = event;
    
    // Mettre à jour la position du curseur personnalisé
    if (elements.customCursor) {
        elements.customCursor.style.transform = `translate(${x}px, ${y}px) scale(${1 + mouseVelocity.x * 0.1})`;
    }
    
    // Calculer la vitesse de la souris
    const deltaX = x - lastMousePos.x;
    const deltaY = y - lastMousePos.y;
    mouseVelocity.x = deltaX;
    mouseVelocity.y = deltaY;
    lastMousePos = { x, y };
    
    // Créer des traînées de curseur
    createCursorTrail(x, y);
    
    // Effets de parallaxe sur les éléments
    applyParallaxEffect(x, y);
}

function createCursorTrail(x, y) {
    // Limiter le nombre de traînées pour les performances
    if (cursorTrails.length > 10) {
        const oldTrail = cursorTrails.shift();
        if (oldTrail && oldTrail.parentNode) {
            oldTrail.parentNode.removeChild(oldTrail);
        }
    }
    
    // Créer une nouvelle traînée
    const trail = document.createElement('div');
    trail.className = 'cursor-trail-dot';
    trail.style.left = `${x}px`;
    trail.style.top = `${y}px`;
    
    document.body.appendChild(trail);
    cursorTrails.push(trail);
    
    // Animer et supprimer la traînée
    gsap.to(trail, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
                const index = cursorTrails.indexOf(trail);
                if (index > -1) cursorTrails.splice(index, 1);
            }
        }
    });
}

function applyParallaxEffect(x, y) {
    // Effet de parallaxe léger sur le bloc de profil
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const moveX = (x - centerX) * 0.01;
    const moveY = (y - centerY) * 0.01;
    
    gsap.to(elements.profileBlock, {
        x: moveX,
        y: moveY,
        duration: 0.5,
        ease: "power2.out"
    });
}

function handleMouseDown() {
    // Effet de clic sur le curseur
    if (elements.customCursor) {
        elements.customCursor.style.transform += ' scale(0.8)';
    }
}

function handleMouseUp() {
    // Restaurer le curseur
    if (elements.customCursor) {
        elements.customCursor.style.transform = elements.customCursor.style.transform.replace(' scale(0.8)', '');
    }
}

function handleKeyDown(event) {
    // Raccourcis clavier
    switch(event.key) {
        case 'Escape':
            if (isSkillsVisible) {
                toggleSkillsView();
            }
            break;
        case ' ':
            event.preventDefault();
            toggleBackgroundMusic();
            break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
            const themes = ['tiktok', 'home', 'hacker', 'rain', 'anime', 'car'];
            const themeIndex = parseInt(event.key) - 1;
            if (themes[themeIndex]) {
                switchTheme(themes[themeIndex]);
            }
            break;
    }
}

function toggleBackgroundMusic() {
    if (isMusicPlaying) {
        elements.backgroundMusic.pause();
    } else {
        elements.backgroundMusic.play();
    }
    isMusicPlaying = !isMusicPlaying;
    updateVolumeIcon();
}

function updateVisitorCount() {
    // Simuler une augmentation progressive du compteur
    let count = parseInt(elements.visitorCount.textContent);
    const target = count + Math.floor(Math.random() * 10) + 1;
    
    gsap.to({ count }, {
        count: target,
        duration: 2,
        ease: "power2.out",
        onUpdate: function() {
            elements.visitorCount.textContent = Math.floor(this.targets()[0].count);
        },
        onComplete: () => {
            // Mettre à jour périodiquement
            setTimeout(updateVisitorCount, 5000);
        }
    });
}

function checkIfTouchDevice() {
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        document.body.classList.add('touch-device');
    }
}

function setupIntersectionObserver() {
    // Observer pour les animations d'apparition
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observer les éléments qui doivent apparaître
    document.querySelectorAll('.skill, .badge-container, .social-icon').forEach(el => {
        observer.observe(el);
    });
}

function handleScroll() {
    // Effets de défilement
    const scrollY = window.scrollY;
    const parallaxValue = scrollY * 0.5;
    
    if (elements.backgroundVideo) {
        elements.backgroundVideo.style.transform = `translateY(${parallaxValue}px) scale(1.02)`;
    }
}

function handleVisibilityChange() {
    if (document.hidden) {
        // Pause la musique quand la page n'est pas visible
        if (isMusicPlaying) {
            elements.backgroundMusic.pause();
        }
    } else {
        // Reprend la musique quand la page redevient visible
        if (isMusicPlaying) {
            elements.backgroundMusic.play();
        }
    }
}

function optimizePerformance() {
    // Optimisations de performance
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            // Précharger les ressources non critiques
            preloadResources();
        });
    }
    
    // Utiliser requestAnimationFrame pour les animations
    function updateAnimations() {
        // Mettre à jour les animations basées sur le temps
        requestAnimationFrame(updateAnimations);
    }
    updateAnimations();
    
    // Optimiser les images
    document.querySelectorAll('img').forEach(img => {
        img.loading = 'lazy';
        img.fetchPriority = 'low';
    });
}

function preloadResources() {
    // Précharger les ressources pour les thèmes
    const themesToPreload = ['home', 'hacker', 'rain', 'anime', 'car'];
    
    themesToPreload.forEach(theme => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = `assets/${theme}.mp4`;
        document.head.appendChild(link);
    });
}

// Fonction utilitaire : throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Fonction utilitaire : debouncing
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Charger les préférences utilisateur sauvegardées
function loadUserPreferences() {
    const savedVolume = localStorage.getItem('profileVolume');
    if (savedVolume) {
        elements.volumeSlider.value = savedVolume;
        handleVolumeChange();
    }
    
    const savedTransparency = localStorage.getItem('profileTransparency');
    if (savedTransparency) {
        elements.transparencySlider.value = savedTransparency;
        handleTransparencyChange();
    }
}

// Exposer certaines fonctions globalement si nécessaire
window.toggleSkillsView = toggleSkillsView;
window.switchTheme = switchTheme;

// Initialiser au chargement
window.addEventListener('DOMContentLoaded', () => {
    // Charger les préférences avant l'initialisation complète
    loadUserPreferences();
});

// Note: La fonction initMedia() est appelée par l'attribut onload dans le HTML
