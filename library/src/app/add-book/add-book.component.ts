import { Component, OnInit } from '@angular/core';
import { Book } from '../model/books.model';
import { BooksService } from '../services/books.service';
import Swal from 'sweetalert2';
import { BookType } from '../model/bookType.model';
import { Router } from '@angular/router';
import { Image } from '../model/image.model';
import { response } from 'express';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
})
export class AddBookComponent implements OnInit {
  booktypes!: BookType[];
  newBook = new Book();
  //newBookType = new BookType();
  selectedBookTypeId!: number;
  newbookType!: BookType;

  uploadedImage!: File;
  imagePath!: any;

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.booksService.listeTypes().subscribe((response) => {
      this.booktypes = response?._embedded?.bookTypes || []; // Optional chaining
      console.log('Book Types:', this.booktypes); // Log the book types
    });
  }

  /*async addBook() {
    try {

      //this.newBook.bookType = this.booksService.consulterBook(this.selectedBookTypeId);

      const response = await this.booksService.addBook(this.newBook).subscribe( boo =>{
        console.log(boo);
      });

      // Show success SweetAlert once the book is added
      Swal.fire({
        title: 'Book Added!',
        text: 'Your book has been successfully added.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      this.router.navigate(['books']);

    } catch (error) {
      // Show error SweetAlert if something goes wrong
      Swal.fire({
        title: 'Error!',
        text: 'There was a problem adding the book.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  }*/



  addBook() {
    /*this.booksService.uploadImage(this.uploadedImage , this.uploadedImage.name)
    .subscribe((img: Image)=>{
      this.newBook.image = img;

    });*/

    this.newBook.bookType = this.booktypes.find((typ) => typ.id == this.selectedBookTypeId)!;
      this.booksService.addBook(this.newBook).subscribe((boo) => {
       this.booksService.uploadImageFS(this.uploadedImage, this.uploadedImage.name , boo.id!).subscribe((response:any)=>{

       });
        console.log(boo);
        this.router.navigate(['books']);
      });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
      console.log(this.uploadedImage);
    };
  }
}
