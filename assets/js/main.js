/**
* Template Name: BizPage
* Template URL: https://bootstrapmade.com/bizpage-bootstrap-business-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 20
      }
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  const teamMembers = [
    {
      name: 'Laura Barajas',
      title: 'Líder de Excelencia Operativa',
      imageUrl: 'assets/img/team/laura.webp',
      imageAlt: 'Imagen de perfil de Laura Barajas',
      linkedin: 'https://www.linkedin.com/in/laura-barajasmartell/'
    },
    {
      name: 'Maximiliano Flores',
      title: 'Líder de Desarrollo',
      imageUrl: 'assets/img/team/max.webp',
      imageAlt: 'Imagen de perfil de Maximiliano Flores',
      linkedin: 'https://www.linkedin.com/in/maximilianofloresrubio/'
    },
    {
      name: 'Jonathan Cruz',
      title: 'Líder de Gestión Empresarial',
      imageUrl: 'assets/img/team/jonathan.webp',
      imageAlt: 'Imagen de perfil de Jonathan Cruz',
      linkedin: '', // No LinkedIn profile
    },
    {
      name: 'Omar Saldaña',
      title: 'Investigación',
      imageUrl: 'assets/img/team/omar.webp',
      imageAlt: 'Imagen de perfil de Omar Saldaña',
      linkedin: 'https://www.linkedin.com/in/omar-salda%C3%B1a-penetro-658ab9b1/'
    },
    {
      name: 'José Luis Rodríguez',
      title: 'Pruebas y Simulaciones',
      imageUrl: 'assets/img/team/chepe.webp',
      imageAlt: 'Imagen de perfil de José Luis (Chepe) Rodríguez',
      linkedin: '', // No LinkedIn profile
    },
    {
      name: 'Gerardo Pérez',
      title: 'Diseño y Manufactura',
      imageUrl: 'assets/img/team/gerardo.webp',
      imageAlt: 'Imagen de perfil de Gerardo Pérez',
      linkedin: '', // No LinkedIn profile
    },
    {
      name: 'Regina Guzmán',
      title: 'Marketing y Financiamiento',
      imageUrl: 'assets/img/team/regina.webp',
      imageAlt: 'Imagen de perfil de Regina Guzmán',
      linkedin: 'https://www.linkedin.com/in/regina-guzm%C3%A1n-4a10531a8/'
    },
    {
      name: 'Arlette Silva',
      title: 'Vinculación',
      imageUrl: 'assets/img/team/arlette.webp',
      imageAlt: 'Imagen de perfil de Arlette Silva',
      linkedin: '', // No LinkedIn profile
    },
    {
      name: 'Katia Lombardo',
      title: 'Investigación',
      imageUrl: 'assets/img/team/katia.webp',
      imageAlt: 'Imagen de perfil de Katia Lombardo',
      linkedin: '', // No LinkedIn profile
    },
    {
      name: 'Flavio Heredia',
      title: 'Pruebas y Simulación',
      imageUrl: 'assets/img/team/flavio.webp',
      imageAlt: 'Imagen de perfil de Flavio Heredia',
      linkedin: '', // No LinkedIn profile
    },
    {
      name: 'Nadia Zenteno',
      title: 'Marketing y Financiamiento',
      imageUrl: 'assets/img/team/nadia.webp',
      imageAlt: 'Imagen de perfil de Nadia Zenteno',
      linkedin: 'https://www.linkedin.com/in/nadia-lizbeth-zenteno-/'
    },
    {
      name: 'Ivan Galaviz',
      title: 'Marketing y Financiamiento',
      imageUrl: 'assets/img/team/ivan.webp',
      imageAlt: 'Imagen de perfil de Ivan Galaviz',
      linkedin: 'https://www.linkedin.com/in/ivanovishado/'
    }
  ];
  
  const container = document.getElementById('team-members-desktop');
  
  teamMembers.forEach(member => {
    const memberHTML = `
      <div class="col-lg-3 col-md-6">
        <div class="member" data-aos="fade-up" data-aos-delay="100">
          <div class="ratio ratio-1x1 mb-3" style="overflow: hidden;">
            <img src="${member.imageUrl}" class="img-fluid" alt="${member.imageAlt}">
          </div>
          <div class="member-info">
            <div class="member-info-content">
              <h4>${member.name}</h4>
              <span>${member.title}</span>
              <div class="social">
                ${member.linkedin ? `<a href="${member.linkedin}" target="_blank"><i class="bi bi-linkedin"></i></a>` : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += memberHTML;
  });

  const carouselInner = document.getElementById('team-carousel-inner');

  teamMembers.forEach((member, index) => {
    const activeClass = index === 0 ? 'active' : '';
  
    const itemHTML = `
      <div class="carousel-item ${activeClass}">
        <div class="member" data-aos="fade-up" data-aos-delay="100">
          <img src="${member.imageUrl}" class="img-fluid" alt="${member.imageAlt}">
          <div class="member-info">
            <div class="member-info-content">
              <h4>${member.name}</h4>
              <span>${member.title}</span>
              <div class="social">
                ${member.linkedin ? `<a href="${member.linkedin}" target="_blank"><i class="bi bi-linkedin"></i></a>` : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    carouselInner.innerHTML += itemHTML;
  });

  // List of media items
  const mediaItems = [
    {
      link: "https://www.forbes.com.mx/musk-llevara-un-experimento-mexicano-al-espacio-en-octubre/",
      logo: "./assets/img/news-carousel/1.png",
      alt: "Newspaper 1"
    },
    {
      link: "https://www.viveusa.mx/noticias/elon-musk-llevara-experimento-mexicano-al-espacio-con-la-iniciativa-space-x/",
      logo: "./assets/img/news-carousel/2.png",
      alt: "Newspaper 2"
    },
    {
      link: "https://www.tvazteca.com/aztecanoticias/space-x-llevara-experimento-mexicano-mcb-1-a-la-eei-en-octubre",
      logo: "./assets/img/news-carousel/3.png",
      alt: "Newspaper 3"
    },
    {
      link: "https://www.swissinfo.ch/spa/experimento-mexicano-viajar%C3%A1-al-espacio-con-la-iniciativa-space-x-de-elon-musk-en-octubre/87534156",
      logo: "./assets/img/news-carousel/4.png",
      alt: "Newspaper 4"
    },
    {
      link: "https://spacewatchafrica.com/elon-musks-space-x-to-fly-mexican-experiment-mcb-1-to-the-international-space-station-in-october/",
      logo: "./assets/img/news-carousel/5.png",
      alt: "Newspaper 5"
    },
    {
      link: "https://www.nmas.com.mx/noticieros/programas/despierta/videos/space-x-llevara-experimento-mexicano-la-estacion-espacial-internacional/",
      logo: "./assets/img/news-carousel/6.png",
      alt: "Newspaper 6"
    }
  ];

  // Reference to the carousel inner container
  const carouselContainer = document.getElementById('carouselItemsContainer');

  // Function to create carousel items dynamically
  mediaItems.forEach((item, index) => {
    const carouselItem = document.createElement('div');
    carouselItem.className = 'carousel-item';

    // Make the first item active
    if (index === 0) {
      carouselItem.classList.add('active');
    }

    const anchor = document.createElement('a');
    anchor.href = item.link;
    anchor.target = '_blank';

    const img = document.createElement('img');
    img.src = item.logo;
    img.alt = item.alt;
    img.className = 'd-block mx-auto';
    img.style.height = '100px'; // Set a fixed height
    img.style.width = '100%';
    img.style.objectFit = 'contain'; // Maintain aspect ratio

    anchor.appendChild(img);
    carouselItem.appendChild(anchor);
    carouselContainer.appendChild(carouselItem);
  });

})()