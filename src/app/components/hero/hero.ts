import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var gsap: any;

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit {
  ngOnInit() {
    // Animaciones hero se inicializan en animaciones.service.ts
  }
}
