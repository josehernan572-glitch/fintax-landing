import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamSlide {
  bg: string;
  name: string;
  role: string;
  quote: string;
}

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit, OnDestroy {
  slides: TeamSlide[] = [
    {
      bg: "url('/img/nosotros1.png') center/cover no-repeat",
      name: 'Ronald Delgado',
      role: 'CEO Fundador — Fintax',
      quote: '"15 años liderando gestión empresarial"',
    },
    {
      bg: "url('/img/nosotros2.png') center/cover no-repeat",
      name: 'María Torres',
      role: 'Directora Fiscal — Fintax',
      quote: '"Simplificamos lo complejo, juntos"',
    },
    {
      bg: "url('/img/nosotros3.png') center/cover no-repeat",
      name: 'Carlos Pérez',
      role: 'Director Financiero — Fintax',
      quote: '"Cercanía y resultados, siempre"',
    },
    {
      bg: "url('/img/nosotros4.png') center/cover no-repeat",
      name: 'Ana Gómez',
      role: 'Directora Contable — Fintax',
      quote: '"Tu éxito es nuestro compromiso"',
    },
  ];
  activeSlide = signal(0);
  private timer?: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.timer = setInterval(() => {
      this.activeSlide.update((i) => (i + 1) % this.slides.length);
    }, 4500);
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  goTo(i: number) {
    this.activeSlide.set(i);
  }
}
