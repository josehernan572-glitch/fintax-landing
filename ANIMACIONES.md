# Guía de Animaciones de Scroll - Fintax Landing

## Descripción General

El proyecto implementa un completo sistema de animaciones de scroll usando **GSAP** y **ScrollTrigger**. Los elementos aparecen con diferentes efectos según desplazas la página, tanto en dispositivos móvil como escritorio.

## Características

✅ **Detección automática de dispositivo** - Optimiza animaciones para móvil (más rápidas y simples)  
✅ **ScrollTrigger integrado** - Los elementos se animan cuando entran en el viewport  
✅ **Respeto de preferencias de usuario** - Detecta `prefers-reduced-motion`  
✅ **Animaciones staggered** - Los elementos se animan en secuencia  
✅ **Sin dependencias externas** - Solo GSAP (ya incluido)

---

## Cómo Usar en Componentes

### 1. **Atributo `data-reveal` (Automático)**

Agrega el atributo `data-reveal` a cualquier elemento para que se anime automáticamente:

```html
<div class="mi-seccion reveal" data-reveal>
  <h2>Este elemento se anima automáticamente</h2>
</div>
```

**Animación por defecto:**
- Fade-in + Slide up (desde abajo)
- Duración: 0.8s en escritorio, 0.6s en móvil
- Inicia cuando el elemento está al 85% visible

---

### 2. **Clases Específicas para Componentes**

#### Hero Section
Usa las siguientes clases para animar elementos del hero:
```html
<div class="promise-badge reveal" data-reveal>...</div>
<span class="hero-tag reveal" data-reveal>...</span>
<h1 class="reveal" data-reveal>...</h1>
<p class="reveal" data-reveal>...</p>
<div class="hero-actions reveal" data-reveal>...</div>
<div class="hero-stat reveal" data-reveal>...</div>
```

#### Service Rows
```html
<div class="service-row reveal" data-reveal>
  <div class="service-divider"></div>
  <!-- Contenido del servicio -->
</div>
```
- Los service rows se animan desde los lados (alternadamente)
- La línea divisora se anima simultáneamente

#### About Cards
```html
<div class="mv-card reveal" data-reveal>...</div>
```
- Animación: Scale + Fade (aparecen expandiéndose)

#### FAQ Items
```html
<div class="faq-item reveal" data-reveal>...</div>
<div class="faq-question">...</div>
```
- Animación: Slide up + Fade

#### Contact Section
```html
<div class="contact-form reveal" data-reveal>...</div>
<div class="contact-info reveal" data-reveal>...</div>
```
- El formulario viene desde la izquierda
- La información viene desde la derecha

#### Footer
```html
<div class="footer-column">...</div>
```
- Cada columna se anima en secuencia

#### Feature Items
```html
<div class="feature-item">...</div>
```
- Animación: Slide up + Fade

---

### 3. **Animaciones Staggered (Secuenciales)**

Para listas de elementos que deben animarse uno tras otro, usa la clase `stagger-item`:

```html
<div class="stagger-item">Elemento 1</div>
<div class="stagger-item">Elemento 2</div>
<div class="stagger-item">Elemento 3</div>
```

- El primer elemento se anima al aparecer
- Cada siguiente elemento se anima con un delay de 0.05s (móvil) o 0.08s (escritorio)

---

### 4. **Diamond Rows (Animación Wave)**

Para elementos tipo diamantes que se animan en onda:

```html
<div class="diamond-row">
  <span>●</span>
  <span>●</span>
  <span>●</span>
</div>
```

- Se animan con scale + fade
- Efecto de onda: cada elemento se anima con 0.03s de delay

---

### 5. **Animaciones CSS Personalizadas**

Si necesitas agregar animaciones adicionales, disponible en `styles/animations.css`:

**Keyframes disponibles:**
- `fadeInUp` - Desvanece y sube
- `fadeInDown` - Desvanece y baja
- `fadeInLeft` - Desvanece y viene de izquierda
- `fadeInRight` - Desvanece y viene de derecha
- `scaleIn` - Escala desde 0.95 a 1
- `rotateIn` - Rota mientras aparece
- `lineDrawIn` - Anima ancho de 0 a 100%
- `bounceIn` - Efecto de rebote

---

## Estados Iniciales CSS

Los elementos se ocultan inicialmente con estados CSS que GSAP anima:

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(30px);
  will-change: opacity, transform;
}
```

En móvil, los traslados se reducen a 20px para mejor rendimiento.

---

## Optimización para Móvil

El sistema detecta automáticamente si está en móvil (≤768px) y ajusta:

✓ **Duración de animaciones:** Más rápidas (0.6s vs 0.8s)  
✓ **Traslados:** Menores (15-20px vs 30-40px)  
✓ **Delays:** Más cortos para mejor UX  
✓ **Efectos complejos:** Se simplifican (ej: sin parallax)  

---

## Respeto a Preferencias del Usuario

Si el usuario tiene habilitado `prefers-reduced-motion`, todas las animaciones se desactivan automáticamente.

---

## Configuración en `app.ts`

El archivo [app.ts](../app.ts) contiene la lógica principal:

```typescript
// Detecta automáticamente móvil/escritorio
private detectDevice(): void {
  this.isMobile = window.innerWidth <= 768;
}

// Ajusta duración según dispositivo
private getAnimationDuration(): number {
  return this.isMobile ? 0.6 : 0.8;
}

// Ajusta delays según dispositivo
private getStaggerDelay(): number {
  return this.isMobile ? 0.05 : 0.08;
}
```

---

## Debugging

Para ver qué está pasando con ScrollTrigger, temporalmente puedes habilitar markers:

En [app.ts](../app.ts), cambia:
```typescript
markers: false
```

Por:
```typescript
markers: true
```

Esto mostrará líneas en el viewport indicando cuándo se activan las animaciones.

---

## Performance

**Optimizaciones incluidas:**

1. `will-change: opacity, transform` - Prepara GPU
2. Reducción de animaciones en móvil
3. Limpieza de ScrollTrigger en `ngOnDestroy`
4. Validación de GSAP disponible antes de usar
5. Respeto a preferencias de usuario

---

## Archivos Modificados

- `src/styles/animations.css` - Estilos y keyframes
- `src/app/app.ts` - Lógica de GSAP/ScrollTrigger
- `src/index.html` - Referencia a animations.css

---

## Ejemplo: Agregar Animación a un Nuevo Componente

```html
<!-- Opción 1: Simple (data-reveal automático) -->
<section class="mi-seccion">
  <div class="reveal" data-reveal>
    <h2>Título</h2>
    <p>Contenido</p>
  </div>
</section>

<!-- Opción 2: Staggered items -->
<div class="lista">
  <div class="stagger-item">Item 1</div>
  <div class="stagger-item">Item 2</div>
  <div class="stagger-item">Item 3</div>
</div>

<!-- Opción 3: CSS puro (si lo prefieres) -->
<style>
  .mi-elemento {
    animation: fadeInUp 0.8s ease-out forwards;
    animation-delay: 0.2s;
  }
</style>
```

---

**¡Listo!** El sistema de animaciones está activo y funcionando en móvil y escritorio. 🎉
