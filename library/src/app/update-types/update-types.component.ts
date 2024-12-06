import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookType } from '../model/bookType.model';

@Component({
  selector: 'app-update-types',
  templateUrl: './update-types.component.html'
})
export class UpdateTypesComponent implements OnInit {
  @Input()
  bookType!: BookType;

  @Input()
  ajout: boolean = false;

  ngOnInit(): void {
    // Initialize bookType with default values if it's not provided
    if (!this.bookType) {
      this.bookType = { id: 0, name: '', description: '' }; // Default initialization
    }
    console.log("ngOnInit du composant UpdateCategorie ", this.bookType);
  }

  @Output()
  typeUpdated = new EventEmitter<BookType>();

  savetype() {
    this.typeUpdated.emit(this.bookType);
  }
}
