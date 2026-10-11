/**
 * SHVAASA ENT • ALLERGY • ASTHMA CENTER
 * Interactive Application Logic (Vanilla JavaScript)
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveClinicStatus();
  initMobileDrawer();
  initTabs();
  initCarousels();
  initCustomSelects();
  initFaqAccordion();
  initBookingEngine();
  initQuickBookingWidget();
  initSmoothScroll();
  initDropdownClicks();
});

/* ===================================================================
   1. Live Clinic Status (IST Time check)
   =================================================================== */
function initLiveClinicStatus() {
  const badge = document.getElementById('liveStatusBadge');
  const text = document.getElementById('liveStatusText');
  if (!badge || !text) return;

  function updateStatus() {
    // Current time in IST (UTC+5:30)
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istDate = new Date(utc + (3600000 * 5.5));
    
    const day = istDate.getDay(); // 0 is Sunday, 1-6 is Mon-Sat
    const hours = istDate.getHours();
    const minutes = istDate.getMinutes();
    const timeInMins = hours * 60 + minutes;

    // Mon - Sat: 9:00 AM - 11:00 AM (540 to 660) & 5:00 PM - 8:30 PM (1020 to 1230)
    const isMorningClinic = (timeInMins >= 540 && timeInMins <= 660);
    const isEveningClinic = (timeInMins >= 1020 && timeInMins <= 1230);
    const isOpen = (day !== 0) && (isMorningClinic || isEveningClinic);

    if (isOpen) {
      badge.style.display = 'inline-flex';
      text.textContent = 'Clinic Open Now';
    } else {
      badge.style.display = 'inline-flex';
      text.textContent = (day === 0) 
        ? 'Sunday: Prior Booking' 
        : 'Booking Open';
    }
  }

  updateStatus();
  setInterval(updateStatus, 60000); // Check every minute
}

/* ===================================================================
   2. Mobile Navigation Drawer & Dropdowns
   =================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileToggleBtn');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const closeBtn = document.getElementById('drawerCloseBtn');

  if (!toggleBtn || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  // Sub-accordions in mobile drawer
  const accordionTriggers = document.querySelectorAll('.drawer-accordion-trigger');
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-target');
      const pane = document.getElementById(targetId);
      if (pane) {
        pane.classList.toggle('active');
        const arrow = trigger.querySelector('.drawer-arrow');
        if (arrow) {
          arrow.style.transform = pane.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }
    });
  });

  // Close drawer on link click
  const drawerLinks = drawer.querySelectorAll('a:not(.drawer-accordion-trigger)');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ===================================================================
   3. Treatment Categories Tab Switcher
   =================================================================== */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* ===================================================================
   4. FAQ Accordion
   =================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) otherItem.classList.remove('active');
      });

      // Toggle clicked
      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
}

/* ===================================================================
   5. Interactive Booking Engine & Slot Selector
   =================================================================== */
