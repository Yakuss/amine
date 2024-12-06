import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book } from '../model/books.model';

@Component({
  selector: 'app-recherche-par-title',
  templateUrl: './recherche-par-title.component.html'
})
export class RechercheParTitleComponent implements OnInit {
  bookTitle ! : string
  books! : Book[];

  //2end

  allBooks! : Book[];
  searchTerm!:string;

  constructor(private booksService : BooksService){

  }
  ngOnInit(): void {
    this.booksService.listBooks().
    subscribe(boo => {
      this.books = boo;
      console.log(boo);
    })
  }


  onKeyUp(filterText : string){
    this.books = this.allBooks.filter(item =>
    item.title!.toLowerCase().includes(filterText));
    }

  /*rechercheBooks(){
    this.booksService.rechercherParNom(this.bookTitle).
    subscribe(boo => {
      this.books = boo;
      console.log(boo);
    })
  }*/

}
