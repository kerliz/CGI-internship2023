import { Component } from '@angular/core';
//import { BookSearch} from './components/books-list/books-list.component'

import { SearchTextService } from './services/search-text.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';


 // searchText: any;

  constructor(private searchTextService: SearchTextService) {}

  searchText: any;

  onSearch(): void {
    console.log(this.searchText);
    this.searchTextService.searchText = this.searchText;
  }



  /*
  constructor(private bookSearch: BookSearch) {}

  searchBook(searchTerm: string) {
    this.bookSearch.searchBooks({ searchTerm });
  }
   */
}
