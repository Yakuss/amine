import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../model/books.model';
import { BookType } from '../model/bookType.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-updatebook',
  templateUrl: './updatebook.component.html',
  styles: [],
})
export class UpdatebookComponent implements OnInit {
  currentBook = new Book();
  formattedDate?: string | null;
  booktype!: BookType[];
  updateBTID!: number;
  myImage!: string;

  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  constructor(
    private booksService: BooksService,
    private activatedroute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.booksService.listeTypes().subscribe((response) => {
      this.booktype = response?._embedded?.bookTypes || []; // Optional chaining
    });

    this.booksService
      .consulterBook(this.activatedroute.snapshot.params['id'])
      .subscribe(
        (boo) => {
          this.currentBook = boo;

          // Check if bookType exists before trying to access its id
          if (this.currentBook.bookType) {
            this.updateBTID = this.currentBook.bookType.id!;
          }

          // Check if image exists before trying to load it
          /* if (this.currentBook.image) {
            this.booksService
              .loadImage(this.currentBook.image.idImage)
              .subscribe(
                (img: Image) => {
                  this.myImage = 'data:' + img.type + ';base64,' + img.image;
                },
                (error) => console.error('Error loading image:', error) // Handle errors
              );
          }*/

          // Format the date if publicationDate exists
          if (this.currentBook.publicationDate) {
            this.formattedDate = this.formatDateForInput(
              this.currentBook.publicationDate
            );
          }
        },
        (error) => console.error('Error loading book details:', error) // Handle errors
      );
  }

  formatDateForInput(date: Date | undefined): string | null {
    if (!date) return null;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  onDateChange(event: string): void {
    this.formattedDate = event; // Store the string value
    this.currentBook.publicationDate = new Date(event); // Convert the string back to Date
  }

  updateBook() {
    this.currentBook.bookType = this.booktype.find(
      (typ) => typ.id == this.updateBTID)!;

    /*if (this.isImageUpdated) {
      this.booksService
        .uploadImage(this.uploadedImage, this.uploadedImage.name)
        .subscribe((img: Image) => {
          this.currentBook.image = img;

          this.booksService.updateBook(this.currentBook).subscribe((bk) => {
            this.router.navigate(['books']);
          });
        });
    }*/
      this.booksService.updateBook(this.currentBook).subscribe((boo) => {
        console.log(boo);
        this.router.navigate(['books']);
      });


    /*this.booksService.updateBook(this.currentBook).subscribe(prod => {
    this.router.navigate(['books']); }
    );
    this.currentBook.bookType = this.booktype.find(typ => typ.id == this.updateBTID)!;
    this.booksService.updateBook(this.currentBook).subscribe(boo => {
      this.router.navigate(['books']);
    })*/
  }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }

  onAddImageProduit() {
    this.booksService.uploadImageBook( this.uploadedImage, this.uploadedImage.name, this.currentBook.id! )
      .subscribe((img: Image) => {
        this.currentBook.images.push(img);
      });
  }


  supprimerImage(img: Image){
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
    this.booksService.supprimerImage(img.idImage).subscribe(() => {
    //supprimer image du tableau currentProduit.images
    const index = this.currentBook.images.indexOf(img, 0);
    if (index > -1) {
    this.currentBook.images.splice(index, 1);
    }
    });
    }
}
