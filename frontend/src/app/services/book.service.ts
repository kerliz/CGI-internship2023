import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Page, PageRequest} from '../models/page';
import {Book} from '../models/book';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {RestUtil} from './rest-util';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly baseUrl = environment.backendUrl + '/api/book';

  constructor(
    private http: HttpClient,
  ) {
  }

  getBooks(filter: Partial<PageRequest>): Observable<Page<Book>> {
    const url = this.baseUrl + '/getBooks';
    const params = RestUtil.buildParamsFromPageRequest(filter);
    return this.http.get<Page<Book>>(url, {params});
  }

  getBooksStatus(filter: Partial<PageRequest>): Observable<Page<Book>> {
    const url = this.baseUrl + '/getBooksByStatus';
    //const params = RestUtil.buildParamsFromPageRequest(filter);
    const params = {
      page: filter.pageIndex.toString(),
      size: filter.pageSize.toString(),
      status: filter.status
    };
    return this.http.get<Page<Book>>(url, {params});
  }


  getBook(bookId: string): Observable<Book> {
    const url = this.baseUrl + '/getBook';
    const params = new HttpParams().set('bookId', bookId);
    return this.http.get<Book>(url, {params});
  }
  /*
    getSorting(filter: Partial<PageRequest>, sortField: string, sortDirection: string): Observable<Page<Checkout>> {
    const url = this.baseUrl + '/getSorting';
    const params = RestUtil.buildParamsFromPageRequest(filter);
    params.append('sortField', sortField);
    params.append('sortDirection', sortDirection);

    return this.http.get<Page<Checkout>>(url, {params});
  }

   */

  searchBooks( filter: Partial<PageRequest>): Observable<Page<Book>> {
    const url = this.baseUrl + '/searchBooks';
   // const params = new HttpParams().set('searchValue', searchValue);
   // console.log("PARAMAAA", params)


    const params = {
      searchValue: filter.searchValue,
      page: filter.pageIndex.toString(),
      size: filter.pageSize.toString()
    };

    return this.http.get<Page<Book>>(url, {params});
  }



  updateStatus(bookId: string, newStatus: string, dueDate: string): Observable<Book> {
    const url = this.baseUrl + '/updateBookStatus';
    const params = new HttpParams().set('bookId', bookId).set('status', newStatus).set('dueDate', dueDate);
    return this.http.post<Book>(url, params );
  }




  saveBook(book: Book): Observable<void> {
    const url = this.baseUrl + '/saveBook';
    return this.http.post<void>(url, book);
  }

  deleteBook(bookId: string): Observable<void> {
    const url = this.baseUrl + '/deleteBook';
    const params = new HttpParams().set('bookId', bookId);
    return this.http.delete<void>(url, {params});
  }

}
