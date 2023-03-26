import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  searchTerm = '';
  constructor(private router: Router) { }


  onSubmit(searchForm: NgForm) {
    this.searchTerm = searchForm.value.search;
    this.router.navigate(['/books/search', this.searchTerm]);

    searchForm.resetForm()
  }
}
