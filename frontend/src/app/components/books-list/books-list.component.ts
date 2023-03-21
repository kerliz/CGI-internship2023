import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';
import {Page, PageRequest} from '../../models/page';
import {Book} from '../../models/book';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  page: number = 1;
  tablesSize: number = 21;
  books$!: Observable<Page<Book>>;
  pageRequest: PageRequest = { pageIndex: this.page - 1, pageSize: this.tablesSize};

  constructor(
    private bookService: BookService,
  ) {
  }


  ngOnInit(): void {
    this.loadBooks();

  }

  loadBooks(): void {
    console.log("THIIIISSS", this.pageRequest)
    this.books$ = this.bookService.getBooks(this.pageRequest);
    this.books$.subscribe({
      next: (books: Page<Book>) => {
        console.log("BOOOKS:", books);
      },
      error: (error: any) => {
        console.error(error)
      }
    });
  }


  onTableDataChange(event:any) {
    //console.log("eventtt", event.target.value);
   // this.tablesSize = event;
    console.log("ENNE", this.page);
    console.log(event)

    this.page = event;
    this.pageRequest.pageIndex = this.page;
    console.log("Prst", this.page)
    this.loadBooks();
  }





  onSort(sort: string) {
    this.pageRequest.sort = sort;
   // this.pageRequest.direction = this.pageRequest.direction === 'asc' ? 'desc' : 'asc';
    this.refreshBooks();
  }



  private refreshBooks() {
    this.books$ = this.bookService.getBooks(this.pageRequest);
  }

}
