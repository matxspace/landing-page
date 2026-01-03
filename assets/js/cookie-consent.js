(function() {
  'use strict';

  // Configuration
  const CONSENT_KEY = 'cookie_consent';
  const GA_MEASUREMENT_ID = 'G-77FQN8QJ3D';
  const CLARITY_PROJECT_ID = 'qlp2ow5m1s';

  /**
   * Load Microsoft Clarity tracking script with onload callback
   */
  function loadClarityScript(onLoadCallback) {
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);
      t.async=1;
      t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
      t.onload = function() {
        if (onLoadCallback && typeof onLoadCallback === 'function') {
          onLoadCallback();
        }
      };
      t.onerror = function() {
        console.warn('Clarity script failed to load. Domain may not be configured in Clarity project.');
        if (onLoadCallback && typeof onLoadCallback === 'function') {
          onLoadCallback();
        }
      };
      y=l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
  }

  /**
   * Set Clarity consent using ConsentV2 API
   * @param {boolean} analyticsGranted - Whether analytics storage is granted
   */
  function setClarityConsent(analyticsGranted) {
    if (typeof window.clarity !== 'function') {
      console.warn('Clarity not loaded yet, cannot set consent');
      return;
    }

    window.clarity('consentv2', {
      ad_Storage: "denied",
      analytics_Storage: analyticsGranted ? "granted" : "denied"
    });
  }

  /**
   * Erase Clarity cookies and reset tracking
   */
  function eraseClarityData() {
    if (typeof window.clarity !== 'function') {
      console.warn('Clarity not loaded yet, cannot erase data');
      return;
    }

    window.clarity('consent', false);
  }

  // DOM elements
  let bannerElement = null;
  let acceptButton = null;
  let rejectButton = null;

  /**
   * Initialize cookie consent functionality
   */
  function initCookieConsent() {
    // Check existing consent
    const existingConsent = localStorage.getItem(CONSENT_KEY);

    // Define what happens when Clarity is ready
    const onClarityReady = function() {
      if (existingConsent === 'accepted') {
        setClarityConsent(true);
        loadTrackingScripts();
      } else if (existingConsent === 'rejected') {
        eraseClarityData();
        setClarityConsent(false);
      } else {
        // No existing consent, show banner
        showConsentBanner();
      }
    };

    // Load Clarity script first with callback
    loadClarityScript(onClarityReady);
  }

  /**
   * Show the consent banner
   */
  function showConsentBanner() {
    // Create banner HTML if it doesn't exist
    if (!bannerElement) {
      createBanner();
    }

    // Show banner with animation
    bannerElement.style.display = 'block';
    // Force reflow to enable animation
    bannerElement.offsetHeight;
    bannerElement.classList.add('show');
  }

  /**
   * Hide the consent banner
   */
  function hideConsentBanner() {
    if (bannerElement) {
      bannerElement.classList.remove('show');
      // Hide after animation completes
      setTimeout(() => {
        bannerElement.style.display = 'none';
      }, 300);
    }
  }

  /**
   * Create the consent banner HTML
   */
  function createBanner() {
    const bannerHTML = `
      <div class="cookie-consent-banner">
        <div class="cookie-consent-container">
          <div class="cookie-consent-content">
            <h3>Uso de cookies</h3>
            <p>Utilizamos cookies para mejorar su experiencia y analizar el uso de nuestro sitio. Al aceptar, nos permite usar Google Analytics y Microsoft Clarity para recopilar datos estadísticos de forma anónima.</p>
          </div>
          <div class="cookie-consent-buttons">
            <button class="cookie-btn cookie-reject-btn" id="cookieRejectBtn">Rechazar todo</button>
            <button class="cookie-btn cookie-accept-btn" id="cookieAcceptBtn">Aceptar todo</button>
          </div>
        </div>
      </div>
    `;

    // Insert banner at the end of body
    document.body.insertAdjacentHTML('beforeend', bannerHTML);

    // Get references to elements
    bannerElement = document.querySelector('.cookie-consent-banner');
    acceptButton = document.getElementById('cookieAcceptBtn');
    rejectButton = document.getElementById('cookieRejectBtn');

    // Add event listeners
    acceptButton.addEventListener('click', handleAccept);
    rejectButton.addEventListener('click', handleReject);
  }

  /**
   * Handle accept button click
   */
  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, 'accepted');

    setClarityConsent(true);
    loadTrackingScripts();

    hideConsentBanner();
  }

  /**
   * Handle reject button click
   */
  function handleReject() {
    localStorage.setItem(CONSENT_KEY, 'rejected');

    eraseClarityData();
    setClarityConsent(false);

    hideConsentBanner();
  }

  /**
   * Load Google Analytics tracking scripts
   */
  function loadTrackingScripts() {
    // Google Analytics
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(gaScript);

    gaScript.onload = function() {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID);
    };
  }

  /**
   * Global function to show consent banner (for footer link)
   */
  window.showConsentBanner = showConsentBanner;

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
  } else {
    initCookieConsent();
  }

})();