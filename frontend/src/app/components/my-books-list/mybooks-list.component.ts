import {Component, OnInit} from "@angular/core";
import {CheckoutService} from "../../services/checkout.service";
import {Observable} from "rxjs";
import {Page} from "../../models/page";
import {Checkout} from "../../models/checkout";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-mybooks-list',
  templateUrl: './mybooks-list.component.html',
  styleUrls: ['./mybooks-list.component.scss']
})
export class MyBooksListComponent implements OnInit {

  books$!: Observable<Page<Checkout>>;

  page: number = 0;
  tablesSize: number = 30;


  constructor(
    private checkoutService: CheckoutService,
    private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
this.getMyBooks()


  }

  getMyBooks() {
    this.books$ = this.checkoutService.getMyCheckouts("John", "Doe")
  }


  return(checkout: Checkout) {
    this.checkoutService.deleteCheckout(checkout.id).subscribe();

    this.bookService.updateStatus(checkout.borrowedBook.id, "RETURNED", "").subscribe(() => {
      this.getMyBooks()
    });

  }


}
