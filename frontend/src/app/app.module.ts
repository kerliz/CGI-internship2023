import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import {CheckoutsListComponent} from "./components/checkouts-list/checkouts-list.component";
import {FavouriteBooksListComponent} from "./components/favourite-list/favourite-list.component";
import {MyBooksListComponent} from "./components/my-books-list/mybooks-list.component";
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookDetailComponent,
    CheckoutsListComponent,
    FavouriteBooksListComponent,
    MyBooksListComponent

  ],
  imports: [
    NgxPaginationModule,
    Ng2SearchPipeModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    MatTableModule,
    MatSortModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
