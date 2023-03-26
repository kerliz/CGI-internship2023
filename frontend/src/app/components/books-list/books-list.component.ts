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
  @ViewChild('firstSort', { static: false }) firstSort: MatSort;


  //todo https://www.angularjswiki.com/material/mat-table-sort/ - sortimiseks
  page: number = 0;
  tablesSize: number = 20;
  value: string = '';
  bookColumns = ['title', 'author','bookGenre','year', 'bookStatus', 'addFavorites'];

  books$!: Observable<Page<Book>>;

  sortField = 'id';
  sortDirection = 'asc'
  pageRequest: PageRequest = {pageIndex: this.page, pageSize: this.tablesSize, status: this.value, direction: this.sortDirection as SortDirection, sort: this.sortField};

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

  //  this.loadBooks();
    this.booksDataSource.sort = this.firstSort

    this.route.params.subscribe(params => {
      this.searchTerm = params['value']

      const search = params['value']

      const status = params['status'];
      if (status) {
        this.selectedStatus = status as BookStatus;
        this.loadStatus();
      } else if(search){
        this.loadSearch();
      } else {
        this.loadBooks()
      }
    });

  }



  ngAfterViewInit() {
    console.log(this.booksDataSource)
    console.log("GIST", this.firstSort)
    this.booksDataSource.sort = this.firstSort
   // this.loadBooks()

    //this.firstSort = this.booksDataSource

    this.firstSort.sortChange.subscribe(() => {
      console.log("DFFFFae")
      //this.pageRequest.direction = this.sort.direction as SortDirection;
     // this.pageRequest.sort = this.sort.active;
    //  this.loadBooks();
    });
  }


  sorting(sortField: string) {
    const sortDirection = this.sortField === sortField ? (this.sortDirection === 'asc' ? 'desc' : 'asc') : 'asc';
    this.sortField = sortField;
    this.sortDirection = sortDirection as SortDirection;
    console.log(sortDirection)
    console.log(this.sortField)
    this.pageRequest = {
      pageIndex: this.page - 1,
      pageSize: this.tablesSize,
      sort: this.sortField,
      direction: this.sortDirection === 'asc' ? 'asc' : 'desc'
    };
    if (this.sortField === 'year') {
      console.log("AAAAAAGS")
      this.pageRequest.sort = 'year';
    }
    this.loadBooks();
  }
  loadBooks(): void {
    this.pageRequest.pageIndex = this.page - 1;
    this.books$ = this.bookService.getBooks(this.pageRequest);
    this.books$.subscribe(books => {
      this.booksDataSource.data = books.content;
      this.booksDataSource.sort = this.firstSort;

    });
  }

  loadStatus() {
    this.value = this.selectedStatus;
    this.pageRequest.status = this.value;
    this.books$ = this.bookService.getBooksStatus(this.pageRequest)
    this.books$.subscribe(books => {
      this.booksDataSource.data = books.content;
      this.booksDataSource.sort = this.firstSort;
    });
  }



  loadSearch():void {

    this.books$ = this.bookService.searchBooks(this.searchTerm)
    this.books$.subscribe(books => {
      this.booksDataSource.data = books.content;
      this.booksDataSource.sort = this.firstSort;
    });
  }


  onTableDataChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.tablesSize = event.pageSize;
    this.pageRequest.pageIndex = this.page - 1;
    this.pageRequest.pageSize = this.tablesSize;
    const status = this.selectedStatus;
    const search = this.searchTerm;

    if (status) {
      this.pageRequest.status = status;
      this.loadStatus();
    } else if (search) {
     // this.pageRequest.searchTerm = search;
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
