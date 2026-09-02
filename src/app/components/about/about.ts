import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit, OnDestroy {
  slideGradients = [
    'linear-gradient(135deg, #e9ddd0, #cbb79f)',
    'linear-gradient(135deg, #d9c9b3, #a98f72)',
    'linear-gradient(135deg, #ded0ba, #b7a284)',
    'linear-gradient(135deg, #e2d3bd, #c2ab8c)',
  ];
  activeSlide = signal(0);
  private timer?: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.timer = setInterval(() => {
      this.activeSlide.update((i) => (i + 1) % this.slideGradients.length);
    }, 4500);
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  goTo(i: number) {
    this.activeSlide.set(i);
  }
}
