/**
 * Aceleración Virtual - Gestión de Formularios y Contacto Multi-canal
 * Incluye:
 * - Canales separados: WhatsApp directo y Correo Electrónico (mailto)
 * - Validación condicional según el botón pulsado:
 *    * WhatsApp requiere: Nombre, Teléfono / WhatsApp y Consentimiento
 *    * Email requiere: Nombre, Correo Electrónico y Consentimiento
 * - Verificación obligatoria de consentimiento RGPD / Privacidad
 * - Trampa Honeypot anti-spam para bots
 * - Sanitización de entradas
 * - Registro de eventos de analíticas respetando el consentimiento del usuario
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('av-contact-form');
    if (!contactForm) return;

    const btnWhatsapp = document.getElementById('btn-submit-whatsapp');
    const btnEmail = document.getElementById('btn-submit-email');

    const nameEl = document.getElementById('cf-name');
    const serviceEl = document.getElementById('cf-service');
    const phoneEl = document.getElementById('cf-phone');
    const emailEl = document.getElementById('cf-email');
    const messageEl = document.getElementById('cf-message');
    const consentEl = document.getElementById('cf-consent');
    const honeypotEl = document.getElementById('cf-website-url');
    const statusAlert = document.getElementById('cf-status-alert');

    // Prevenir el submit tradicional del formulario
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    /**
     * Validador de campos comunes (Honeypot, Nombre, Consentimiento)
     */
    function validateCommon() {
      // 1. Trampa Honeypot anti-spam
      if (honeypotEl && honeypotEl.value.trim() !== '') {
        console.warn('Bot detectado mediante trampa honeypot.');
        return null;
      }

      // 2. Nombre Completo
      const name = sanitize(nameEl ? nameEl.value : '');
      if (!name) {
        showStatus('Por favor, ingrese su Nombre Completo para continuar.', 'warning');
        nameEl?.focus();
        return null;
      }

      // 3. Consentimiento de Privacidad
      if (!consentEl || !consentEl.checked) {
        showStatus('Debe aceptar la Política de Privacidad para poder enviar su solicitud.', 'danger');
        consentEl?.focus();
        return null;
      }

      const service = serviceEl ? serviceEl.value : 'Consulta General';
      const message = sanitize(messageEl ? messageEl.value : '');
      const phone = sanitize(phoneEl ? phoneEl.value : '');
      const email = sanitize(emailEl ? emailEl.value : '');

      return { name, service, message, phone, email };
    }

    /**
     * Canal 1: Enviar por WhatsApp
     */
    if (btnWhatsapp) {
      btnWhatsapp.addEventListener('click', () => {
        const data = validateCommon();
        if (!data) return;

        // Validación específica: Teléfono / WhatsApp obligatorio
        if (!data.phone) {
          showStatus('Por favor, ingrese su número de Teléfono / WhatsApp para contactarle por esta vía.', 'warning');
          phoneEl?.focus();
          return;
        }

        // Si colocó email, validar formato
        if (data.email && !isValidEmail(data.email)) {
          showStatus('La dirección de correo ingresada no es válida.', 'warning');
          emailEl?.focus();
          return;
        }

        // Registrar evento analítico con consentimiento
        trackLead('whatsapp', data.service);

        // Construir mensaje de WhatsApp
        const businessPhone = '584128590449';
        const waText = encodeURIComponent(
          `🏎️ *Solicitud de Información - Aceleración Virtual*\n\n` +
          `👤 *Nombre:* ${data.name}\n` +
          `📦 *Servicio de Interés:* ${data.service}\n` +
          `📱 *Teléfono / WhatsApp:* ${data.phone}\n` +
          `📧 *Email:* ${data.email || 'No especificado'}\n\n` +
          `💬 *Detalles del Evento:*\n${data.message || 'Solicitud de cotización y disponibilidad.'}\n\n` +
          `✅ _Aceptó la Política de Privacidad de Aceleración Virtual._`
        );

        const waUrl = `https://wa.me/${businessPhone}?text=${waText}`;

        showStatus('¡Excelente! Redirigiendo a WhatsApp para conectar con un asesor de Aceleración Virtual...', 'success');

        setTimeout(() => {
          window.open(waUrl, '_blank', 'noopener,noreferrer');
        }, 600);
      });
    }

    /**
     * Canal 2: Enviar por Email (mailto)
     */
    if (btnEmail) {
      btnEmail.addEventListener('click', () => {
        const data = validateCommon();
        if (!data) return;

        // Validación específica: Correo Electrónico obligatorio
        if (!data.email) {
          showStatus('Por favor, ingrese su Correo Electrónico para contactarle por esta vía.', 'warning');
          emailEl?.focus();
          return;
        }

        if (!isValidEmail(data.email)) {
          showStatus('Por favor, ingrese una dirección de correo electrónico válida (ej: correo@empresa.com).', 'warning');
          emailEl?.focus();
          return;
        }

        // Registrar evento analítico con consentimiento
        trackLead('email', data.service);

        // Construir enlace mailto
        const recipient = 'info@leandrus.net';
        const subject = encodeURIComponent(`Solicitud de Cotización: ${data.service} - ${data.name}`);
        const body = encodeURIComponent(
          `Hola equipo de Aceleración Virtual,\n\n` +
          `Deseo solicitar información y presupuesto para el siguiente servicio:\n\n` +
          `• Nombre Completo: ${data.name}\n` +
          `• Servicio de Interés: ${data.service}\n` +
          `• Correo Electrónico: ${data.email}\n` +
          `• Teléfono / WhatsApp: ${data.phone || 'No especificado'}\n\n` +
          `Detalles del Evento (Fecha, ciudad, requerimientos):\n` +
          `${data.message || 'Sin comentarios adicionales.'}\n\n` +
          `---\n` +
          `He leído y aceptado la Política de Privacidad de Aceleración Virtual.`
        );

        const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

        showStatus('¡Excelente! Abriendo su cliente de correo para enviar su consulta a info@leandrus.net...', 'success');

        setTimeout(() => {
          window.location.href = mailtoUrl;
        }, 600);
      });
    }

    /**
     * Validación de formato de correo
     */
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /**
     * Sanitizar cadenas para evitar XSS
     */
    function sanitize(str) {
      if (!str) return '';
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML.trim();
    }

    /**
     * Registrar evento de lead en Google Analytics respetando consentimiento
     */
    function trackLead(method, service) {
      if (window.avConsent && window.avConsent.analytics && typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          event_category: 'Contacto',
          event_label: service,
          method: method
        });
      }
    }

    /**
     * Mostrar alerta de estado accesible
     */
    function showStatus(msg, type) {
      if (!statusAlert) return;
      statusAlert.className = `alert alert-${type} mt-3 d-block`;
      statusAlert.innerHTML = `<i class="bi ${type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2"></i>${msg}`;
      statusAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
})();
