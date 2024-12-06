import { BookType } from './bookType.model';
export class BookTypeWrapper {
  _embedded!: { bookTypes: BookType[] };
}



