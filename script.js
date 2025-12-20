const hasUserInteracted = false
const gsap = window.gsap // Declare gsap variable

function initMedia() {
  console.log("[v0] initMedia called")
  const backgroundMusic = document.getElementById("background-music")
  const backgroundVideo = document.getElementById("background")
  if (!backgroundMusic || !backgroundVideo) {
    console.error("[v0] Media elements not found")
    return
  }
  backgroundMusic.volume = 0.3
  backgroundVideo.muted = true

  backgroundVideo.play().catch((err) => {
    console.error("[v0] Failed to play background video:", err)
  })
}

document.addEventListener("DOMContentLoaded", () => {
  const startScreen = document.getElementById("start-screen")
  const startText = document.getElementById("start-text")
  const profileName = document.getElementById("profile-name")
  const profileBio = document.getElementById("profile-bio")
  const visitorCount = document.getElementById("visitor-count")
  const backgroundMusic = document.getElementById("background-music")
  const hackerMusic = document.getElementById("hacker-music")
  const rainMusic = document.getElementById("rain-music")
  const animeMusic = document.getElementById("anime-music")
  const carMusic = document.getElementById("car-music")
  const homeButton = document.getElementById("home-theme")
  const hackerButton = document.getElementById("hacker-theme")
  const rainButton = document.getElementById("rain-theme")
  const animeButton = document.getElementById("anime-theme")
  const carButton = document.getElementById("car-theme")
  const resultsButtonContainer = document.getElementById("results-button-container")
  const resultsButton = document.getElementById("results-theme")
  const volumeIcon = document.getElementById("volume-icon")
  const volumeSlider = document.getElementById("volume-slider")
  const transparencySlider = document.getElementById("transparency-slider")
  const backgroundVideo = document.getElementById("background")
  const hackerOverlay = document.getElementById("hacker-overlay")
  const snowOverlay = document.getElementById("snow-overlay")
  const glitchOverlay = document.querySelector(".glitch-overlay")
  const profileBlock = document.getElementById("profile-block")
  const skillsBlock = document.getElementById("skills-block")
  const pythonBar = document.getElementById("python-bar")
  const cppBar = document.getElementById("cpp-bar")
  const csharpBar = document.getElementById("csharp-bar")
  const resultsHint = document.getElementById("results-hint")
  const profilePicture = document.querySelector(".profile-picture")
  const profileContainer = document.querySelector(".profile-container")
  const socialIcons = document.querySelectorAll(".social-icon")
  const badges = document.querySelectorAll(".badge")

  const cursor = document.querySelector(".custom-cursor")
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches

  if (isTouchDevice) {
    document.body.classList.add("touch-device")

    document.addEventListener("touchstart", (e) => {
      const touch = e.touches[0]
      cursor.style.left = touch.clientX + "px"
      cursor.style.top = touch.clientY + "px"
      cursor.style.display = "block"
    })

    document.addEventListener("touchmove", (e) => {
      const touch = e.touches[0]
      cursor.style.left = touch.clientX + "px"
      cursor.style.top = touch.clientY + "px"
      cursor.style.display = "block"
    })

    document.addEventListener("touchend", () => {
      cursor.style.display = "none"
    })
  } else {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
      cursor.style.display = "block"
    })

    document.addEventListener("mousedown", () => {
      cursor.style.transform = "scale(0.8) translate(-50%, -50%)"
    })

    document.addEventListener("mouseup", () => {
      cursor.style.transform = "scale(1) translate(-50%, -50%)"
    })
  }

  const startMessage = "Click here to see the motion baby"
  let startTextContent = ""
  let startIndex = 0
  let startCursorVisible = true

  function typeWriterStart() {
    if (startIndex < startMessage.length) {
      startTextContent = startMessage.slice(0, startIndex + 1)
      startIndex++
    }
    startText.textContent = startTextContent + (startCursorVisible ? "|" : " ")
    setTimeout(typeWriterStart, 100)
  }

  setInterval(() => {
    startCursorVisible = !startCursorVisible
    startText.textContent = startTextContent + (startCursorVisible ? "|" : " ")
  }, 500)

  function initializeVisitorCounter() {
    let totalVisitors = localStorage.getItem("totalVisitorCount")
    if (!totalVisitors) {
      totalVisitors = 921234
      localStorage.setItem("totalVisitorCount", totalVisitors)
    } else {
      totalVisitors = Number.parseInt(totalVisitors)
    }

    const hasVisited = localStorage.getItem("hasVisited")
    if (!hasVisited) {
      totalVisitors++
      localStorage.setItem("totalVisitorCount", totalVisitors)
      localStorage.setItem("hasVisited", "true")
    }

    visitorCount.textContent = totalVisitors.toLocaleString()
  }

  initializeVisitorCounter()

  startScreen.addEventListener("click", () => {
    startScreen.classList.add("hidden")
    backgroundMusic.muted = false
    backgroundMusic.play().catch((err) => {
      console.error("[v0] Failed to play music after start screen click:", err)
    })
    profileBlock.classList.remove("hidden")
    gsap.fromTo(
      profileBlock,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          profileBlock.classList.add("profile-appear")
          profileContainer.classList.add("orbit")
        },
      },
    )
    if (!isTouchDevice) {
      try {
        new cursorTrailEffect({
          length: 10,
          size: 8,
          speed: 0.2,
        })
        console.log("[v0] Cursor trail initialized")
      } catch (err) {
        console.error("[v0] Failed to initialize cursor trail effect:", err)
      }
    }
    typeWriterName()
    typeWriterBio()
  })

  startScreen.addEventListener("touchstart", (e) => {
    e.preventDefault()
    startScreen.classList.add("hidden")
    backgroundMusic.muted = false
    backgroundMusic.play().catch((err) => {
      console.error("[v0] Failed to play music after start screen touch:", err)
    })
    profileBlock.classList.remove("hidden")
    gsap.fromTo(
      profileBlock,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          profileBlock.classList.add("profile-appear")
          profileContainer.classList.add("orbit")
        },
      },
    )
    if (!isTouchDevice) {
      try {
        new cursorTrailEffect({
          length: 10,
          size: 8,
          speed: 0.2,
        })
        console.log("[v0] Cursor trail initialized")
      } catch (err) {
        console.error("[v0] Failed to initialize cursor trail effect:", err)
      }
    }
    typeWriterName()
    typeWriterBio()
  })

  const name = "JAQLIV"
  let nameText = ""
  let nameIndex = 0
  let isNameDeleting = false
  let nameCursorVisible = true

  function typeWriterName() {
    if (!isNameDeleting && nameIndex < name.length) {
      nameText = name.slice(0, nameIndex + 1)
      nameIndex++
    } else if (isNameDeleting && nameIndex > 0) {
      nameText = name.slice(0, nameIndex - 1)
      nameIndex--
    } else if (nameIndex === name.length) {
      isNameDeleting = true
      setTimeout(typeWriterName, 10000)
      return
    } else if (nameIndex === 0) {
      isNameDeleting = false
    }
    profileName.textContent = nameText + (nameCursorVisible ? "|" : " ")
    if (Math.random() < 0.1) {
      profileName.classList.add("glitch")
      setTimeout(() => profileName.classList.remove("glitch"), 200)
    }
    setTimeout(typeWriterName, isNameDeleting ? 150 : 300)
  }

  setInterval(() => {
    nameCursorVisible = !nameCursorVisible
    profileName.textContent = nameText + (nameCursorVisible ? "|" : " ")
  }, 500)

  const bioMessages = ["Fu*k Guns.lol & Fakecrime.bio got banned too often, so I created my own.", '"Hello, World!"']
  let bioText = ""
  let bioIndex = 0
  let bioMessageIndex = 0
  let isBioDeleting = false
  let bioCursorVisible = true

  function typeWriterBio() {
    if (!isBioDeleting && bioIndex < bioMessages[bioMessageIndex].length) {
      bioText = bioMessages[bioMessageIndex].slice(0, bioIndex + 1)
      bioIndex++
    } else if (isBioDeleting && bioIndex > 0) {
      bioText = bioMessages[bioMessageIndex].slice(0, bioIndex - 1)
      bioIndex--
    } else if (bioIndex === bioMessages[bioMessageIndex].length) {
      isBioDeleting = true
      setTimeout(typeWriterBio, 2000)
      return
    } else if (bioIndex === 0 && isBioDeleting) {
      isBioDeleting = false
      bioMessageIndex = (bioMessageIndex + 1) % bioMessages.length
    }
    profileBio.textContent = bioText + (bioCursorVisible ? "|" : " ")
    if (Math.random() < 0.1) {
      profileBio.classList.add("glitch")
      setTimeout(() => profileBio.classList.remove("glitch"), 200)
    }
    setTimeout(typeWriterBio, isBioDeleting ? 75 : 150)
  }

  setInterval(() => {
    bioCursorVisible = !bioCursorVisible
    profileBio.textContent = bioText + (bioCursorVisible ? "|" : " ")
  }, 500)

  let currentAudio = backgroundMusic
  let isMuted = false

  volumeIcon.addEventListener("click", () => {
    isMuted = !isMuted
    currentAudio.muted = isMuted
    volumeIcon.innerHTML = isMuted
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>`
      : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`
  })

  volumeIcon.addEventListener("touchstart", (e) => {
    e.preventDefault()
    isMuted = !isMuted
    currentAudio.muted = isMuted
    volumeIcon.innerHTML = isMuted
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>`
      : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`
  })

  volumeSlider.addEventListener("input", () => {
    currentAudio.volume = volumeSlider.value
    isMuted = false
    currentAudio.muted = false
    volumeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`
  })

  transparencySlider.addEventListener("input", () => {
    const opacity = transparencySlider.value
    if (opacity == 0) {
      profileBlock.style.background = "rgba(0, 0, 0, 0)"
      profileBlock.style.borderOpacity = "0"
      profileBlock.style.borderColor = "transparent"
      profileBlock.style.backdropFilter = "none"
      skillsBlock.style.background = "rgba(0, 0, 0, 0)"
      skillsBlock.style.borderOpacity = "0"
      skillsBlock.style.borderColor = "transparent"
      skillsBlock.style.backdropFilter = "none"

      profileBlock.style.pointerEvents = "auto"
      socialIcons.forEach((icon) => {
        icon.style.pointerEvents = "auto"
        icon.style.opacity = "1"
      })
      badges.forEach((badge) => {
        badge.style.pointerEvents = "auto"
        badge.style.opacity = "1"
      })
      profilePicture.style.pointerEvents = "auto"
      profilePicture.style.opacity = "1"
      profileName.style.opacity = "1"
      profileBio.style.opacity = "1"
      visitorCount.style.opacity = "1"
    } else {
      profileBlock.style.background = `rgba(0, 0, 0, ${opacity})`
      profileBlock.style.borderOpacity = opacity
      profileBlock.style.borderColor = ""
      profileBlock.style.backdropFilter = `blur(${10 * opacity}px)`
      skillsBlock.style.background = `rgba(0, 0, 0, ${opacity})`
      skillsBlock.style.borderOpacity = opacity
      skillsBlock.style.borderColor = ""
      skillsBlock.style.backdropFilter = `blur(${10 * opacity}px)`
      profileBlock.style.pointerEvents = "auto"
      socialIcons.forEach((icon) => {
        icon.style.pointerEvents = "auto"
        icon.style.opacity = "1"
      })
      badges.forEach((badge) => {
        badge.style.pointerEvents = "auto"
        badge.style.opacity = "1"
      })
      profilePicture.style.pointerEvents = "auto"
      profilePicture.style.opacity = "1"
      profileName.style.opacity = "1"
      profileBio.style.opacity = "1"
      visitorCount.style.opacity = "1"
    }
  })

  function switchTheme(videoSrc, audio, themeClass, overlay = null, overlayOverProfile = false) {
    let primaryColor
    switch (themeClass) {
      case "home-theme":
        primaryColor = "#00CED1"
        break
      case "hacker-theme":
        primaryColor = "#22C55E"
        break
      case "rain-theme":
        primaryColor = "#1E3A8A"
        break
      case "anime-theme":
        primaryColor = "#DC2626"
        break
      case "car-theme":
        primaryColor = "#EAB308"
        break
      default:
        primaryColor = "#00CED1"
    }
    document.documentElement.style.setProperty("--primary-color", primaryColor)

    gsap.to(backgroundVideo, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        backgroundVideo.src = videoSrc

        if (currentAudio) {
          currentAudio.pause()
          currentAudio.currentTime = 0
        }
        currentAudio = audio
        currentAudio.volume = volumeSlider.value
        currentAudio.muted = isMuted
        currentAudio.play().catch((err) => console.error("[v0] Failed to play theme music:", err))

        document.body.classList.remove("home-theme", "hacker-theme", "rain-theme", "anime-theme", "car-theme")
        document.body.classList.add(themeClass)

        hackerOverlay.classList.add("hidden")
        snowOverlay.classList.add("hidden")
        profileBlock.style.zIndex = overlayOverProfile ? 10 : 20
        skillsBlock.style.zIndex = overlayOverProfile ? 10 : 20
        if (overlay) {
          overlay.classList.remove("hidden")
        }

        if (themeClass === "hacker-theme") {
          resultsButtonContainer.classList.remove("hidden")
        } else {
          resultsButtonContainer.classList.add("hidden")
          skillsBlock.classList.add("hidden")
          resultsHint.classList.add("hidden")
          profileBlock.classList.remove("hidden")
          gsap.to(profileBlock, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" })
        }

        gsap.to(backgroundVideo, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            profileContainer.classList.remove("orbit")
            void profileContainer.offsetWidth
            profileContainer.classList.add("orbit")
          },
        })
      },
    })
  }

  homeButton.addEventListener("click", () => {
    switchTheme("assets/tiktok.mp4", backgroundMusic, "home-theme")
  })
  homeButton.addEventListener("touchstart", (e) => {
    e.preventDefault()
    switchTheme("assets/tiktok.mp4", backgroundMusic, "home-theme")
  })

  hackerButton.addEventListener("click", () => {
    switchTheme("assets/tiktok.mp4", hackerMusic, "hacker-theme", hackerOverlay, false)
  })
  hackerButton.addEventListener("touchstart", (e) => {
    e.preventDefault()
    switchTheme("assets/tiktok.mp4", hackerMusic, "hacker-theme", hackerOverlay, false)
  })

  rainButton.addEventListener("click", () => {
    switchTheme("assets/tiktok.mp4", rainMusic, "rain-theme", snowOverlay, true)
  })
  rainButton.addEventListener("touchstart", (e) => {
    e.preventDefault()
    switchTheme("assets/tiktok.mp4", rainMusic, "rain-theme", snowOverlay, true)
  })

  animeButton.addEventListener("click", () => {
    switchTheme("assets/tiktok.mp4", animeMusic, "anime-theme")
  })
  animeButton.addEventListener("touchstart", (e) => {
    e.preventDefault()
    switchTheme("assets/tiktok.mp4", animeMusic, "anime-theme")
  })

  carButton.addEventListener("click", () => {
    switchTheme("assets/tiktok.mp4", carMusic, "car-theme")
  })
  carButton.addEventListener("touchstart", (e) => {
    e.preventDefault()
    switchTheme("assets/tiktok.mp4", carMusic, "car-theme")
  })

  function handleTilt(e, element) {
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    let clientX, clientY

    if (e.type === "touchmove") {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const mouseX = clientX - centerX
    const mouseY = clientY - centerY

    const maxTilt = 15
    const tiltX = (mouseY / rect.height) * maxTilt
    const tiltY = -(mouseX / rect.width) * maxTilt

    gsap.to(element, {
      rotationX: tiltX,
      rotationY: tiltY,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
    })
  }

  profileBlock.addEventListener("mousemove", (e) => handleTilt(e, profileBlock))
  profileBlock.addEventListener("touchmove", (e) => {
    e.preventDefault()
    handleTilt(e, profileBlock)
  })

  skillsBlock.addEventListener("mousemove", (e) => handleTilt(e, skillsBlock))
  skillsBlock.addEventListener("touchmove", (e) => {
    e.preventDefault()
    handleTilt(e, skillsBlock)
  })

  profileBlock.addEventListener("mouseleave", () => {
    gsap.to(profileBlock, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out",
    })
  })
  profileBlock.addEventListener("touchend", () => {
    gsap.to(profileBlock, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out",
    })
  })

  skillsBlock.addEventListener("mouseleave", () => {
    gsap.to(skillsBlock, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out",
    })
  })
  skillsBlock.addEventListener("touchend", () => {
    gsap.to(skillsBlock, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out",
    })
  })

  profilePicture.addEventListener("mouseenter", () => {
    glitchOverlay.style.opacity = "1"
    setTimeout(() => {
      glitchOverlay.style.opacity = "0"
    }, 500)
  })

  profilePicture.addEventListener("click", () => {
    profileContainer.classList.remove("fast-orbit")
    profileContainer.classList.remove("orbit")
    void profileContainer.offsetWidth
    profileContainer.classList.add("fast-orbit")
    setTimeout(() => {
      profileContainer.classList.remove("fast-orbit")
      void profileContainer.offsetWidth
      profileContainer.classList.add("orbit")
    }, 500)
  })

  profilePicture.addEventListener("touchstart", (e) => {
    e.preventDefault()
    profileContainer.classList.remove("fast-orbit")
    profileContainer.classList.remove("orbit")
    void profileContainer.offsetWidth
    profileContainer.classList.add("fast-orbit")
    setTimeout(() => {
      profileContainer.classList.remove("fast-orbit")
      void profileContainer.offsetWidth
      profileContainer.classList.add("orbit")
    }, 500)
  })

  resultsButton.addEventListener("mouseenter", () => {
    resultsHint.classList.remove("hidden")
  })

  resultsButton.addEventListener("mouseleave", () => {
    resultsHint.classList.add("hidden")
  })

  resultsButton.addEventListener("click", () => {
    profileBlock.classList.add("hidden")
    skillsBlock.classList.remove("hidden")

    gsap.fromTo(skillsBlock, { opacity: 0, x: 100 }, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" })

    setTimeout(() => {
      pythonBar.style.width = "85%"
      cppBar.style.width = "75%"
      csharpBar.style.width = "70%"
    }, 500)
  })

  resultsButton.addEventListener("touchstart", (e) => {
    e.preventDefault()
    profileBlock.classList.add("hidden")
    skillsBlock.classList.remove("hidden")

    gsap.fromTo(skillsBlock, { opacity: 0, x: 100 }, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" })

    setTimeout(() => {
      pythonBar.style.width = "85%"
      cppBar.style.width = "75%"
      csharpBar.style.width = "70%"
    }, 500)
  })

  skillsBlock.addEventListener("click", () => {
    skillsBlock.classList.add("hidden")
    profileBlock.classList.remove("hidden")

    gsap.fromTo(profileBlock, { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" })
  })

  skillsBlock.addEventListener("touchstart", (e) => {
    e.preventDefault()
    skillsBlock.classList.add("hidden")
    profileBlock.classList.remove("hidden")

    gsap.fromTo(profileBlock, { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" })
  })

  function createHackerEffect(canvas) {
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops = []

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height
    }

    const characters =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#0F0"
      ctx.font = fontSize + "px monospace"

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length))
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    setInterval(draw, 33)
  }

  function createSnowEffect(canvas) {
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const snowflakes = []
    const numberOfFlakes = 150

    for (let i = 0; i < numberOfFlakes; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        wind: Math.random() * 0.5 - 0.25,
      })
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
      ctx.beginPath()

      for (let i = 0; i < snowflakes.length; i++) {
        const flake = snowflakes[i]
        ctx.moveTo(flake.x, flake.y)
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2, true)
      }

      ctx.fill()

      for (let i = 0; i < snowflakes.length; i++) {
        snowflakes[i].y += snowflakes[i].speed
        snowflakes[i].x += snowflakes[i].wind

        if (snowflakes[i].y > canvas.height) {
          snowflakes[i].y = 0
          snowflakes[i].x = Math.random() * canvas.width
        }
      }
    }

    setInterval(draw, 33)
  }

  createHackerEffect(hackerOverlay)
  createSnowEffect(snowOverlay)

  typeWriterStart()
})

function cursorTrailEffect(options) {
  const length = options.length || 10
  const size = options.size || 5
  const speed = options.speed || 0.3

  const trail = []
  for (let i = 0; i < length; i++) {
    const dot = document.createElement("div")
    dot.className = "cursor-trail"
    dot.style.width = size + "px"
    dot.style.height = size + "px"
    dot.style.opacity = (1 - i / length) * 0.5
    document.body.appendChild(dot)
    trail.push({
      element: dot,
      x: 0,
      y: 0,
    })
  }

  let mouseX = 0
  let mouseY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  function animate() {
    let targetX = mouseX
    let targetY = mouseY

    trail.forEach((dot, index) => {
      dot.x += (targetX - dot.x) * speed
      dot.y += (targetY - dot.y) * speed

      dot.element.style.left = dot.x + "px"
      dot.element.style.top = dot.y + "px"

      targetX = dot.x
      targetY = dot.y
    })

    requestAnimationFrame(animate)
  }

  animate()
}