function initBookingEngine() {
  const dateInput = document.getElementById('bookingDate');
  const morningSlotBtn = document.getElementById('btnMorningSlots');
  const eveningSlotBtn = document.getElementById('btnEveningSlots');
  const morningSlotsWrap = document.getElementById('morningSlotsWrap');
  const eveningSlotsWrap = document.getElementById('eveningSlotsWrap');
  const selectedSlotInput = document.getElementById('selectedTimeSlot');
  const bookingForm = document.getElementById('appointmentBookingForm');
  const modal = document.getElementById('bookingConfirmationModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');

  // Set min date to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    if (!dateInput.value) {
      dateInput.value = today;
    }
  }

  // Slot session tabs
  if (morningSlotBtn && eveningSlotBtn) {
    morningSlotBtn.addEventListener('click', () => {
      morningSlotBtn.classList.add('active');
      eveningSlotBtn.classList.remove('active');
      morningSlotsWrap.style.display = 'grid';
      eveningSlotsWrap.style.display = 'none';
    });

    eveningSlotBtn.addEventListener('click', () => {
      eveningSlotBtn.classList.add('active');
      morningSlotBtn.classList.remove('active');
      eveningSlotsWrap.style.display = 'grid';
      morningSlotsWrap.style.display = 'none';
    });
  }

  // Slot pills selection
  const slotPills = document.querySelectorAll('.slot-pill');
  slotPills.forEach(pill => {
    pill.addEventListener('click', () => {
      slotPills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      if (selectedSlotInput) {
        selectedSlotInput.value = pill.getAttribute('data-slot');
      }
    });
  });

  // Dynamic Service filtering based on Department selection
  const deptSelect = document.getElementById('bookingDepartment');
  const serviceSelect = document.getElementById('bookingService');

  const servicesMap = {
    'Allergy': [
      'Skin Prick Allergy Testing',
      'Allergen Immunotherapy Consultation',
      'Allergic Rhinitis & Sinusitis Care',
      'Food Allergy Specific Diet Plan',
      'Asthma & Airway Assessment'
    ],
    'ENT': [
      'Ear Pain / Infection / Examination',
      'Impacted Wax Removal & Ear Syringing',
      'Endoscopic Sinus & Nose Evaluation',
      'Throat, Tonsils & Voice Check',
      'Safe Medical Ear & Nose Piercing'
    ],
    'Pediatric': [
      'Pediatric Allergy & Wheeze Consultation',
      'Pediatric Tonsil & Adenoid Evaluation',
      'Recurrent Ear Infections in Children'
    ],
    'General': [
      'General ENT & Airway Consultation (₹1000)',
      'Second Opinion on ENT Surgery',
      'Post-Operative Follow Up'
    ]
  };

  if (deptSelect && serviceSelect) {
    deptSelect.addEventListener('change', () => {
      const dept = deptSelect.value;
      const services = servicesMap[dept] || servicesMap['General'];
      serviceSelect.innerHTML = '';
      services.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s;
        opt.textContent = s;
        serviceSelect.appendChild(opt);
      });
    });
  }

  // Booking Form Submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const patientName = document.getElementById('patientName').value.trim();
      const patientPhone = document.getElementById('patientPhone').value.trim();
      const patientDept = deptSelect ? deptSelect.value : 'ENT/Allergy';
      const patientService = serviceSelect ? serviceSelect.value : 'General Consultation';
      const patientDate = dateInput ? dateInput.value : 'Selected Date';
      const patientSlot = selectedSlotInput ? selectedSlotInput.value : '09:30 AM';

      if (!patientName || !patientPhone) {
        alert('Please fill in your name and valid contact number.');
        return;
      }

      // Generate reference ID
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const refId = `SHV-${new Date().getFullYear()}-${randomCode}`;

      // Populate Modal
      document.getElementById('modalRefId').textContent = refId;
      document.getElementById('modalPatient').textContent = patientName;
      document.getElementById('modalDateTime').textContent = `${patientDate} at ${patientSlot}`;
      document.getElementById('modalService').textContent = `${patientDept}: ${patientService}`;

      // Setup WhatsApp Action
      if (modalWhatsappBtn) {
        const text = encodeURIComponent(
          `Hello Dr. Swathi N / SHVAASA Center,\n\nI have submitted an appointment request:\nReference: ${refId}\nName: ${patientName}\nPhone: ${patientPhone}\nDate: ${patientDate} at ${patientSlot}\nService: ${patientService}\nConsultation Fee: ₹1000 (Pay at Clinic)\n\nPlease confirm my slot.`
        );
        modalWhatsappBtn.href = `https://wa.me/919845012345?text=${text}`;
      }

      // Open Modal
      if (modal) modal.classList.add('active');
    });
  }

  if (modalCloseBtn && modal) {
    modalCloseBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      bookingForm.reset();
    });
  }
}

/* ===================================================================
   6. Quick Hero Booking Widget
   =================================================================== */
