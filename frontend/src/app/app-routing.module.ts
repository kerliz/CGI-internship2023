import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import {CheckoutsListComponent} from "./components/checkouts-list/checkouts-list.component";
import {FavouriteBooksListComponent} from "./components/favourite-list/favourite-list.component";
import {MyBooksListComponent} from "./components/my-books-list/mybooks-list.component";

const routes: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: 'books', component: BooksListComponent},
  {path: 'books/:id', component: BookDetailComponent},
  {path: 'checkouts', component: CheckoutsListComponent},
  {path: 'books/status/:status', component: BooksListComponent},
  {path: 'favourites', component: FavouriteBooksListComponent},
  {path: 'mybooks', component: MyBooksListComponent},
  {path: 'addCheckout', component: BookDetailComponent}, // TODO not using


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
