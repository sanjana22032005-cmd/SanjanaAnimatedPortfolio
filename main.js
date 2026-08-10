/**
 * Smooth Scroll-Based Animation Engine
 * Preloads image frames, listens to scroll position, 
 * interpolates frames using lerp, renders to canvas, 
 * and handles typing animation + active menu highlight.
 */

const canvas = document.getElementById('animation-canvas');
const ctx = canvas.getContext('2d');
const loader = document.getElementById('loader');
const progressBar = document.getElementById('loader-progress');
const percentageText = document.getElementById('loader-percentage');
const statusText = document.querySelector('.status-text');
const scrollPrompt = document.getElementById('scroll-prompt');

const totalFrames = 240;
const images = [];
let loadedCount = 0;
let isLoaded = false;

// Scroll & interpolation parameters
let scrollPercent = 0;
let currentPercent = 0;
const lerpFactor = 0.08; // Lower = smoother & slower catch-up, higher = faster response
let lastRenderedFrame = -1;
let needsRedraw = false;

// Format numbers with leading zeros (e.g. 1 -> 000001)
function formatIndex(index) {
  return String(index).padStart(6, '0');
}

// Generate the source URL for a given frame index
function getFramePath(index) {
  return `frames/frame_${formatIndex(index)}.jpg`;
}

// Preload all images
function preloadImages() {
  return new Promise((resolve) => {
    statusText.textContent = 'Initializing visual assets...';
    
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      
      img.onload = () => {
        handleImageLoad();
      };
      
      img.onerror = () => {
        console.warn(`Failed to load frame ${i}, skipping...`);
        handleImageLoad(); // Count it to prevent the loader from freezing
      };
      
      images.push(img);
    }

    function handleImageLoad() {
      loadedCount++;
      const progress = loadedCount / totalFrames;
      const percentage = Math.round(progress * 100);
      
      // Update UI
      progressBar.style.width = `${percentage}%`;
      percentageText.textContent = `${percentage}%`;
      
      if (percentage < 30) {
        statusText.textContent = 'Assembling digital layout...';
      } else if (percentage < 60) {
        statusText.textContent = 'Preloading interaction vectors...';
      } else if (percentage < 90) {
        statusText.textContent = 'Configuring scroll interpolation...';
      } else {
        statusText.textContent = 'Polishing cinematic sequence...';
      }

      if (loadedCount === totalFrames) {
        isLoaded = true;
        resolve();
      }
    }
  });
}

// Handle resizing of the canvas, accommodating high-DPI screens
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  needsRedraw = true;
}

// Draw the specified frame onto the canvas matching "object-fit: cover"
function drawFrame(frameIndex) {
  const img = images[frameIndex - 1];
  if (!img || !img.complete || img.naturalWidth === 0) return;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;
  const imgRatio = imgWidth / imgHeight;
  const canvasRatio = canvas.width / canvas.height;

  let drawWidth, drawHeight, drawX, drawY;

  // Cover calculation
  if (canvasRatio > imgRatio) {
    // Canvas is wider than image aspect ratio
    drawWidth = canvas.width;
    drawHeight = canvas.width / imgRatio;
    drawX = 0;
    drawY = (canvas.height - drawHeight) / 2;
  } else {
    // Canvas is taller than image aspect ratio
    drawWidth = canvas.height * imgRatio;
    drawHeight = canvas.height;
    drawX = (canvas.width - drawWidth) / 2;
    drawY = 0;
  }

  ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  lastRenderedFrame = frameIndex;
  needsRedraw = false;
}

// Scroll position tracker & active links highlight (scroll spy)
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateScroll() {
  const scrollTop = window.scrollY || window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight;
  const winHeight = window.innerHeight;
  const maxScroll = docHeight - winHeight;
  
  scrollPercent = maxScroll <= 0 ? 0 : scrollTop / maxScroll;
  
  // Fade out scroll prompt as user scrolls down, and fade back in at the very top
  if (scrollPercent > 0.01) {
    scrollPrompt.classList.add('hidden');
  } else {
    scrollPrompt.classList.remove('hidden');
  }

  // Scroll Spy: highlight the active navigation section link
  let currentActiveSectionId = '';
  const scrollOffset = scrollTop + 150; // offset so transition happens early

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollOffset >= sectionTop && scrollOffset < sectionTop + sectionHeight) {
      currentActiveSectionId = section.getAttribute('id');
    }
  });

  if (currentActiveSectionId) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentActiveSectionId}`) {
        link.classList.add('active');
      }
    });
  }
}

// Core animation loop utilizing requestAnimationFrame
function animationLoop() {
  if (!isLoaded) {
    requestAnimationFrame(animationLoop);
    return;
  }

  // Smooth scroll interpolation (lerp)
  // currentPercent catches up to scrollPercent by lerpFactor percentage per frame
  const diff = scrollPercent - currentPercent;
  
  if (Math.abs(diff) > 0.0001) {
    currentPercent += diff * lerpFactor;
  } else {
    currentPercent = scrollPercent;
  }

  // Map progress (0 to 1) to frame index (1 to totalFrames)
  const targetFrameIndex = Math.min(
    totalFrames, 
    Math.max(1, Math.round(currentPercent * (totalFrames - 1) + 1))
  );

  // Redraw only if the frame changes or if canvas resized
  if (targetFrameIndex !== lastRenderedFrame || needsRedraw) {
    drawFrame(targetFrameIndex);
  }

  requestAnimationFrame(animationLoop);
}

// Hero Section Typewriter effect
function initTypewriter() {
  const typingTextSpan = document.getElementById('typing-text');
  const words = ["Full-Stack Developer", "Software Engineer", "Problem Solver"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typingTextSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingTextSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typingSpeed = 100;
    if (isDeleting) {
      typingSpeed = 50; // Deleting is faster
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 2000; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing
  setTimeout(type, 500);
}

// Initialize application
async function init() {
  // Listeners
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('scroll', updateScroll, { passive: true });
  
  // Set initial dimensions
  resizeCanvas();

  // Load resources
  await preloadImages();

  // Short pause for aesthetic loading completion transition
  setTimeout(() => {
    // Hide loader
    loader.classList.add('fade-out');
    // Show scroll prompt
    scrollPrompt.classList.remove('hidden');
    
    // Initialize typewriter
    initTypewriter();

    // Trigger initial render
    updateScroll();
    currentPercent = scrollPercent;
    drawFrame(1);
    
    // Begin rendering loop
    animationLoop();
  }, 400);
}

// Trigger setup on DOM loaded
document.addEventListener('DOMContentLoaded', init);
