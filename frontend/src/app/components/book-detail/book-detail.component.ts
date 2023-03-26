import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book';
import {Observable, of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {CheckoutService} from "../../services/checkout.service";
import {Checkout} from "../../models/checkout";
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book$!: Observable<Book>;
  checkout: Checkout;

  isOverdue: boolean;
 // currentDate: string;
  newStatus: string;
  isBorrowed: boolean;
  isReturned: boolean;




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
        this.isBorrowed = true;
        this.getCurrentDate()
        if (this.getCurrentDate() > book.dueDate) {
          console.log("ON {LE")
          this.isOverdue = true;
        } else {
          console.log("PIFEM EI")
          this.isOverdue = false;
        }
      } else if (book.status ==='RETURNED'){
        this.isReturned = true;
      } else {
        this.isBorrowed = false;

      }
    });
  }


  getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  checkOut() {

    this.getCurrentDate()
    this.book$.subscribe(book => {
      if (book.status === 'AVAILABLE') {
        this.newStatus = 'BORROWED'
        this.isBorrowed = true
        const checkout: Checkout = {
          id: uuidv4(),
          borrowerFirstName: 'John',
          borrowerLastName: 'Doe',
          bookId: book.id,
          borrowedBook: book,
          checkedOutDate: this.getCurrentDate(),
          dueDate: this.getDueDate(),
        };
        this.checkOutService.addToCheckout(checkout).subscribe(() => {
        });
      } else if (book.status === 'BORROWED') {
        this.newStatus = 'AVAILABLE'
        this.isBorrowed= false
      }

      this.bookService.updateStatus(book.id, this.newStatus, this.getDueDate()).subscribe(updatedBook => {
        this.book$ = of(updatedBook);
      });
    })
  }

  getDueDate() {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // Set due date to 14 days from current date
    const year = dueDate.getFullYear();
    const month = ('0' + (dueDate.getMonth() + 1)).slice(-2);
    const day = ('0' + dueDate.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

}
