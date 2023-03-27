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


  getMyCheckouts(firstName: string, lastName: string): Observable<Page<Checkout>> {
    const url = this.baseUrl + '/getMyCheckouts'
    const params = new HttpParams().set('firstName', firstName).set('lastName', lastName);
    return this.http.get<Page<Checkout>>(url, {params});
  }

  addToCheckout(book: Checkout): Observable<Checkout> {
    const url = this.baseUrl + '/checkout';
    return this.http.post<Checkout>(url, book);
  }


  deleteCheckout(checkoutId: string): Observable<Checkout> {
    const url = this.baseUrl + '/checkout';
    const params = new HttpParams().set('checkOutId', checkoutId);
    return this.http.delete<Checkout>(url, {params});
  }



/*
  saveBook(book: Book): Observable<void> {
    const url = this.baseUrl + '/saveBook';
    return this.http.post<void>(url, book);
  }
 */


}
