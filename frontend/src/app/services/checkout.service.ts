import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page, PageRequest } from '../models/page';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestUtil } from './rest-util';
import { Checkout } from "../models/checkout";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private readonly baseUrl = environment.backendUrl + '/api/checkout';

  constructor(
    private http: HttpClient,
  ) {
  }

  getCheckouts(filter: Partial<PageRequest>): Observable<Page<Checkout>> {
    const url = this.baseUrl + '/getCheckouts';
    const params = RestUtil.buildParamsFromPageRequest(filter);
    return this.http.get<Page<Checkout>>(url, {params});
  }


  //(id, borrower_first_name, borrower_last_name, book_id, checked_out_date, due_date)
  addToCheckout(book: Checkout): Observable<Checkout> {
    const url = this.baseUrl + '/checkout';
    return this.http.post<Checkout>(url, book);
  }

/*
  saveBook(book: Book): Observable<void> {
    const url = this.baseUrl + '/saveBook';
    return this.http.post<void>(url, book);
  }
 */


}
