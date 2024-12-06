import { Component, OnInit } from '@angular/core';
import { Book } from '../model/books.model';
import { BooksService } from '../services/books.service';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
})
export class BooksComponent implements OnInit {
  books!: Book[];
  apiurl:string='http://localhost:8082/books/api';


  constructor(
    private booksService: BooksService,
    public authservice: AuthService
  ) {}

  ngOnInit(): void {
    //this.books = this.booksService.listBooks();
    this.LoadBooks();
    console.log(this.authservice.isAdmin());
  }

  LoadBooks() {
    this.booksService.listBooks().subscribe(bks=>{
      this.books=bks;
      console.log(bks)
    });

    /*this.booksService.listBooks().subscribe((boo) => {
      this.books = boo;


      this.books.forEach((bk)=>{
        bk.imageStr ='data:' + bk.images[0].type + ';base64,' + bk.images[0].image;
      })
*/
      // Load images only for books that have an image
      /*this.books.forEach((bk) => {
        if (bk.image) {
          this.booksService.loadImage(bk.image.idImage).subscribe((img: Image) => {
            bk.imageStr = 'data:' + img.type + ';base64,' + img.image;
          });
        } else {
          // Use a placeholder image if `bk.image` is undefined
          bk.imageStr = 'https://via.placeholder.com/150';
        }
      });*/


  }

  /*deleteBook(bookId: number): void {
    if (bookId === undefined) {
      console.error("Book ID is undefined");
      return;
    }

    // SweetAlert2 confirmation before deleting
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.booksService.deleteBook(bookId); // Proceed with deletion
        this.LoadBooks() // Refresh the list of books
        Swal.fire(
          'Deleted!',
          'The book has been deleted.',
          'success'
        );
      }

    });

  }*/

  deleteBook(b: Book) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf)
      this.booksService.deleteBook(b.id!).subscribe(() => {
        console.log('produit supprimé');
        this.LoadBooks();
      });
  }
}
