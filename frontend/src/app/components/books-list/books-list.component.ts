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

  books$!: Observable<Page<Book>>;
  pageRequest: PageRequest = { pageIndex: 0, pageSize: 30};

  constructor(
    private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    this.books$ = this.bookService.getBooks({});

    this.books$.subscribe({
      next: (books: Page<Book>) => {
        console.log("BOOOKS:", books);
      },
      error: (error: any) => {
        console.error(error)
      }
    });
   }

  onSort(sort: string) {
    this.pageRequest.sort = sort;
   // this.pageRequest.direction = this.pageRequest.direction === 'asc' ? 'desc' : 'asc';
    this.refreshBooks();
  }

  onPageChange(pageIndex: number) {
    this.pageRequest.pageIndex = pageIndex;
    this.refreshBooks();
  }

  private refreshBooks() {
    this.books$ = this.bookService.getBooks(this.pageRequest);
  }

}
