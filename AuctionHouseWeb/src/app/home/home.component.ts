import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './home-sidebar.component.scss']
})
export class HomeComponent 
{
  itemsPerSlide = 4;
  singleSlideOffset = false;
  noWrap = false;

  slides = [
    { image: 'https://picsum.photos/id/7/600/400', alt: 'Obvio placeholder' },
    { image: 'https://picsum.photos/id/12/600/400', alt: 'Imagen 2' },
    { image: 'https://picsum.photos/id/24/600/400', alt: 'Imagen 3' },
    { image: 'https://picsum.photos/id/76/600/400', alt: 'Imagen 4' },
    { image: 'https://picsum.photos/id/8/600/400', alt: 'Imagen 5' },
    { image: 'https://picsum.photos/id/62/600/400', alt: 'Imagen 6' },
    { image: 'https://picsum.photos/id/29/600/400', alt: 'Imagen 7' },
    { image: 'https://picsum.photos/id/89/600/400', alt: 'Imagen 8' },
  ];

  showFiller = false;

}
