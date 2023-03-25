import {Component, OnInit} from "@angular/core";
import {CheckoutService} from "../../services/checkout.service";
import {Observable} from "rxjs";
import {Page} from "../../models/page";
import {Book} from "../../models/book";
import {Checkout} from "../../models/checkout";
import {BookStatus} from "../../models/book-status";

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
  ) {
  }

  ngOnInit(): void {

    this.books$=this.checkoutService.getMyCheckouts("John", "Doe")

    this.books$.subscribe(params=> {
      console.log("APPAPAPA", params)
    })

  }


  return(checkout: Checkout) {
    console.log(checkout)
  }



}
