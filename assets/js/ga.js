// Load Google Analytics script dynamically with consent
(function() {
  // Check if Cookiebot is available and consent is granted for "statistics"
  if (window.Cookiebot && Cookiebot.consent && Cookiebot.consent.statistics) {
    // Add the Google Analytics script
    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-77FQN8QJ3D';
    document.head.appendChild(gaScript);

    // Initialize Google Analytics
    gaScript.onload = function() {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-77FQN8QJ3D');
    };
  }
})();
