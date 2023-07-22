import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './home-sidebar.component.scss']
})
export class HomeComponent {
  carouselImages = [
    { src: 'https://picsum.photos/id/7/600/400', alt: 'Imagen 1' },
    { src: 'https://picsum.photos/id/12/600/400', alt: 'Imagen 2' },
    { src: 'https://picsum.photos/id/24/600/400', alt: 'Imagen 3' },
    // Agrega más imágenes al carrusel según tus necesidades
  ];

  showFiller = false;

}
