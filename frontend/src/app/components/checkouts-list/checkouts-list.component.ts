import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import {CheckoutService} from "../../services/checkout.service";
import {Page, PageRequest} from "../../models/page";
import {Checkout} from "../../models/checkout";
import {BookStatus} from "../../models/book-status";

@Component({
  selector: 'app-checkout-list',
  templateUrl: './checkouts-list.component.html',
  styleUrls: ['./checkouts-list.component.scss']
})
export class CheckoutsListComponent implements OnInit {

  page: number = 0;
  tablesSize: number = 30;
  pageRequest: PageRequest = { pageIndex: this.page, pageSize: this.tablesSize};

  checkouts$!: Observable<Page<Checkout>>;

  selectedStatus: BookStatus;


  statusOptions = [
    {value: "AVAILABLE", label: 'Available'},
    {value: "BORROWED", label: 'Borrowed'},
    {value: "RETURNED", label: 'Returned'},
    {value: "DAMAGED", label: 'Damaged'},
    {value: "PROCESSING", label: 'Processing'}
  ]
  constructor(
    private checkoutService: CheckoutService,
    private route: ActivatedRoute,

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

  onTableDataChange(event: any) {
    this.page = event;
    this.pageRequest.pageIndex = this.page - 1;
    this.route.params.subscribe(params => {
      const status = params['status'];
      if (status) {
        this.selectedStatus = status as BookStatus;
        //this.loadStatus();
      } else {
        this.loadCheckOuts();
      }
    });
  }

  /*
  loadStatus() {
    this.value = this.selectedStatus;
    this.pageRequest.status = this.value;
    this.books$ = this.bookService.getBooksStatus(this.pageRequest)
  }

   */


}
