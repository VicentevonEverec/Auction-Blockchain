import { Component } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent 
{

  searchQuery: string = '';

  onSearch() {
    console.log('Búsqueda realizada: ', this.searchQuery);
  }
  
}
