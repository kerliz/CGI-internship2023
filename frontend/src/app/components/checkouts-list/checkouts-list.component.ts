import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import {CheckoutService} from "../../services/checkout.service";
import {Page, PageRequest} from "../../models/page";
import {Checkout} from "../../models/checkout";

@Component({
  selector: 'app-checkout-list',
  templateUrl: './checkouts-list.component.html',
  styleUrls: ['./checkouts-list.component.scss']
})
export class CheckoutsListComponent implements OnInit {

  page: number = 0;
  tablesSize: number = 10;
  pageRequest: PageRequest = { pageIndex: this.page, pageSize: this.tablesSize};

  checkouts$!: Observable<Page<Checkout>>;


  constructor(
    private checkoutService: CheckoutService,
  ) {
  }

  ngOnInit(): void {

this.loadCheckOuts()
  }

  loadCheckOuts(): void {
    this.checkouts$ = this.checkoutService.getCheckouts(this.pageRequest);
    this.checkouts$.subscribe({
      next: (books: Page<Checkout>) => {
        console.log("checkouts:", books);
      },
      error: (error: any) => {
        console.error(error)
      }
    });
  }

}
