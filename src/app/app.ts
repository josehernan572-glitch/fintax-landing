import { Component, OnInit } from '@angular/core';
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
export class App implements OnInit {
  ngOnInit() {
    this.initAnimations();
  }

  initAnimations() {
    // Scroll-triggered reveals for elements
    const reveals = document.querySelectorAll('[data-reveal]');
    
    reveals.forEach((el: Element, i: number) => {
      if (!gsap || !ScrollTrigger) return;
      
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        delay: (i % 3) * 0.08
      });
    });

    // Diamond rows wave-in animation
    const diamondRows = document.querySelectorAll('.diamond-row');
    diamondRows.forEach(row => {
      if (!gsap || !ScrollTrigger) return;
      
      gsap.from(row.querySelectorAll('span'), {
        scale: 0,
        duration: 0.5,
        ease: 'back.out(2)',
        stagger: 0.03,
        scrollTrigger: {
          trigger: row,
          start: 'top 92%'
        }
      });
    });

    // Hero section load-in sequence
    if (gsap) {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to('.promise-badge', { opacity: 1, y: 0, duration: 0.7 }, 0.2)
        .to('.hero-tag', { opacity: 1, y: 0, duration: 0.6 }, 0.35)
        .to('.hero h1', { opacity: 1, y: 0, duration: 0.9 }, 0.5)
        .to('.hero p', { opacity: 1, y: 0, duration: 0.8 }, 0.75)
        .to('.hero-actions', { opacity: 1, y: 0, duration: 0.7 }, 0.95)
        .to('.hero-stat', { opacity: 1, y: '-50%', duration: 0.8 }, 1.1);

      gsap.set('.hero-stat', { y: 40 });
    }
  }
}
