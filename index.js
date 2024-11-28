// Parallax ---------------------------------------------------
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-items");
    } else {
      entry.target.classList.remove("show-items");
    }
  });
});

const scrollScale = document.querySelectorAll('.scroll-scale')
scrollScale.forEach((el)=>observer.observe(el))

const scrollBottom = document.querySelectorAll('.scroll-bottom')
scrollBottom.forEach((el)=>observer.observe(el))

const scrollTop = document.querySelectorAll('.scroll-top')
scrollTop.forEach((el)=>observer.observe(el))

//magic button
let timeout = null;
const body = document.body;

document.addEventListener('mousemove', function (e) {
    if (timeout !== null) {
        clearTimeout(timeout);
    }
    createShower(e.clientX, e.clientY);
    timeout = setTimeout(() => {
        startContinuousSparkle(e.clientX, e.clientY);
    }, 500); // Start continuous sparkle if cursor stops for 500ms
});

document.addEventListener('click', function (e) {
    createBurst(e.clientX, e.clientY); // Burst on click
});

function startContinuousSparkle(x, y) {
    const interval = setInterval(() => {
        createSparkle(x, y, false);
    }, 100);

    document.addEventListener('mousemove', () => clearInterval(interval), { once: true });
}

function createShower(x, y) {
    const count = 10; // Number of sparkles to create
    for (let i = 0; i < count; i++) {
        createSparkle(x, y, true);
    }
}

function createSparkle(x, y, isMoving) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle ' + (Math.random() < 0.5 ? 'star' : (Math.random() < 0.5 ? 'square' : 'circle'));
    const size = Math.random() * (isMoving ? 2 : 5) + 2; // Smaller when moving
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${x + (Math.random() * 50 - 25)}px`;
    sparkle.style.top = `${y + (Math.random() * 50 - 25)}px`;
    sparkle.style.background = randomColor();
    body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.style.opacity = 1;
        sparkle.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 10);

    setTimeout(() => {
        sparkle.style.opacity = 0;
        sparkle.style.transform = 'translate(-50%, -50%) scale(0)';
        setTimeout(() => sparkle.remove(), 1000);
    }, isMoving ? 500 : 1000);
}

function createBurst(x, y) {
    const count = 60; // More sparkles in burst
    for (let i = 0; i < count; i++) {
        createSparkle(x, y, false);
    }
}

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, ${Math.random().toFixed(2)})`;
}
//about me button animation:
// script.js
document.getElementById('explodeButton').addEventListener('click', function(e) {
  e.preventDefault(); // Prevent default link behavior
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const numParticles = 20;

  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.backgroundColor = 'red';
    particle.style.left = `${x + (Math.random() - 0.5) * 100}px`;
    particle.style.top = `${y + (Math.random() - 0.5) * 100}px`;
    document.body.appendChild(particle);

    // Remove particle after animation
    particle.addEventListener('animationend', () => particle.remove());
  }
});

function createParticle(buttonRect) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  document.body.appendChild(particle);

  const size = Math.floor(Math.random() * 20 + 5);
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;

  const destinationX = (Math.random() - 0.5) * 200;
  const destinationY = (Math.random() - 0.5) * 200;
  const rotation = Math.random() * 520;

  particle.style.position = 'fixed';
  particle.style.top = `${buttonRect.top + buttonRect.height/2 - size/2}px`;
  particle.style.left = `${buttonRect.left + buttonRect.width/2 - size/2}px`;

  particle.style.transform = `translate(${destinationX}px, ${destinationY}px) rotate(${rotation}deg)`;
  particle.style.transition = `transform 800ms ease-out, opacity 800ms`;

  particle.style.opacity = 0;

  setTimeout(() => {
    particle.remove();
  }, 800);
}

function displayThanks() {
  const thanks = document.createElement('div');
  thanks.textContent = "Thanks!";
  thanks.style.position = 'absolute';
  thanks.style.top = '50%';
  thanks.style.left = '50%';
  thanks.style.transform = 'translate(-50%, -50%)';
  thanks.style.fontSize = '2em';
  thanks.style.color = 'blue';
  thanks.style.opacity = 0;
  thanks.style.transition = 'opacity 1s';
  document.body.appendChild(thanks);

  setTimeout(() => {
    thanks.style.opacity = 1;
  }, 800); // Fade in after particles start

  setTimeout(() => {
    thanks.style.opacity = 0;
    setTimeout(() => thanks.remove(), 1000);
  }, 3000); // Fade out after showing
}