function initQuickBookingWidget() {
  const quickBtn = document.getElementById('quickCheckAvailabilityBtn');
  if (!quickBtn) return;

  quickBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const quickDept = document.getElementById('quickDepartment')?.value;
    const quickDate = document.getElementById('quickDate')?.value;

    const mainDept = document.getElementById('bookingDepartment');
    const mainDate = document.getElementById('bookingDate');

    if (mainDept && quickDept) {
      mainDept.value = quickDept;
      mainDept.dispatchEvent(new Event('change'));
    }
    if (mainDate && quickDate) {
      mainDate.value = quickDate;
    }

    // Smooth scroll down to interactive booking section
    const bookingSec = document.getElementById('book-appointment');
    if (bookingSec) {
      bookingSec.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

/* ===================================================================
   7. Smooth Anchor Scrolling & Single-Page Navigation
   =================================================================== */
function initSmoothScroll() {
  // Handle in-page anchors
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') {
        e.preventDefault();
        return;
      }

      if (targetId === '#home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();

        // Switch to the appropriate tab if jumping into category sections
        if (targetId === '#allergy-treatments') {
          const tabAllergyBtn = document.querySelector('.tab-btn[data-tab="tabAllergy"]');
          if (tabAllergyBtn) tabAllergyBtn.click();
        } else if (targetId === '#ent-treatments') {
          const tabEntBtn = document.querySelector('.tab-btn[data-tab="tabEnt"]');
          if (tabEntBtn) tabEntBtn.click();
        }

        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Handle Home links to scroll smoothly to top without page reload
  const homeLinks = document.querySelectorAll('a[href="index.html"]');
  homeLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // If we are already on index.html or root
      if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
}

/* ===================================================================
   8. Dropdown Click Interception (Strict Home Page Mode)
   =================================================================== */
function initDropdownClicks() {
  const dropdownItems = document.querySelectorAll('.dropdown-item, .drawer-sub-link');
  dropdownItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Close mobile drawer if currently opened
      const drawer = document.getElementById('mobileDrawer');
      const overlay = document.getElementById('drawerOverlay');
      if (drawer && drawer.classList.contains('active')) {
        drawer.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
      }

      // Display subtle medical badge explaining Home Page design mode
      showToast('Home Page Design: Individual service pages are not active yet.');
    });
  });
}

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('homePageToast');
  const text = document.getElementById('homePageToastText');
  if (!toast) return;

  if (text && message) {
    text.textContent = message;
  }
  toast.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}



/* ===================================================================
   9. Carousel & Slider Navigation Controls
   =================================================================== */
function initCarousels() {
  const buttons = document.querySelectorAll('.carousel-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const track = document.getElementById(targetId);
      if (!track) return;
      const isPrev = btn.classList.contains('prev-btn');
      const slide = track.querySelector('.testi-slide');
      const card = track.querySelector('.compact-service-card, .gallery-compact-card');
      const step = slide ? track.offsetWidth : (card ? card.offsetWidth + 20 : 320);
      track.scrollBy({ left: isPrev ? -step : step, behavior: 'smooth' });
    });
  });

  // Testimonials dot pagination
  const testiTrack = document.getElementById('testimonialTrack');
  const dots = document.querySelectorAll('.testi-dot');
  if (testiTrack && dots.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.getAttribute('data-index') || dot.getAttribute('data-slide') || String(index), 10);
        const slideWidth = testiTrack.offsetWidth;
        testiTrack.scrollTo({ left: slideIndex * slideWidth, behavior: 'smooth' });
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
      });
    });

    testiTrack.addEventListener('scroll', () => {
      const slideWidth = testiTrack.offsetWidth;
      if (!slideWidth) return;
      const activeIndex = Math.round(testiTrack.scrollLeft / slideWidth);
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIndex);
      });
    }, { passive: true });
  }
}


/* ===================================================================
   10. Unified Luxury Custom Select Component
   =================================================================== */
