/**
 * Aceleración Virtual - Gestor de Consentimiento de Cookies (RGPD / LOPD / ePrivacy)
 * Controla el almacenamiento de preferencias, bloqueo de scripts analíticos no consentidos
 * y actualización dinámica del estado de cookies.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'av_cookie_consent_v1';

  // Configuración predeterminada
  const defaultConsent = {
    necessary: true,   // Siempre activas (técnicas de sesión y seguridad)
    analytics: false,   // Desactivadas por defecto hasta consentimiento explícito
    timestamp: null
  };

  /**
   * Obtener preferencias guardadas
   */
  function getConsent() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('No se pudo acceder a localStorage para cookies:', e);
    }
    return null;
  }

  /**
   * Guardar preferencias
   */
  function saveConsent(consent) {
    consent.timestamp = new Date().toISOString();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch (e) {
      console.warn('Error al guardar en localStorage:', e);
    }
    applyConsent(consent);
    hideBanner();
    hideModal();
  }

  /**
   * Aplicar estado de consentimiento a herramientas de terceros (Analítica)
   */
  function applyConsent(consent) {
    window.avConsent = consent;

    // Disparar evento para que otros scripts reaccionen
    const event = new CustomEvent('avCookieConsentChange', { detail: consent });
    window.dispatchEvent(event);

    if (consent.analytics) {
      enableAnalytics();
    } else {
      disableAnalytics();
    }
  }

  /**
   * Activar Google Analytics u otras herramientas si hay ID configurado
   */
  function enableAnalytics() {
    const gaId = window.GA_MEASUREMENT_ID; // Puede definirse en la cabecera o config
    if (!gaId || gaId === 'G-XXXXXXXXXX') {
      // Sin ID real configurado, no inyectamos script externo ficticio
      return;
    }

    if (!document.getElementById('ga-gtag-script')) {
      const script = document.createElement('script');
      script.id = 'ga-gtag-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', gaId, { anonymize_ip: true });
    }
  }

  /**
   * Desactivar o bloquear cookies de analítica
   */
  function disableAnalytics() {
    const gaId = window.GA_MEASUREMENT_ID;
    if (gaId) {
      window[`ga-disable-${gaId}`] = true;
    }
  }

  /**
   * Ocultar banner
   */
  function hideBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.classList.add('d-none');
    }
  }

  /**
   * Mostrar banner
   */
  function showBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.classList.remove('d-none');
    }
  }

  /**
   * Mostrar modal de configuración
   */
  function showModal() {
    const modalEl = document.getElementById('cookieSettingsModal');
    if (modalEl && window.bootstrap && window.bootstrap.Modal) {
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      const current = getConsent() || defaultConsent;
      const analyticsCheck = document.getElementById('cookie-analytics-check');
      if (analyticsCheck) {
        analyticsCheck.checked = !!current.analytics;
      }
      modal.show();
    }
  }

  /**
   * Ocultar modal de configuración
   */
  function hideModal() {
    const modalEl = document.getElementById('cookieSettingsModal');
    if (modalEl && window.bootstrap && window.bootstrap.Modal) {
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) modal.hide();
    }
  }

  // Inicialización al cargar el DOM
  document.addEventListener('DOMContentLoaded', () => {
    const current = getConsent();

    if (!current) {
      // Mostrar banner si no hay selección previa
      showBanner();
    } else {
      applyConsent(current);
    }

    // Botón Aceptar Todo
    const btnAcceptAll = document.querySelectorAll('.btn-cookie-accept-all');
    btnAcceptAll.forEach(btn => {
      btn.addEventListener('click', () => {
        saveConsent({ necessary: true, analytics: true });
      });
    });

    // Botón Rechazar No Esenciales
    const btnRejectAll = document.querySelectorAll('.btn-cookie-reject-all');
    btnRejectAll.forEach(btn => {
      btn.addEventListener('click', () => {
        saveConsent({ necessary: true, analytics: false });
      });
    });

    // Botón Guardar Configuración Personalizada
    const btnSaveCustom = document.getElementById('btn-cookie-save-custom');
    if (btnSaveCustom) {
      btnSaveCustom.addEventListener('click', () => {
        const analyticsCheck = document.getElementById('cookie-analytics-check');
        const allowsAnalytics = analyticsCheck ? analyticsCheck.checked : false;
        saveConsent({ necessary: true, analytics: allowsAnalytics });
      });
    }

    // Botones para abrir modal de configuración
    const btnOpenSettings = document.querySelectorAll('.btn-cookie-open-settings');
    btnOpenSettings.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showModal();
      });
    });
  });

  // Exponer API global para reconfiguración desde cualquier enlace
  window.openCookieSettings = showModal;

})();
