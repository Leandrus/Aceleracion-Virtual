# Aceleración Virtual 🏎️💨

> Plataforma web oficial de **Aceleración Virtual** (`aceleracion-virtual.leandrus.net`). Experiencias inmersivas de simulación de carreras, activaciones de marca y eventos de motorsport en Venezuela.

---

## 📋 Tabla de Contenidos
1. [Descripción General](#-descripción-general)
2. [Estructura del Proyecto](#-estructura-del-proyecto)
3. [Cumplimiento Legal y Seguridad Implementada](#-cumplimiento-legal-y-seguridad-implementada)
   - [Seguridad General](#1-seguridad-general)
   - [Datos Oficiales del Negocio](#2-datos-oficiales-del-negocio)
   - [Políticas de Privacidad (RGPD / LOPD)](#3-políticas-de-privacidad)
   - [Gestor y Consentimiento de Cookies](#4-gestor-y-consentimiento-de-cookies)
   - [Integración de Terceros y Analíticas](#5-integración-de-terceros-y-analíticas)
   - [Políticas de Reembolso y Cancelación](#6-políticas-de-reembolso-y-cancelación)
   - [Términos y Condiciones de Servicio](#7-términos-y-condiciones-de-servicio)
   - [Consentimiento en Formularios](#8-consentimiento-en-formularios)
   - [Aviso de Copyright y Propiedad Intelectual](#9-aviso-de-copyright-y-propiedad-intelectual)
4. [Diseño y Responsividad (PC y Móviles)](#-diseño-y-responsividad)
5. [Guía de Configuración y Mantenimiento](#-guía-de-configuración-y-mantenimiento)
6. [Instrucciones de Despliegue (GitHub Pages)](#-instrucciones-de-despliegue)

---

## 🚀 Descripción General

**Aceleración Virtual** transforma la emoción y adrenalina del automovilismo virtual (simracing) en una herramienta de alto impacto comercial para empresas, activaciones publicitarias y eventos corporativos.

La plataforma ofrece una experiencia visual premium con temática oscura motorsport, animaciones dinámicas, tabla de clasificación en tiempo real conectada a hojas de cálculo en la nube, cotizador interactivo directo con WhatsApp empresarial y estricto cumplimiento normativo en materia de privacidad y cookies.

---

## 📁 Estructura del Proyecto

```text
Aceleracion-Virtual/
│
├── CNAME                         # Configuración de dominio personalizado (aceleracion-virtual.leandrus.net)
├── README.md                     # Documentación técnica y legal completa en español
├── index.html                    # Página de inicio principal (Landing Page)
├── template_datos.html           # Tabla de tiempos y clasificación en vivo (Google Sheets)
├── privacidad.html               # Política de Privacidad y Protección de Datos
├── terminos.html                 # Términos y Condiciones de Uso y Contratación
├── cookies.html                  # Política de Cookies detallada
├── reembolsos.html               # Políticas de Cancelación, Reserva y Reembolsos
├── copyright.html                # Aviso de Copyright y Propiedad Intelectual de Marcas
│
└── assets/                       # Recursos estáticos
    ├── css/
    │   └── main.css              # Estilos personalizados, responsive tables, banner de cookies y formularios
    ├── js/
    │   ├── main.js               # Lógica general (AOS, Swiper, GLightbox, Isotope, Navmenu)
    │   ├── cookie-consent.js     # Gestor de cookies RGPD/ePrivacy y activación condicional de analítica
    │   └── contact-form.js       # Validación de formularios, trampa honeypot y enlace seguro a WhatsApp
    ├── img/                      # Logotipos, fotografías del stand y vehículos
    │   ├── clients/              # Logotipos de patrocinadores y colaboradores
    │   └── masonry-portfolio/    # Imágenes y trailers de simulación y circuitos
    └── vendor/                   # Librerías externas (Bootstrap 5.3.3, Swiper, GLightbox, AOS, etc.)
```

---

## 🛡️ Cumplimiento Legal y Seguridad Implementada

### 1. Seguridad General
- **Cabeceras de Seguridad:** Implementación de metaetiquetas `X-Content-Type-Options: nosniff` y `Referrer-Policy: strict-origin-when-cross-origin`.
- **Protección contra XSS (Cross-Site Scripting):** Tanto en el formulario de contacto (`contact-form.js`) como en el lector de hojas de cálculo de Google Sheets (`template_datos.html`), los datos se escapan y sanean de manera estricta antes de renderizarse en el DOM.
- **Protección Anti-Spam (Honeypot):** El formulario de contacto incluye un campo invisible (`class="hp-field"`). Los robots automatizados rellenan este campo al rastrear el código, lo que bloquea el envío de forma inmediata y silenciosa.
- **Vínculos Externos Seguros:** Todos los enlaces salientes (`target="_blank"`) incorporan `rel="noopener noreferrer"` para mitigar vulnerabilidades de secuestro de pestaña (*tabnabbing*).

### 2. Datos Oficiales del Negocio
Los datos de la empresa están plenamente identificados en el sitio web, en los documentos legales y bajo el marcado semántico estructurado **Schema.org (`LocalBusiness`)**:
- **Denominación Comercial:** Aceleración Virtual
- **Titular / Plataforma:** Leandrus Digital / Aceleración Virtual
- **Sitio Web Oficial:** [https://aceleracion-virtual.leandrus.net](https://aceleracion-virtual.leandrus.net)
- **Correo Oficial de Contacto:** `contacto@leandrus.net`
- **WhatsApp Oficial:** `+58 0412 8590449`
- **Ubicación Física:** Calle 13, entre Av. 20 y Av. 21. Quíbor, Estado Lara, Código Postal 3061, República Bolivariana de Venezuela.
- **Horario de Atención:** Lunes a Sábado: 8:00 AM – 6:00 PM.

### 3. Políticas de Privacidad
- Documento accesible en [`privacidad.html`](privacidad.html).
- Especifica el responsable del tratamiento, las categorías de datos recolectados (contacto de empresas, tiempos de participantes en competiciones), bases de legitimación, plazos de conservación y el ejercicio de derechos ARCO (Acceso, Rectificación, Cancelación, Oposición) a través de `contacto@leandrus.net`.

### 4. Gestor y Consentimiento de Cookies
- Cumplimiento con RGPD (Reglamento General de Protección de Datos de la UE) y normativas ePrivacy.
- **Banner interactivo:** Se muestra al ingresar al sitio si el usuario no ha tomado una decisión previa.
- **Opciones claras:** "Aceptar Todas", "Rechazar No Esenciales" o "Configurar".
- **Panel de configuración:** Modal para activar/desactivar individualmente cookies técnicas y analíticas.
- **Persistencia en LocalStorage:** Clave `av_cookie_consent_v1` con fecha y preferencias del usuario.
- **Enlace permanente:** En el pie de página ("Configurar Cookies") para revocar o alterar el consentimiento en cualquier momento.

### 5. Integración de Terceros y Analíticas
- **Google Analytics 4 (GA4):** El script `cookie-consent.js` cuenta con un cargador condicional. No se inyecta ninguna cookie de analítica a menos que el usuario haya otorgado consentimiento explícito.
- **Google Sheets API / CSV:** Conexión segura por HTTPS para obtener las tablas de clasificación en vivo en `template_datos.html`.
- **Redes Sociales:** Botones optimizados hacia Facebook, Instagram, TikTok y WhatsApp.

### 6. Políticas de Reembolso y Cancelación
- Documento accesible en [`reembolsos.html`](reembolsos.html).
- **Condiciones de Cancelación:**
  - Más de 15 días continuos de anticipación: 80% de reembolso o reprogramación sin costo dentro de 60 días.
  - Entre 7 y 14 días continuos: 50% de reembolso o reprogramación con cargo del 10%.
  - Menos de 7 días: No reembolsable (equipos, personal técnico y logística asignados).
- **Fuerza mayor y contingencias:** Protección frente a fallas eléctricas ajenas o condiciones climáticas extremas en exteriores.
- **Paquetes con Premiación personalizada:** Los costes de producción física de gorras o franelas ya impresas no son reembolsables y el material físico se entrega al cliente.

### 7. Términos y Condiciones de Servicio
- Documento accesible en [`terminos.html`](terminos.html).
- **Requisitos Técnicos:**
  - Área plana mínima de **2 x 3 metros** por simulador.
  - Toma de corriente eléctrica continua y estable de 110V/220V a menos de 10 metros.
  - Resguardo obligatorio contra lluvia y exposición solar extrema para equipos electrónicos.
- **Normas para Pilotos y Participantes:** Reglas de seguridad sobre el uso de sistemas *Force Feedback*, condiciones de salud recomendadas e instrucciones obligatorias de los operadores.

### 8. Consentimiento en Formularios
- El formulario de contacto ubicado en `index.html` incluye:
  - Casilla de verificación obligatoria (*checkbox*): *"He leído y acepto la Política de Privacidad y consiento de forma expresa el tratamiento de mis datos personales..."*
  - Validación en cliente con mensajes de estado claros.
  - Enlace dinámico directo hacia el WhatsApp oficial pre-formateando la cotización con los datos ingresados.

### 9. Aviso de Copyright y Propiedad Intelectual
- Documento accesible en [`copyright.html`](copyright.html).
- **Propiedad Exclusiva:** Los logotipos, fotografías reales de stands, textos y diseño de marca pertenecen a Aceleración Virtual.
- **Marcas de Terceros:** Mención explicativa y descargo de responsabilidad sobre fabricantes de autos (*Toyota, Chevrolet, Ford*), trazados de circuitos (*Imola, Bathurst, Hungaroring*), software de simulación (*Assetto Corsa de Kunos Simulazioni / 505 Games*) y logotipos de empresas colaboradoras (*Liqui Moly, Mobil 1, Corporación Maresa, etc.*), cuyo uso es de carácter estrictamente ilustrativo y demostrativo de simulación deportiva.

---

## 📱 Diseño y Responsividad

Todo el sitio ha sido verificado y adaptado para garantizar una visualización óptima en pantallas de cualquier tamaño:
- **Teléfonos Móviles (320px - 576px):**
  - Menú hamburguesa colapsable con cierre automático tras navegar.
  - Tablas de clasificación con scroll horizontal suave (`.table-responsive-box`) sin desbordar la pantalla.
  - Banner de cookies apilable con botones accesibles al tacto.
  - Formulario de contacto con espaciado cómodo para escritura táctil.
- **Tablets y Laptops (768px - 1024px):**
  - Grilla adaptativa de 2 columnas para servicios, portafolio y precios.
  - Carrusel Swiper adaptado dinámicamente según ancho de pantalla.
- **Pantallas de Escritorio (1200px+):**
  - Presentación a 3 y 4 columnas, animaciones AOS en scroll y visualización en alta definición.

---

## ⚙️ Guía de Configuración y Mantenimiento

### 1. Modificar el número de WhatsApp o Correo
Si se cambia el número de contacto comercial:
- Actualizar el número en `assets/js/contact-form.js` (`const businessPhone = '584128590449';`).
- Actualizar los enlaces `https://wa.me/584128590449` en `index.html`, `template_datos.html` y páginas legales.

### 2. Actualizar la Hoja de Google Sheets para la Tabla de Tiempos
Para conectar un nuevo evento a `template_datos.html`:
1. Cree su hoja en Google Sheets con columnas: `Piloto`, `Auto`, `Mejor Vuelta`, `Diferencia`.
2. Vaya a **Archivo > Compartir > Publicar en la web**.
3. Seleccione el formato **Valores separados por comas (.csv)** y publique.
4. Copie el enlace CSV y reemplácelo en `template_datos.html` dentro de la función `fetchData()`:
   ```javascript
   const url = 'TU_ENLACE_CSV_DE_GOOGLE_SHEETS_AQUI';
   ```

### 3. Configurar Google Analytics 4 (GA4)
1. Abra `index.html` (o `template_datos.html`).
2. En la cabecera, defina su ID de medición antes de cargar `cookie-consent.js`:
   ```html
   <script>
     window.GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Reemplace con su ID real
   </script>
   ```
3. El script de consentimiento se encargará automáticamente de activar o pausar la carga de Analytics según la decisión que tome el usuario en el banner de cookies.

---

## 🌐 Instrucciones de Despliegue

El proyecto está preparado para ejecutarse como sitio estático sin requerir servidores de backend complejos:

1. **GitHub Pages con Dominio Personalizado:**
   - Mantener el archivo `CNAME` con el contenido `aceleracion-virtual.leandrus.net`.
   - En la configuración de su repositorio de GitHub: **Settings > Pages > Branch: `main` > Folder: `/ (root)`**.
   - Habilite la casilla **Enforce HTTPS**.
2. **Configuración DNS:**
   - En el proveedor de su dominio (`leandrus.net`), asegúrese de apuntar el subdominio `aceleracion-virtual` mediante un registro CNAME hacia su usuario de GitHub (`username.github.io`).

---

*Desarrollado y mantenido con pasión por el automovilismo virtual por **Aceleración Virtual**.*
