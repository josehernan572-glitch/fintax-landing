import { Component, OnDestroy, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Sistema } from './components/sistema/sistema';
import { Services } from './components/services/services';
import { WhyFintax } from './components/why-fintax/why-fintax';
import { Cta } from './components/cta/cta';
import { Contacto } from './components/contacto/contacto';
import { Footer } from './components/footer/footer';

declare var gsap: any;
declare var ScrollTrigger: any;

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    Navbar,
    Hero,
    About,
    Sistema,
    Services,
    WhyFintax,
    Cta,
    Contacto,
    Footer,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnDestroy {
  private isMobile = false;

  constructor() {
    // Run after Angular has finished rendering the FULL component tree
    // (all child sections), not just app-root's own template. Querying
    // the DOM for [data-reveal] etc. any earlier can miss elements that
    // belong to child components still being instantiated.
    afterNextRender(() => {
      this.detectDevice();
      this.waitForGsapAndInit();
      window.addEventListener('resize', () => this.detectDevice());
    });
  }

  private waitForGsapAndInit(attempt = 0): void {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      this.initAnimations();
      return;
    }
    if (attempt >= 40) {
      console.warn('GSAP o ScrollTrigger no cargaron a tiempo; animaciones deshabilitadas.');
      return;
    }
    setTimeout(() => this.waitForGsapAndInit(attempt + 1), 100);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', () => this.detectDevice());
    if (gsap && ScrollTrigger) {
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    }
  }

  private detectDevice(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  private getAnimationDuration(): number {
    return this.isMobile ? 0.6 : 0.8;
  }

  private getStaggerDelay(): number {
    return this.isMobile ? 0.05 : 0.08;
  }

  initAnimations() {
    // Esperar a que GSAP esté disponible
    if (!gsap || !ScrollTrigger) {
      console.warn('GSAP o ScrollTrigger no están disponibles');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // 1. LOGO INTRO - Logo grande centrado que viaja al navbar, luego dispara
    // animateHeroSection() sin alterarla (ver animateLogoIntro).
    this.animateLogoIntro();

    // 2. REVEAL ELEMENTS - Elementos con data-reveal
    this.animateRevealElements();

    // 3. SERVICE ROWS - Animación alternada
    this.animateServiceRows();

    // 4. DIAMOND ROWS - Wave animation
    this.animateDiamondRows();

    // 5. ABOUT CARDS - Stagger animation
    this.animateAboutCards();

    // 6. FAQ ITEMS - Accordion style
    this.animateFaqItems();

    // 7. CONTACT FORM - Stagger fields
    this.animateContactForm();

    // 8. FOOTER - Stagger columns
    this.animateFooter();

    // 9. FEATURE ITEMS - Grid reveal
    this.animateFeatureItems();

    // 10. GENERAL STAGGER - Para elementos con clase stagger-item
    this.animateStaggerItems();
  }

  private animateLogoIntro(): void {
    const isDesktop = window.innerWidth > 900;
    const navLogo = document.querySelector('.logo') as HTMLElement | null;
    const clone = document.querySelector('.intro-logo') as HTMLImageElement | null;
    const hero = document.querySelector('.hero') as HTMLElement | null;
    const heroInView = !!hero && hero.getBoundingClientRect().top < window.innerHeight * 0.5;

    // If the page loads scrolled away from the hero (e.g. opened via a
    // #section hash link), skip the big-logo intro — it would fly across
    // whatever section is actually on screen instead of the hero.
    if (!gsap || !navLogo || !clone || !heroInView) {
      this.animateHeroSection();
      return;
    }

    clone.src = isDesktop ? '/img/fintaxlogo.png' : '/img/fintaxlogomovil1.svg';

    const navRect = navLogo.getBoundingClientRect();
    const finalCenterX = navRect.left + navRect.width / 2;
    const finalCenterY = navRect.top + navRect.height / 2;
    const startCenterX = window.innerWidth / 2;
    const startCenterY = window.innerHeight / 2;
    const deltaX = startCenterX - finalCenterX;
    const deltaY = startCenterY - finalCenterY;

    gsap.set(clone, {
      left: navRect.left,
      top: navRect.top,
      width: navRect.width,
      height: navRect.height,
      x: deltaX,
      y: deltaY,
      scale: 3,
      opacity: 0
    });

    gsap.timeline()
      .to(clone, { opacity: 1, duration: 0.5, ease: 'back.out(1.6)' }, 0)
      .to(clone, { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'power3.inOut' }, 1)
      .call(() => this.animateHeroSection(), [], 1)
      .set(clone, { opacity: 0 }, 1.6);
  }

  private animateHeroSection(): void {
    // Note: intentionally NOT branching on `prefers-reduced-motion` — this site
    // always plays its entrance/reveal animations regardless of that system
    // preference (deliberate choice, not an oversight).
    if (gsap) {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to('.logo img', { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, 0)
        .to('.hero-shape', { opacity: 1, x: 0, duration: 1, ease: 'power2.out' }, 0.05)
        .to('.hero-vector', { opacity: 1, x: 0, duration: 1, ease: 'power2.out' }, 0.05)
        .to('.promise-badge', { opacity: 1, y: 0, duration: 0.7 }, 0.5)
        .to('.hero-tag', { opacity: 1, y: 0, duration: 0.6 }, 0.35)
        .to('.hero h1', { opacity: 1, y: 0, duration: 0.2 }, 0.48)
        .to('.hero h1 .hero-line', { opacity: 1, y: 0, duration: 0.75, stagger: 0.12 }, 0.52)
        .to('.hero p', { opacity: 1, y: 0, duration: 0.8 }, 0.75)
        .to('.hero-actions', { opacity: 1, y: 0, duration: 0.7 }, 0.95)
        .to('.hero-stat', { opacity: 1, y: 0, duration: 0.8 }, 0.5);

      gsap.set('.hero-stat', { y: 40 });
    }
  }

  private animateRevealElements(): void {
    const reveals = Array.from(document.querySelectorAll('[data-reveal]'))
      .filter((el: Element) => !el.closest('.hero') && !el.closest('.service-row'));
    const duration = this.getAnimationDuration();
    const stagger = this.getStaggerDelay();

    gsap.set(reveals, { opacity: 0 });

    reveals.forEach((el: Element, i: number) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: this.isMobile ? 'top 90%' : 'top 85%',
          toggleActions: 'play none none reverse',
          markers: false
        },
        delay: (i % 3) * stagger
      });
    });
  }

  private animateServiceRows(): void {
    const serviceRows = document.querySelectorAll('.service-row');
    const duration = this.getAnimationDuration();

    serviceRows.forEach((row: Element, i: number) => {
      gsap.set(row, { opacity: 0, x: -50, y: 0 });
      
      gsap.to(row, {
        opacity: 1,
        x: 0,
        duration: duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: row,
          start: this.isMobile ? 'top 88%' : 'top 80%',
          toggleActions: 'play none none reverse'
        },
        delay: i * 0.1
      });

      // Animar línea divisora
      const divider = row.querySelector('.service-divider');
      if (divider) {
        gsap.to(divider, {
          scaleY: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: row,
            start: this.isMobile ? 'top 88%' : 'top 80%'
          },
          delay: i * 0.1 + 0.2
        });
      }
    });
  }

  private animateDiamondRows(): void {
    const diamondRows = document.querySelectorAll('.diamond-row');

    diamondRows.forEach((row: Element) => {
      const diamonds = row.querySelectorAll('span');
      
      gsap.from(diamonds, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(2)',
        stagger: 0.03,
        scrollTrigger: {
          trigger: row,
          start: this.isMobile ? 'top 92%' : 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }

  private animateAboutCards(): void {
    const mvCards = document.querySelectorAll('.mv-card');
    const duration = this.getAnimationDuration();

    mvCards.forEach((card: Element, i: number) => {
      const isEven = i % 2 === 1;

      gsap.set(card, { opacity: 0, x: isEven ? 45 : -45, y: 0, scale: 1 });

      gsap.to(card, {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: duration,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: card,
          start: this.isMobile ? 'top 88%' : 'top 80%',
          toggleActions: 'play none none reverse'
        },
        delay: i * 0.15
      });
    });
  }

  private animateFaqItems(): void {
    const faqItems = document.querySelectorAll('.faq-item');
    const duration = this.getAnimationDuration();

    faqItems.forEach((item: Element, i: number) => {
      gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: this.isMobile ? 'top 90%' : 'top 85%',
          toggleActions: 'play none none reverse'
        },
        delay: i * this.getStaggerDelay()
      });
    });
  }

  private animateContactForm(): void {
    const contactForm = document.querySelector('.contact-form');
    const contactInfo = document.querySelector('.contact-info');
    const duration = this.getAnimationDuration();

    if (contactForm) {
      gsap.to(contactForm, {
        opacity: 1,
        x: 0,
        duration: duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contactForm,
          start: this.isMobile ? 'top 85%' : 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    if (contactInfo) {
      gsap.to(contactInfo, {
        opacity: 1,
        x: 0,
        duration: duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contactInfo,
          start: this.isMobile ? 'top 85%' : 'top 80%',
          toggleActions: 'play none none reverse'
        },
        delay: 0.15
      });
    }
  }

  private animateFooter(): void {
    const footerColumns = document.querySelectorAll('.footer-column');
    const duration = this.getAnimationDuration();

    footerColumns.forEach((column: Element, i: number) => {
      gsap.to(column, {
        opacity: 1,
        y: 0,
        duration: duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: column,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        },
        delay: i * this.getStaggerDelay()
      });
    });
  }

  private animateFeatureItems(): void {
    const featureItems = document.querySelectorAll('.feature-item');
    const duration = this.getAnimationDuration();

    featureItems.forEach((item: Element, i: number) => {
      gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: this.isMobile ? 'top 88%' : 'top 85%',
          toggleActions: 'play none none reverse'
        },
        delay: i * this.getStaggerDelay()
      });
    });
  }

  private animateStaggerItems(): void {
    const staggerItems = document.querySelectorAll('.stagger-item');

    staggerItems.forEach((item: Element, i: number) => {
      gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: this.getAnimationDuration(),
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: this.isMobile ? 'top 90%' : 'top 85%',
          toggleActions: 'play none none reverse'
        },
        delay: i * this.getStaggerDelay()
      });
    });
  }
}
