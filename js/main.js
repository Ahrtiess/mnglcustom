document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const body = document.querySelector('body');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      body.classList.toggle('nav-is-open');
      const isOpen = body.classList.contains('nav-is-open');
      this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      console.log('Menu toggle clicked, nav is open:', isOpen);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      navLinks.forEach(link => link.classList.remove('active'));
      
      this.classList.add('active');
      
      if (body.classList.contains('nav-is-open')) {
        body.classList.remove('nav-is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }

      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  });
  
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    const sections = document.querySelectorAll('section[id]');
    
    if (scrollPosition < 100) {
      navLinks.forEach(link => link.classList.remove('active'));
      document.querySelector('a[href="#"]').classList.add('active');
      return;
    }
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navLinks.forEach(link => link.classList.remove('active'));
        
        const correspondingLink = document.querySelector(`a[href="#${section.id}"]`);
        if (correspondingLink) {
          correspondingLink.classList.add('active');
        }
      }
    });
  });
  
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const country = document.getElementById('country').value;
      const message = document.getElementById('message').value;
      
      const emailBody = `Name: ${name}%0D%0APhone: ${phone}%0D%0ACountry: ${country}%0D%0A%0D%0AMessage:%0D%0A${message}`;
      
      const emailSubject = `Contact Request from ${name}`;
      
      const emailTo = 'contact@mnglcustom.com';
      
      const mailtoUrl = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${emailBody}`;
      
      window.location.href = mailtoUrl;
    });
  }
}); 