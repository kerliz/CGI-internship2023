import {Component, OnInit} from "@angular/core";
import {Book} from "../../models/book";



@Component({
  selector: 'app-favourite-list',
  templateUrl: './favourite-list.component.html',
  styleUrls: ['./favourite-list.component.scss']
})
export class FavouriteBooksListComponent implements OnInit {

  items: any[];
  ngOnInit(): void {

    this.items = JSON.parse(localStorage.getItem('favoriteBooks'))
    console.log(this.items)

  }

  addToFavorites(book: Book): void {
    let favoriteBooks = JSON.parse(localStorage.getItem('favoriteBooks')) || [];
    const bookIndex = favoriteBooks.findIndex((b: Book) => b.id === book.id);
    console.log(favoriteBooks)
    if (bookIndex >= 0) {
      // The book is already in favorites, so remove it
      favoriteBooks.splice(bookIndex, 1);
    } else {
      // The book is not in favorites, so add it
      favoriteBooks.push(book);
    }

    localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks));
  }

  isFavorite(book: Book): boolean {
    const favoriteBooks = JSON.parse(localStorage.getItem('favoriteBooks')) || [];
    return favoriteBooks.some((b: Book) => b.id === book.id);
  }


}
