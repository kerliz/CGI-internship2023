import {Component, OnInit} from '@angular/core';
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
  pageRequest: PageRequest = {pageIndex: this.page, pageSize: this.tablesSize, status: this.value};

  selectedStatus: BookStatus;


  statusOptions = [
    {value: "AVAILABLE", label: 'Available'},
    {value: "BORROWED", label: 'Borrowed'},
    {value: "RETURNED", label: 'Returned'},

  ]

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
  ) {
  }


  ngOnInit(): void {
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

  loadStatus() {
    this.value = this.selectedStatus;
    this.pageRequest.status = this.value;
    this.books$ = this.bookService.getBooksStatus(this.pageRequest)
  }


  loadBooks(): void {

    this.books$ = this.bookService.getBooks(this.pageRequest);
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


  addToFavorites(book: Book): void {
    let favoriteBooks = JSON.parse(localStorage.getItem('favoriteBooks')) || [];
    const bookIndex = favoriteBooks.findIndex((b: Book) => b.id === book.id);
    if (bookIndex >= 0) {
      favoriteBooks.splice(bookIndex, 1);
    } else {
      favoriteBooks.push(book);
    }
    localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks));
  }

  isFavorite(book: Book): boolean {
    const favoriteBooks = JSON.parse(localStorage.getItem('favoriteBooks')) || [];
    return favoriteBooks.some((b: Book) => b.id === book.id);
  }


}
