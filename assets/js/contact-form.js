/**
 * Aceleración Virtual - Gestión de Formularios y Consentimiento de Contacto
 * Incluye:
 * - Verificación obligatoria de consentimiento RGPD / Privacidad
 * - Trampa Honeypot anti-spam para bots
 * - Sanitización de entradas
 * - Envío seguro o generación de mensaje directo a WhatsApp empresarial
 * - Registro de eventos de analíticas respetando el consentimiento
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('av-contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameEl = document.getElementById('cf-name');
      const emailEl = document.getElementById('cf-email');
      const phoneEl = document.getElementById('cf-phone');
      const serviceEl = document.getElementById('cf-service');
      const messageEl = document.getElementById('cf-message');
      const consentEl = document.getElementById('cf-consent');
      const honeypotEl = document.getElementById('cf-website-url'); // Trampa de spam oculta
      const statusAlert = document.getElementById('cf-status-alert');

      // 1. Verificación Honeypot: si el bot llenó este campo oculto, detenemos el envío
      if (honeypotEl && honeypotEl.value.trim() !== '') {
        console.warn('Bot detectado mediante trampa honeypot.');
        return;
      }

      // 2. Verificación de Consentimiento Obligatorio
      if (!consentEl || !consentEl.checked) {
        showStatus('Debe aceptar la Política de Privacidad para enviar su consulta.', 'danger');
        consentEl?.focus();
        return;
      }

      // 3. Validación de campos obligatorios
      const name = sanitize(nameEl ? nameEl.value : '');
      const email = sanitize(emailEl ? emailEl.value : '');
      const phone = sanitize(phoneEl ? phoneEl.value : '');
      const service = serviceEl ? serviceEl.value : 'General';
      const message = sanitize(messageEl ? messageEl.value : '');

      if (!name || (!email && !phone)) {
        showStatus('Por favor complete su nombre y al menos un método de contacto (Correo o WhatsApp).', 'warning');
        return;
      }

      // Validar formato de email si se proporcionó
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showStatus('Por favor ingrese una dirección de correo electrónico válida.', 'warning');
        emailEl?.focus();
        return;
      }

      // 4. Registrar evento de analítica (si el usuario otorgó consentimiento)
      if (window.avConsent && window.avConsent.analytics && typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          event_category: 'Contacto',
          event_label: service
        });
      }

      // 5. Preparar mensaje y envío vía WhatsApp Oficial
      // El número oficial del negocio: +58 412-8590449
      const businessPhone = '584128590449';
      const waText = encodeURIComponent(
        `🏎️ *Solicitud de Información - Aceleración Virtual*\n\n` +
        `👤 *Nombre:* ${name}\n` +
        `📧 *Email:* ${email || 'No especificado'}\n` +
        `📱 *Teléfono:* ${phone || 'No especificado'}\n` +
        `📦 *Servicio de Interés:* ${service}\n` +
        `💬 *Mensaje:* ${message || 'Solicitud de cotización general'}\n\n` +
        `✅ _Aceptó política de privacidad de Aceleración Virtual._`
      );

      const waUrl = `https://wa.me/${businessPhone}?text=${waText}`;

      showStatus('¡Gracias! Redirigiendo a WhatsApp para conectar con un asesor de Aceleración Virtual...', 'success');

      // Limpiar formulario excepto consent
      contactForm.reset();

      setTimeout(() => {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }, 900);
    });

    /**
     * Sanitizar cadenas para evitar XSS o inyecciones
     */
    function sanitize(str) {
      if (!str) return '';
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML.trim();
    }

    /**
     * Mostrar alerta de estado en el formulario
     */
    function showStatus(msg, type) {
      const statusAlert = document.getElementById('cf-status-alert');
      if (!statusAlert) return;
      statusAlert.className = `alert alert-${type} mt-3 d-block`;
      statusAlert.innerHTML = `<i class="bi ${type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2"></i>${msg}`;
      statusAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
})();