function initCustomSelects() {
  const selects = document.querySelectorAll('select.form-control');
  selects.forEach(select => {
    if (select.closest('.custom-select-container')) return;

    // Create container
    const container = document.createElement('div');
    container.className = 'custom-select-container';
    select.parentNode.insertBefore(container, select);
    container.appendChild(select);
    select.classList.add('native-hidden');

    // Create trigger
    const trigger = document.createElement('div');
    trigger.className = 'custom-select-trigger';
    trigger.setAttribute('tabindex', '0');
    trigger.setAttribute('role', 'combobox');
    trigger.setAttribute('aria-expanded', 'false');

    const valueSpan = document.createElement('span');
    valueSpan.className = 'custom-select-value';

    const selectedOpt = select.options[select.selectedIndex] || select.options[0];
    valueSpan.textContent = selectedOpt ? selectedOpt.text : 'Select...';

    const arrowSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    arrowSvg.setAttribute('class', 'custom-select-arrow');
    arrowSvg.setAttribute('viewBox', '0 0 24 24');
    arrowSvg.setAttribute('fill', 'none');
    arrowSvg.setAttribute('stroke', 'currentColor');
    arrowSvg.innerHTML = '<path d="M19 9l-7 7-7-7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';

    trigger.appendChild(valueSpan);
    trigger.appendChild(arrowSvg);
    container.appendChild(trigger);

    // Create options menu
    const menu = document.createElement('div');
    menu.className = 'custom-select-menu';
    menu.setAttribute('role', 'listbox');
    container.appendChild(menu);

    function populateOptions() {
      menu.innerHTML = '';
      Array.from(select.options).forEach((opt) => {
        const optionEl = document.createElement('div');
        optionEl.className = 'custom-select-option' + (opt.selected ? ' is-selected' : '');
        optionEl.textContent = opt.text;
        optionEl.setAttribute('role', 'option');
        optionEl.setAttribute('data-value', opt.value);

        optionEl.addEventListener('click', (e) => {
          e.stopPropagation();
          select.value = opt.value;
          valueSpan.textContent = opt.text;
          menu.querySelectorAll('.custom-select-option').forEach(o => o.classList.remove('is-selected'));
          optionEl.classList.add('is-selected');
          container.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
          // Dispatch change event on native select to trigger any connected logic
          select.dispatchEvent(new Event('change', { bubbles: true }));
        });

        menu.appendChild(optionEl);
      });

      const currentOpt = select.options[select.selectedIndex];
      if (currentOpt) valueSpan.textContent = currentOpt.text;
    }

    populateOptions();

    // Toggle menu
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = container.classList.contains('is-open');
      // Close all other open custom selects
      document.querySelectorAll('.custom-select-container.is-open').forEach(c => {
        if (c !== container) {
          c.classList.remove('is-open');
          c.querySelector('.custom-select-trigger')?.setAttribute('aria-expanded', 'false');
        }
      });
      container.classList.toggle('is-open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });

    // Keyboard navigation
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        container.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      } else if (e.key === 'Escape') {
        container.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    // Observe changes to options in native select (for dynamic department -> service updates)
    const observer = new MutationObserver(() => {
      populateOptions();
    });
    observer.observe(select, { childList: true });

    // Listen for direct change event on native select (e.g., from quick check widget)
    select.addEventListener('change', () => {
      const opt = select.options[select.selectedIndex];
      if (opt) {
        valueSpan.textContent = opt.text;
        menu.querySelectorAll('.custom-select-option').forEach(o => {
          o.classList.toggle('is-selected', o.getAttribute('data-value') === opt.value);
        });
      }
    });
  });

  // Global click outside listener
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select-container')) {
      document.querySelectorAll('.custom-select-container.is-open').forEach(c => {
        c.classList.remove('is-open');
        c.querySelector('.custom-select-trigger')?.setAttribute('aria-expanded', 'false');
      });
    }
  });
}
