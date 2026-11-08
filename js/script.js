/* ==========================================================================
   Shreenathji Construction — Interactions
   Vanilla JavaScript only. No dependencies.
   ========================================================================== */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '919909110018';
  var CONTACT_EMAIL = 'rajeshjasani11@gmail.com';

  var header = document.getElementById('siteHeader');
  var navToggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  var drawerOverlay = document.getElementById('drawerOverlay');
  var backToTop = document.getElementById('backToTop');
  var scrollProgress = document.getElementById('scrollProgress');
  var quoteModal = document.getElementById('quoteModal');
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lastFocused = null;

  /* ---------------------------------------------------------------------
     Header shadow + back-to-top visibility
     --------------------------------------------------------------------- */
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle('scrolled', y > 50);
    backToTop.classList.toggle('show', y > 400);

    if (scrollProgress) {
      var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      var progress = maxScroll > 0 ? y / maxScroll : 0;
      progress = Math.min(Math.max(progress, 0), 1);
      scrollProgress.style.transform = 'scaleX(' + progress + ')';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------------------
     Hero video: safe autoplay + pause when the hero is out of view
     --------------------------------------------------------------------- */
  var heroVideo = document.getElementById('heroVideo');
  var heroSection = document.getElementById('home');
  var reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function playHeroVideo() {
    if (!heroVideo || reduceMotionQuery.matches) return;
    var promise = heroVideo.play();
    if (promise && typeof promise.catch === 'function') {
      promise.catch(function () { /* Autoplay blocked or video unavailable. */ });
    }
  }

  if (heroVideo) {
    if (reduceMotionQuery.matches) {
      heroVideo.removeAttribute('autoplay');
      heroVideo.pause();
    } else {
      playHeroVideo();
    }

    if ('IntersectionObserver' in window && heroSection) {
      var videoObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) playHeroVideo();
          else if (!heroVideo.paused) heroVideo.pause();
        });
      }, { threshold: 0.15 });
      videoObserver.observe(heroSection);
    }

    if (typeof reduceMotionQuery.addEventListener === 'function') {
      reduceMotionQuery.addEventListener('change', function (event) {
        if (event.matches) heroVideo.pause();
        else playHeroVideo();
      });
    }
  }

  /* ---------------------------------------------------------------------
     Active nav link highlighting
     --------------------------------------------------------------------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var sections = ['home', 'about', 'services', 'projects', 'why-us', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      var match = link.getAttribute('href') === '#' + id;
      link.classList.toggle('active', match);
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActiveLink(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (section) { navObserver.observe(section); });
  }

  /* ---------------------------------------------------------------------
     Mobile drawer
     --------------------------------------------------------------------- */
  function openDrawer() {
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
    drawerOverlay.hidden = false;
    requestAnimationFrame(function () { drawerOverlay.classList.add('show'); });
    document.body.classList.add('no-scroll');
  }

  function closeDrawer() {
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    drawerOverlay.classList.remove('show');
    document.body.classList.remove('no-scroll');
    window.setTimeout(function () { drawerOverlay.hidden = true; }, 300);
  }

  navToggle.addEventListener('click', function () {
    if (mobileNav.classList.contains('open')) closeDrawer();
    else openDrawer();
  });

  drawerOverlay.addEventListener('click', closeDrawer);
  mobileNav.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeDrawer);
  });


  /* ---------------------------------------------------------------------
     Quote modal
     --------------------------------------------------------------------- */
  function openQuoteModal() {
    lastFocused = document.activeElement;
    quoteModal.hidden = false;
    document.body.classList.add('no-scroll');
    var firstInput = quoteModal.querySelector('input');
    if (firstInput) window.setTimeout(function () { firstInput.focus(); }, 60);
  }

  function closeQuoteModal() {
    quoteModal.hidden = true;
    document.body.classList.remove('no-scroll');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  document.querySelectorAll('[data-open-quote]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (mobileNav.classList.contains('open')) closeDrawer();

      if (btn.classList.contains('service-item')) {
        var heading = btn.querySelector('h3');
        var serviceSelect = document.getElementById('qService');
        if (heading && serviceSelect) serviceSelect.value = heading.textContent.trim();
      }

      openQuoteModal();
    });
  });
  quoteModal.querySelectorAll('[data-close-quote]').forEach(function (el) {
    el.addEventListener('click', closeQuoteModal);
  });

  /* ---------------------------------------------------------------------
     Lightbox
     --------------------------------------------------------------------- */
  function openLightbox(src, title) {
    lastFocused = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = title ? title + ' — project photo' : 'Project photo';
    lightboxCaption.textContent = title || '';
    lightbox.hidden = false;
    document.body.classList.add('no-scroll');
    lightbox.querySelector('[data-close-lightbox]').focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.classList.remove('no-scroll');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  document.querySelectorAll('[data-lightbox]').forEach(function (card) {
    card.addEventListener('click', function () {
      openLightbox(card.getAttribute('data-lightbox'), card.getAttribute('data-title'));
    });
  });
  lightbox.querySelector('[data-close-lightbox]').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) closeLightbox();
  });

  /* ---------------------------------------------------------------------
     Escape key closes topmost overlay
     --------------------------------------------------------------------- */
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if (!lightbox.hidden) closeLightbox();
    else if (!quoteModal.hidden) closeQuoteModal();
    else if (mobileNav.classList.contains('open')) closeDrawer();
  });

  /* ---------------------------------------------------------------------
     Back to top
     --------------------------------------------------------------------- */
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------------------------------------------------------------
     Scroll reveal
     --------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-zoom');

  revealEls.forEach(function (el) {
    var delay = parseInt(el.getAttribute('data-delay'), 10);
    if (!isNaN(delay) && delay > 0) {
      el.style.setProperty('--reveal-delay', delay + 'ms');
    }
  });

  if ('IntersectionObserver' in window && !reduceMotionQuery.matches) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------------------------------------------------------------
     Count-up stats
     --------------------------------------------------------------------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1500;
    var start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  var statNumbers = document.querySelectorAll('.stat-number');
  if ('IntersectionObserver' in window && statNumbers.length) {
    var statObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    statNumbers.forEach(function (el) { statObserver.observe(el); });
  } else {
    statNumbers.forEach(function (el) {
      el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || '');
    });
  }

  /* ---------------------------------------------------------------------
     Form validation + WhatsApp enquiry
     --------------------------------------------------------------------- */
  function normalisePhone(value) {
    var digits = String(value).replace(/\D/g, '');
    if (digits.length === 12 && digits.indexOf('91') === 0) digits = digits.slice(2);
    if (digits.length === 11 && digits.charAt(0) === '0') digits = digits.slice(1);
    return digits;
  }

  function setFieldError(input, message) {
    var field = input.closest('.field');
    var errorEl = field ? field.querySelector('.error-msg') : null;
    if (field) field.classList.toggle('invalid', Boolean(message));
    if (errorEl) errorEl.textContent = message || '';
  }

  function validateForm(form) {
    var name = form.querySelector('[name="name"]');
    var phone = form.querySelector('[name="phone"]');
    var service = form.querySelector('[name="service"]');
    var valid = true;

    if (!name.value.trim()) {
      setFieldError(name, 'Please enter your full name.');
      valid = false;
    } else if (name.value.trim().length < 2) {
      setFieldError(name, 'Name must be at least 2 characters.');
      valid = false;
    } else {
      setFieldError(name, '');
    }

    var phoneDigits = normalisePhone(phone.value);
    if (!phone.value.trim()) {
      setFieldError(phone, 'Please enter your phone number.');
      valid = false;
    } else if (!/^[6-9]\d{9}$/.test(phoneDigits)) {
      setFieldError(phone, 'Enter a valid 10-digit Indian mobile number.');
      valid = false;
    } else {
      setFieldError(phone, '');
    }

    if (!service.value) {
      setFieldError(service, 'Please select a service type.');
      valid = false;
    } else {
      setFieldError(service, '');
    }

    return valid;
  }

  function getEnquiryData(form) {
    return {
      name: form.querySelector('[name="name"]').value.trim(),
      phone: normalisePhone(form.querySelector('[name="phone"]').value),
      service: form.querySelector('[name="service"]').value,
      message: (form.querySelector('[name="message"]') || {}).value || ''
    };
  }

  function enquiryLines(data) {
    var lines = [
      'Hello Shreenathji Construction,',
      '',
      'Name: ' + data.name,
      'Phone: ' + data.phone,
      'Service: ' + data.service
    ];
    if (data.message.trim()) lines.push('Message: ' + data.message.trim());
    return lines;
  }

  function buildMailtoUrl(data) {
    var subject = 'Construction Enquiry - ' + data.name;
    var body = enquiryLines(data).join('\r\n');
    return 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  }

  function showFormSuccess(successEl, message) {
    if (!successEl) return;
    successEl.textContent = message;
    successEl.hidden = false;
    window.setTimeout(function () { successEl.hidden = true; }, 8000);
  }

  function focusFirstInvalid(form) {
    var firstInvalid = form.querySelector('.field.invalid input, .field.invalid select');
    if (firstInvalid) firstInvalid.focus();
  }

  function handleEnquiry(form, successEl) {
    var emailBtn = form.querySelector('[data-send-email]');
    var whatsappMessage = successEl ? successEl.textContent : '';

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!validateForm(form)) {
        focusFirstInvalid(form);
        return;
      }

      var data = getEnquiryData(form);
      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(enquiryLines(data).join('\n'));

      showFormSuccess(successEl, whatsappMessage);
      window.open(url, '_blank', 'noopener');
      form.reset();
    });

    if (emailBtn) {
      emailBtn.addEventListener('click', function (event) {
        event.preventDefault();
        if (!validateForm(form)) {
          focusFirstInvalid(form);
          return;
        }

        var data = getEnquiryData(form);
        showFormSuccess(successEl, 'Thank you! Your email app is opening with your enquiry.');
        window.location.href = buildMailtoUrl(data);
      });
    }

    form.querySelectorAll('input, select, textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        if (input.closest('.field').classList.contains('invalid')) {
          setFieldError(input, '');
        }
      });
      input.addEventListener('change', function () {
        if (input.closest('.field').classList.contains('invalid')) {
          setFieldError(input, '');
        }
      });
    });
  }

  handleEnquiry(document.getElementById('contactForm'), document.getElementById('contactSuccess'));
  handleEnquiry(document.getElementById('quoteForm'), document.getElementById('quoteSuccess'));

  /* ---------------------------------------------------------------------
     Reset mobile state on resize to desktop
     --------------------------------------------------------------------- */
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 992 && mobileNav.classList.contains('open')) closeDrawer();
  });
})();
