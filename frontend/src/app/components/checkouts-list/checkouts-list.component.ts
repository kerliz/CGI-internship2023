import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {CheckoutService} from "../../services/checkout.service";
import {Page, PageRequest, SortDirection} from "../../models/page";
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


  checkouts$!: Observable<Page<Checkout>>;
  selectedStatus: BookStatus;

  sortField = 'id';
  sortDirection = 'asc'

  pageRequest: PageRequest = {pageIndex: this.page, pageSize: this.tablesSize, sort: this.sortField, direction: this.sortDirection as SortDirection};



  constructor(
    private checkoutService: CheckoutService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {

    this.loadCheckOuts()
  }


  sort(sortField: string) {

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
    this.loadCheckOuts();
  }



  loadCheckOuts(): void {
    this.checkouts$ = this.checkoutService.getCheckouts(this.pageRequest);
  }

  onTableDataChange(event: any) {
    this.page = event;
    console.log(event)
    this.pageRequest.pageIndex = this.page - 1;
    this.route.params.subscribe(params => {
      const status = params['status'];
      if (status) {
        this.selectedStatus = status as BookStatus;
      } else {
        this.loadCheckOuts();
      }
    });
  }
}
