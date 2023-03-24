import {Component, OnInit, SimpleChanges} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';
import {Page, PageRequest} from '../../models/page';
import {Book} from '../../models/book';
import {BookStatus} from "../../models/book-status";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  page: number = 0;
  tablesSize: number = 22;
  value: string = '';
  books$!: Observable<Page<Book>>;
  pageRequest: PageRequest = { pageIndex: this.page, pageSize: this.tablesSize, status: this.value};

  selectedStatus: BookStatus;


  statusOptions = [
    { value: "AVAILABLE", label: 'Available' },
    { value: "BORROWED", label: 'Borrowed' },
    { value: "RETURNED", label: 'Returned' },
    { value: "DAMAGED", label: 'Damaged' },
    { value: "PROCESSING", label: 'Processing' }
  ]


  totalItemCount: number;



  constructor(
    private route: ActivatedRoute,

    private bookService: BookService,
  ) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes[this.selectedStatus]) {
      this.pageRequest.status = this.selectedStatus;
      this.bookService.getBooksStatus(this.pageRequest).subscribe(
        (bookPage: Page<Book>) => {
          console.log(bookPage);
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }


  ngOnInit(): void {
    // Check if a status option has been selected
    this.route.params.subscribe(params => {
      const status = params['status'];
      console.log("GET STATUS", status)
      if (status) {
        this.selectedStatus = status as BookStatus;
        this.loadStatus();
      } else {
        // If no status option has been selected, just load all the books
        this.loadBooks();
      }
    });
  }

  loadStatus() {
    this.value = this.selectedStatus;
    this.pageRequest.status = this.value;
    this.books$ = this.bookService.getBooksStatus(this.pageRequest)
  }


  loadBooks(): void {

    this.books$ = this.bookService.getBooks(this.pageRequest);
    console.log(this.books$)

  }



  onTableDataChange(event: any) {
    this.page = event;
    this.pageRequest.pageIndex = this.page - 1;
    this.route.params.subscribe(params => {
      const status = params['status'];
      if (status) {
        this.selectedStatus = status as BookStatus;
        this.loadStatus();
      } else {
        this.loadBooks();
      }
    });
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
