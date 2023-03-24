import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {CheckoutService} from "../../services/checkout.service";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book$!: Observable<Book>;
  isOverdue: boolean;
  currentDate: string;
  newStatus: string;




  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private checkOutService: CheckoutService
  ) {
  }

  ngOnInit(): void {
    this.book$ = this.route.params
      .pipe(map(params => params['id']))
      .pipe(switchMap(id => this.bookService.getBook(id)))

    this.bookInfo()
  }

  bookInfo() {
    this.book$.subscribe(book => {
      if (book.status === 'BORROWED') {
        this.getCurrentDate()
        if (this.currentDate > book.dueDate) {
          this.isOverdue = true;
        } else {
          this.isOverdue = false;
        }
      }
    });
  }


  getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    this.currentDate= `${year}-${month}-${day}`;
  }

  checkOut() {

    this.book$.subscribe(book => {
      if (book.status === 'AVAILABLE') {
        this.newStatus = 'BORROWED'
      } else if (book.status === 'BORROWED') {
        this.newStatus = 'AVAILABLE'
      }
      console.log(book.id)
      this.bookService.updateStatus(book.id, this.newStatus).subscribe(updatedBook => {
        console.log(updatedBook); // Log the updated book to the console
      });
    })

  }



}
