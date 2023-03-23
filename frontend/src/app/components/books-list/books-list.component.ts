import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';
import {Page, PageRequest} from '../../models/page';
import {Book} from '../../models/book';
import {BookStatus} from "../../models/book-status";

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
  selected: any= null;
  sorted: any




  totalItemCount: number;



  constructor(
    private bookService: BookService,
  ) {
  }


  ngOnInit(): void {
    this.loadBooks();

  }

  loadBooks(): void {

    this.books$ = this.bookService.getBooks(this.pageRequest);
    console.log(this.books$)


    this.books$.subscribe({
      next: (books: Page<Book>) => {
        //this.pageRequest.pageIndex = books.totalElements

        let temp = Array.from(books.content);
        console.log("BOOOKS:", books);
        for (let i = 0; i < temp.length; i ++) {
          //this.sorted=temp.sort((a,b)=> {
          //  console.log(temp[i].status)
            //return a[books[i]] < b[1] ? -1 : a[1] > b[1] ? 1 : 0
         // })
        }

        console.log(temp)
      },
      error: (error: any) => {
        console.error(error)
      }
    });
  }

  getAvailableBooks() {
    this.pageRequest.status = 'AVAILABLE'; // Set the status value to a valid enum value
    this.bookService.getAvailable(this.pageRequest).subscribe(
      (bookPage: Page<Book>) => {
        console.log(bookPage);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }




  onTableDataChange(event:any) {
    console.log(event - 1)
    this.page = event;
    this.pageRequest.pageIndex = this.page - 1;
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
