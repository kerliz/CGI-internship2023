import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book$!: Observable<Book>;
  isOverdue: boolean;


  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
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
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        const day = ('0' + currentDate.getDate()).slice(-2);
        const formattedDate = `${year}-${month}-${day}`;
        if (formattedDate > book.dueDate) {
          this.isOverdue = true;
        } else {
          this.isOverdue = false;
        }
      }
    });
  }


}
