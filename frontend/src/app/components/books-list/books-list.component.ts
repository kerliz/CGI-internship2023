import {Component, OnInit, ViewChild} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';
import {Page, PageRequest, SortDirection} from '../../models/page';
import {Book} from '../../models/book';
import {BookStatus} from "../../models/book-status";
import {ActivatedRoute} from "@angular/router";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  //@ViewChild(MatSort) sort: MatSort;
  @ViewChild('firstSort', {static: false}) firstSort: MatSort;


  //todo https://www.angularjswiki.com/material/mat-table-sort/ - sortimiseks
  page: number = 0;
  tablesSize: number = 20;
  value: string = '';
  bookColumns = ['title', 'author', 'bookGenre', 'year', 'bookStatus', 'addFavorites'];

  books$!: Observable<Page<Book>>;

  sortField = 'id';
  sortDirection = 'asc'
  searchValue: string = ''
  pageRequest: PageRequest = {
    pageIndex: this.page,
    pageSize: this.tablesSize,
    status: this.value,
    direction: this.sortDirection as SortDirection,
    sort: this.sortField,
    searchValue: this.searchValue
  };

  searchTerm: string;
  selectedStatus: BookStatus;
  booksDataSource = new MatTableDataSource<Book>();


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

    this.booksDataSource.sort = this.firstSort

    this.checkRoute()
  }


  ngAfterViewInit() {
    this.firstSort.disableClear = true;

    this.booksDataSource.sort = this.firstSort
    this.firstSort.sortChange.subscribe(() => {
      this.checkRoute()
    });
  }


  sorting(sortField: string) {
    const sortDirection = this.sortField === sortField ? (this.sortDirection === 'asc' ? 'desc' : 'asc') : 'asc';
    this.sortField = sortField;
    this.sortDirection = sortDirection as SortDirection;
    this.checkRoute()
    this.page = 0;

    this.pageRequest = {
      pageIndex: this.page,
      pageSize: this.tablesSize,
      sort: this.sortField,
      direction: this.sortDirection === 'asc' ? 'asc' : 'desc'
    };
    if (this.sortField === 'year') {
      this.pageRequest.sort = 'year';
    }
    this.checkRoute()

  }

  loadBooks(): void {
    this.pageRequest.pageIndex = this.page - 1;

    this.pageRequest.sort = this.sortField
    this.books$ = this.bookService.getBooks(this.pageRequest);
    this.books$.subscribe(books => {
      this.booksDataSource.data = books.content;
      this.booksDataSource.sort = this.firstSort;
    });
  }

  loadSearch(): void {
    this.pageRequest.pageIndex = this.page;
    this.pageRequest.sort = this.sortField
    this.pageRequest.searchValue = this.searchValue

    this.books$ = this.bookService.searchBooks(this.pageRequest)
    this.books$.subscribe(books => {
      this.booksDataSource.data = books.content;
      this.booksDataSource.sort = this.firstSort;
    });
  }

  loadStatus() {
    this.pageRequest.pageIndex = this.page;
    this.pageRequest.sort = this.sortField;
    this.pageRequest.direction = this.sortDirection === 'asc' ? 'asc' : 'desc';
    if (this.selectedStatus !== undefined && this.selectedStatus !== null) {
      this.pageRequest.status = this.selectedStatus;
    }
    this.books$ = this.bookService.getBooksStatus(this.pageRequest)
    this.books$.subscribe(books => {
      this.booksDataSource.data = books.content;
      this.booksDataSource.sort = this.firstSort;
    });
  }



  checkRoute() {
    this.route.params.subscribe(params => {
      this.searchTerm = params['value']
      const search = params['value']
      this.searchValue = search
      const status = params['status'];
      if (status) {
        this.selectedStatus = status as BookStatus;
        this.loadStatus();
      } else if (search) {
        this.loadSearch();
      } else {
        this.loadBooks()
      }
    });
  }


  onTableDataChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.tablesSize = event.pageSize;
    this.pageRequest.pageIndex = this.page - 1;
    this.pageRequest.pageSize = this.tablesSize;
    const status = this.selectedStatus;
    const search = this.searchTerm;
    this.pageRequest.sort = this.sortField
    this.pageRequest.direction = this.sortDirection as SortDirection

    if (status) {
      this.pageRequest.status = status;
      this.loadStatus();
    } else if (search) {
      this.loadSearch();
    } else {
      this.loadBooks();
    }

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
