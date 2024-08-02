import { Component, OnInit } from '@angular/core';
import { BookModel } from '../../Model/book';
import { NgForm } from '@angular/forms';
import { BookService } from '../../Services/book.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BookListComponent } from '../book-list/book-list.component';
import { BookFormComponent } from '../book-form/book-form.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, BookListComponent, BookFormComponent],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  bookList: BookModel[] = [];
  book: BookModel = {
    title: '',
    author: '',
    genre: '',
    publishedYear: undefined,
    price: undefined
  };
  sortColumn: string = 'Title';
  sortOrder: string = 'ASC';
  editMode: boolean = false;
  genreList: string[] = [
    'Motivational',
    'Science Fiction',
    'Drama',
    'Comedy',
    'Self Help',
    'Adventure',
    'Horror',
    'History'
  ];

  constructor(
    private _bookService: BookService,
    private _toasterService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBookList();
  }

  onSubmit(form: NgForm): void {
    if (this.editMode) {
      this._bookService.updateBook(this.book).subscribe((res) => {
        this.editMode = false;
        this.getBookList();
        this.reset();
        this._toasterService.warning('Book Updated Successfully', 'Updated!!');
      });
    } else {
      this._bookService.addBook(this.book).subscribe((res) => {
        this.getBookList();
        this.reset();
        this._toasterService.success('Book Added Successfully', 'Success!!');
      });
    }
  }

  reset() {
    this.book = {
      title: '',
      author: '',
      genre: '',
      publishedYear: undefined,
      price: undefined
    };
  }

  onResetForm() {
    this.reset();
    this.editMode = false;
    this.getBookList();
  }

  onEdit(book: BookModel) {
    this.book = { ...book };
    this.editMode = true;
  }

  onDelete(bookID: number) {
    if (confirm("Are you sure? You want to delete this book?")) {
      this._bookService.deleteBook(bookID).subscribe(() => {
        this.getBookList();
        this._toasterService.error('Book Deleted Successfully', 'Deleted!!');
      });
    }
  }

  getBookList() {
    this._bookService.getBooks(this.book.genre, this.book.author, this.sortColumn, this.sortOrder)
      .subscribe((res) => {
        this.bookList = res;
      });
  }

  onSort(column: string): void {
    this.sortColumn = column;
    this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    this.getBookList();
  }

  onFilter(): void {
    this.getBookList();
  }
}
