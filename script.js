// Splash screen
const splash = document.querySelector(".splash");
window.addEventListener("load", () => {
  setTimeout(() => splash.classList.add("hidden"), 2000);
});

// Scroll animations for containers
const containers = document.querySelectorAll('.glass-container');
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

containers.forEach(container => observer.observe(container));

// Navbar hide/show on scroll
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 100) {
    navbar.classList.remove('hidden');
  } else if (currentScroll > lastScroll) {
    // Scrolling down
    navbar.classList.add('hidden');
  } else {
    // Scrolling up
    navbar.classList.remove('hidden');
  }
  
  lastScroll = currentScroll;
});

// Smooth scroll to sections
document.querySelectorAll('[data-section]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('data-section');
    const section = document.getElementById(sectionId);
    
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});

// Custom select dropdown
const customSelect = document.getElementById('customSelect');
const selected = customSelect.querySelector('.selected');
const options = customSelect.querySelector('.options');
const optionItems = options.querySelectorAll('div');
const hiddenInput = document.getElementById('serviceValue');

selected.addEventListener('click', () => {
  customSelect.classList.toggle('active');
});

optionItems.forEach(option => {
  option.addEventListener('click', () => {
    selected.textContent = option.textContent;
    hiddenInput.value = option.getAttribute('data-value');
    customSelect.classList.remove('active');
  });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!customSelect.contains(e.target)) {
    customSelect.classList.remove('active');
  }
});

// Form overlay
const overlay = document.getElementById("formOverlay");
const openBtn = document.getElementById("openForm2");
const closeBtn = document.getElementById("closeForm");

if (openBtn) {
  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    overlay.classList.add("active");
    document.body.style.overflow = 'hidden';
  });
}

closeBtn.addEventListener("click", () => {
  overlay.classList.remove("active");
  document.body.style.overflow = 'auto';
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.remove("active");
    document.body.style.overflow = 'auto';
  }
});

// Form submission
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Validate service selection
  if (!hiddenInput.value) {
    alert('Te rugăm să selectezi un serviciu!');
    return;
  }
  
  document.getElementById("popupForm").classList.add("show-success");
  
  setTimeout(() => {
    overlay.classList.remove("active");
    document.body.style.overflow = 'auto';
  }, 2500);
  
  setTimeout(() => {
    document.getElementById("popupForm").classList.remove("show-success");
    document.getElementById("contactForm").reset();
    selected.textContent = 'Alege o opțiune';
    hiddenInput.value = '';
  }, 3000);
});


document.getElementById("logo").addEventListener("click", function() {
    let panel = document.getElementById("panel");
    panel.classList.toggle("show");
});