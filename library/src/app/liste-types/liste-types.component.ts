import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { BookType } from '../model/bookType.model';

@Component({
  selector: 'app-liste-types',
  templateUrl: './liste-types.component.html'
})
export class ListeTypesComponent implements OnInit{


  bookTypes!:BookType[];
  updateType!:BookType ;
  ajout:boolean=true;
constructor(private booksService : BooksService){

}

  ngOnInit(): void {
    this.chargerTypes();
  }



  typeUpdated(typ:BookType){
    console.log("type recived from componant updateType",typ);
    this.booksService.ajouterType(typ).subscribe(()=> this.chargerTypes())
  }

  chargerTypes(){
    this.booksService.listeTypes().
    subscribe(typ => {this.bookTypes = typ._embedded.bookTypes;
    console.log(typ);
    })}

    updateTyp(typ:BookType){
      this.updateType=typ;
      this.ajout=false;
    }



    // Add this method to switch to adding mode
    ajouterType() {
      this.updateType = { id: 0, name: '', description: '' }; // Create a new empty book type
      this.ajout = true; // Set to true for adding
    }

}
