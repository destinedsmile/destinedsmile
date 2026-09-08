'use strict';

/*-----------------------------------*\
  #DESTINED SMILE PORTFOLIO LOGIC
\*-----------------------------------*/

// Mobile Sidebar Accordion Toggle
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

if (sidebarBtn) {
  sidebarBtn.addEventListener('click', function () {
    sidebar.classList.toggle('active');
  });
}

// Explicit Collapsible Experience Timeline Items Handler
window.toggleTimeline = function (el, e) {
  if (e) {
    if (e.stopPropagation) e.stopPropagation();
  }
  const timelineItem = el.closest('[data-timeline-item]');
  if (timelineItem) {
    timelineItem.classList.toggle('collapsed');
  }
};

// Navigation Tab Switching
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

navigationLinks.forEach((navLink) => {
  navLink.addEventListener('click', function () {
    const targetPage = (this.getAttribute('data-nav-link') || this.textContent).toLowerCase().trim();

    navigationLinks.forEach(link => link.classList.remove('active'));
    this.classList.add('active');

    pages.forEach(page => {
      if (page.dataset.page === targetPage) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Portfolio Category Filtering
const filterBtns = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    const selectedCategory = this.dataset.filterBtn.toLowerCase().trim();

    filterBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    filterItems.forEach(item => {
      const itemCategory = item.dataset.category.toLowerCase().trim();
      if (selectedCategory === 'all' || itemCategory.includes(selectedCategory)) {
        item.classList.remove('hide');
      } else {
        item.classList.add('hide');
      }
    });
  });
});

// Modal Dialog System (Projects & DevLogs)
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalMeta = document.querySelector('[data-modal-meta]');
const modalText = document.querySelector('[data-modal-text]');
const modalImg = document.querySelector('[data-modal-img]');
const modalActions = document.querySelector('[data-modal-actions]');

// Open Project Modal (Linked to ArtStation)
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('click', function () {
    const title = this.querySelector('.project-title').textContent;
    const category = this.querySelector('.project-category').textContent;
    const imgSrc = this.querySelector('.project-img img').src;
    const desc = this.getAttribute('data-desc') || 'A custom Technical Art showcase project built with Unity, C#, Python, and Shader Graph.';
    const artstationUrl = this.getAttribute('data-artstation') || 'https://www.artstation.com/the_destiny_smile';

    modalTitle.textContent = title;
    modalMeta.textContent = `Category: ${category}`;
    modalImg.src = imgSrc;
    modalText.textContent = desc;

    modalActions.innerHTML = `
      <a href="${artstationUrl}" target="_blank" class="modal-btn">
        <ion-icon name="logo-artstation"></ion-icon> View on ArtStation
      </a>
      <a href="https://www.linkedin.com/in/muskan-gupta-destined-smile" target="_blank" class="modal-btn">
        <ion-icon name="logo-linkedin"></ion-icon> LinkedIn Profile
      </a>
    `;

    modalContainer.classList.add('active');
  });
});

// Open Blog Article Modal
const blogCards = document.querySelectorAll('.blog-card');
blogCards.forEach(card => {
  card.addEventListener('click', function () {
    const title = this.querySelector('.blog-item-title').textContent;
    const meta = this.querySelector('.blog-meta').textContent;
    const imgSrc = this.querySelector('.blog-banner-box img').src;
    const desc = this.getAttribute('data-full-content') || this.querySelector('.blog-text').textContent;

    modalTitle.textContent = title;
    modalMeta.textContent = meta;
    modalImg.src = imgSrc;
    modalText.textContent = desc;

    modalActions.innerHTML = `
      <button class="modal-btn" onclick="closeModal()">
        <ion-icon name="checkmark-outline"></ion-icon> Close Reader
      </button>
    `;

    modalContainer.classList.add('active');
  });
});

// Close Modal Function
function closeModal() {
  if (modalContainer) {
    modalContainer.classList.remove('active');
  }
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeModal);
}

if (modalContainer) {
  modalContainer.addEventListener('click', function (e) {
    if (e.target === this) closeModal();
  });
}

// Copy Email Button Handler
const copyEmailBtn = document.getElementById('copy-email-btn');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', function () {
    navigator.clipboard.writeText('destined.smile@gmail.com').then(() => {
      const originalText = this.innerHTML;
      this.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon><span>Copied!</span>';
      setTimeout(() => {
        this.innerHTML = originalText;
      }, 2500);
    }).catch(err => {
      console.error('Copy failed:', err);
    });
  });
}

// Contact Form Handler & Mail Composer
const contactForm = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');
const toast = document.querySelector('[data-toast]');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;
    formInputs.forEach(input => {
      if (!input.checkValidity()) {
        valid = false;
        input.style.borderColor = '#ef4444';
      } else {
        input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      }
    });

    if (valid) {
      const fullname = contactForm.querySelector('[name="fullname"]').value;
      const email = contactForm.querySelector('[name="email"]').value;
      const subject = contactForm.querySelector('[name="subject"]').value;
      const message = contactForm.querySelector('[name="message"]').value;

      // Construct Mailto URL
      const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject}`);
      const mailtoBody = encodeURIComponent(`Name: ${fullname}\nSender Email: ${email}\n\nMessage:\n${message}`);
      const mailtoUrl = `mailto:destined.smile@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

      if (formBtn) {
        formBtn.innerHTML = '<ion-icon name="mail-open-outline"></ion-icon><span>Opening Mail...</span>';
      }

      // Trigger Mail Client
      window.location.href = mailtoUrl;

      // Show Toast Notification
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 5000);
      }

      setTimeout(() => {
        if (formBtn) {
          formBtn.innerHTML = '<ion-icon name="paper-plane-outline"></ion-icon><span>Send Message</span>';
        }
        contactForm.reset();
      }, 3000);
    }
  });
}
