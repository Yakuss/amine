import { Component, OnInit } from '@angular/core';
import { Book } from '../model/books.model';
import { BookType } from '../model/bookType.model';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-recherche-par-booktype',
  templateUrl: './recherche-par-booktype.component.html',
  styles: ``
})
export class RechercheParBooktypeComponent implements OnInit{



constructor(private booksService : BooksService){

}
  IdBookType !: number;
  books !: Book[];
  bookTypes ! : BookType[];

  ngOnInit(): void {
    this.booksService.listeTypes().subscribe((typ: any) => {
      if (typ._embedded && typ._embedded.bookTypes) {
        this.bookTypes = typ._embedded.bookTypes; // Ensure it's an array
      } else {
        console.error('Unexpected response format:', typ);
      }
      console.log(this.bookTypes);
    });
  }

 onchange(): void {
  this.booksService.rechercherParBookType(this.IdBookType).subscribe((response: any) => {
    // Check if _embedded and bookses exist in the response
    if (response._embedded && response._embedded.bookses) {
      this.books = response._embedded.bookses; // Assign books from _embedded.bookses
    } else {
      console.error('Unexpected response format:', response); // Log if structure doesn't match
    }
    console.log(this.books); // Log the books array
  });
}


}
